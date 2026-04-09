import type { ResolvedClientConfig } from "../types/config.js";
import type { ErrorCode } from "../types/errors.js";
import { DHLError } from "../errors/DHLError.js";

type AuthType = "apiKey" | "basic";
type APIType = "express" | "forwarding";

export interface RequestConfig<TBody = Record<string, unknown>> {
	method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
	endpoint: string;
	queryParams?: Record<string, unknown>;
	body?: TBody;
	headers?: Record<string, string>;
	apiType?: APIType;
	authType?: AuthType;
	timeoutMs?: number;
}

function buildUrl(base: string, endpoint: string): URL {
	const normalizedBase = base.endsWith("/") ? base : `${base}/`;
	const normalizedEndpoint = endpoint.startsWith("/")
		? endpoint.slice(1)
		: endpoint;
	return new URL(normalizedEndpoint, normalizedBase);
}

function encodeBasicAuth(apiKey: string, apiSecret: string): string {
	const credentials = `${apiKey}:${apiSecret}`;
	// TextEncoder + btoa — works universally in browsers and Node.js 16+
	// Handles non-Latin-1 characters safely without Buffer or any imports
	const bytes = new TextEncoder().encode(credentials);
	const binary = Array.from(bytes, (b) => String.fromCharCode(b)).join("");
	return btoa(binary);
}

export async function makeRequest<T, TBody = Record<string, unknown>>(
	config: ResolvedClientConfig,
	requestConfig: RequestConfig<TBody>,
): Promise<T> {
	const {
		method,
		endpoint,
		queryParams,
		body,
		headers = {},
		apiType = "forwarding",
		authType = "apiKey",
		timeoutMs = 15000,
	} = requestConfig;

	const { baseUrl, expressBaseUrl, apiKey, apiSecret } = config;

	const url = buildUrl(
		apiType === "express" ? expressBaseUrl : baseUrl,
		endpoint,
	);

	if (queryParams) {
		for (const [key, val] of Object.entries(queryParams)) {
			if (val === undefined || val === null) continue;
			if (Array.isArray(val)) {
				for (const v of val) url.searchParams.append(key, String(v));
			} else {
				url.searchParams.append(key, String(val));
			}
		}
	}

	let authHeaders: Record<string, string>;

	if (authType === "basic") {
		if (!apiKey || !apiSecret) {
			throw new DHLError(
				"UNAUTHORIZED",
				"Missing API key or secret for Basic Auth",
			);
		}
		authHeaders = {
			Authorization: `Basic ${encodeBasicAuth(apiKey, apiSecret)}`,
		};
	} else {
		if (!apiKey) {
			throw new DHLError("UNAUTHORIZED", "Missing API key");
		}
		authHeaders =
			apiType === "express"
				? { "X-API-KEY": apiKey }
				: { "DHL-API-Key": apiKey };
	}

	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), timeoutMs);

	const fetchOptions: RequestInit = {
		method,
		signal: controller.signal,
		headers: {
			...authHeaders,
			"Content-Type": "application/json",
			Accept: "application/json",
			...headers,
		},
		...(body !== undefined ? { body: JSON.stringify(body) } : {}),
	};

	try {
		const response = await fetch(url, fetchOptions);

		clearTimeout(timeout);

		if (!response.ok) {
			const errorCode = statusCodeToErrorCode(response.status);
			const message = getErrorMessage(response.status);
			let detail = message;

			try {
				const errorData = (await response.json()) as Record<string, unknown>;
				detail =
					(errorData?.detail as string) ||
					(errorData?.title as string) ||
					(errorData?.message as string) ||
					JSON.stringify(errorData) ||
					message;
			} catch {
				// non-JSON error body — fall back to default message
			}

			throw new DHLError(errorCode, detail, response.status);
		}

		if (response.status === 204) {
			return {} as T;
		}

		return (await response.json()) as T;
	} catch (error) {
		clearTimeout(timeout);

		if (error instanceof DHLError) throw error;

		const isAbort = error instanceof Error && error.name === "AbortError";
		const isNetwork =
			error instanceof TypeError ||
			(error instanceof Error &&
				"code" in error &&
				(error as { code?: string }).code === "ENOTFOUND");

		throw new DHLError(
			isAbort ? "TIMEOUT" : isNetwork ? "NETWORK_ERROR" : "UNKNOWN_ERROR",
			error instanceof Error ? error.message : "Request failed",
			undefined,
			error,
		);
	}
}

function statusCodeToErrorCode(status: number): ErrorCode {
	const map: Record<number, ErrorCode> = {
		400: "INVALID_REQUEST",
		401: "UNAUTHORIZED",
		403: "UNAUTHORIZED",
		404: "SHIPMENT_NOT_FOUND",
		422: "INVALID_REQUEST",
		429: "RATE_LIMITED",
		500: "SERVER_ERROR",
		502: "SERVER_ERROR",
		503: "SERVER_ERROR",
	};
	return map[status] ?? "UNKNOWN_ERROR";
}

function getErrorMessage(status: number): string {
	const messages: Record<number, string> = {
		400: "Invalid request parameters",
		401: "Unauthorized — check API credentials",
		403: "Forbidden — insufficient permissions",
		404: "Resource not found",
		422: "Unprocessable request — check payload",
		429: "Rate limit exceeded — slow down requests",
		500: "DHL server error",
		502: "DHL gateway error",
		503: "DHL service unavailable",
	};
	return messages[status] ?? `Request failed with status ${status}`;
}