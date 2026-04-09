/**
 * Standardized DHL error codes
 */
export type ErrorCode =
		| "UNAUTHORIZED"
		| "SHIPMENT_NOT_FOUND"
		| "SERVER_ERROR"
		| "NETWORK_ERROR"
		| "INVALID_REQUEST"
		| "UNKNOWN_ERROR"
		| "RATE_LIMITED"
		| "TIMEOUT";

/**
 * Interface for serialized error objects (useful for JSON responses)
 */
export interface DHLErrorResponse {
  code: ErrorCode;
  message: string;
  statusCode?: number;
}

/**
 * Type guard to check if an unknown error is a DHLError-like object
 */
export function isDHLError(error: unknown): error is DHLErrorResponse {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    'message' in error
  );
}
