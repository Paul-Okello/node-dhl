import type { DHLErrorResponse, ErrorCode } from "../types/errors.js";

export class DHLError extends Error {
  public readonly code: ErrorCode;
  public readonly statusCode?: number;

  constructor(
    code: ErrorCode, 
    message: string, 
    statusCode?: number, 
    cause?: unknown
  ) {
    // 1. Call super with just the message for old TS compatibility
    super(message);
    
    // 2. Manually set the cause for Node.js 16.9+ to still see it in logs
    if (cause) {
      (this as any).cause = cause;
    }

    this.name = 'DHLError';
    this.code = code;
    this.statusCode = statusCode;
  }

  toJSON(): DHLErrorResponse {
    return {
      code: this.code,
      message: this.message,
      statusCode: this.statusCode
    };
  }
}
