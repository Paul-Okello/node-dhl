import type { ResolvedClientConfig } from '../types/config.js';
import type { ErrorCode } from '../types/errors.js';
import { DHLError } from '../errors/DHLError.js';

interface RequestConfig {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  endpoint: string;
  queryParams?: Record<string, string | number | boolean>;
  body?: Record<string, unknown>;
}

export async function makeRequest<T>(
  config: ResolvedClientConfig,
  requestConfig: RequestConfig
): Promise<T> {
  const { method, endpoint, queryParams, body } = requestConfig;
  const { baseUrl, apiKey } = config;

  // 1. Native URL & URLSearchParams handling
  const url = new URL(endpoint, baseUrl);
  if (queryParams) {
    Object.entries(queryParams).forEach(([key, val]) => {
      if (val !== undefined && val !== null) {
        url.searchParams.append(key, String(val));
      }
    });
  }

  const fetchOptions: RequestInit = {
    method,
    headers: {
      'DHL-API-Key': apiKey,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  };

  if (body && (method === 'POST' || method === 'PUT')) {
    fetchOptions.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
      const errorCode = statusCodeToErrorCode(response.status);
      const message = getErrorMessage(response.status);
      
      // Optional: Try to parse DHL's actual error message from the body
      let detail = message;
      try {
        const errorData = await response.json();
        detail = errorData.detail || errorData.message || message;
      } catch { /* ignore parse errors */ }

      throw new DHLError(errorCode, detail, response.status);
    }

    // Handle empty responses (204 No Content)
    if (response.status === 204) return {} as T;

    return (await response.json()) as T;
  } catch (error) {
    if (error instanceof DHLError) throw error;

    // Native Node fetch throws TypeError on network failures
    const isNetwork = error instanceof TypeError || (error as any).code === 'ENOTFOUND';
    
    throw new DHLError(
      isNetwork ? 'NETWORK_ERROR' : 'UNKNOWN_ERROR',
      error instanceof Error ? error.message : 'Request failed',
      undefined,
      error
    );
  }
}

function statusCodeToErrorCode(statusCode: number): ErrorCode {
  const map: Record<number, ErrorCode> = {
    401: 'UNAUTHORIZED',
    404: 'SHIPMENT_NOT_FOUND',
    400: 'INVALID_REQUEST',
    500: 'SERVER_ERROR',
  };
  return map[statusCode] || 'UNKNOWN_ERROR';
}

function getErrorMessage(statusCode: number): string {
  const messages: Record<number, string> = {
    400: 'Invalid request parameters',
    401: 'Unauthorized - check API Key',
    404: 'Shipment not found',
    500: 'DHL Server Error',
  };
  return messages[statusCode] || `Request failed with status ${statusCode}`;
}
