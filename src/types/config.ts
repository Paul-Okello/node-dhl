/**
 * Environment configuration type for DHL API
 * @enum {string}
 */
export type Environment = 'production' | 'sandbox';

/**
 * Client configuration options for initializing the DHL Shipment Tracking SDK
 */
export interface ClientConfig {
  /**
   * DHL API Key for authentication.
   * Available from your DHL developer account.
   * Used in the 'DHL-API-Key' header for all requests.
   */
  apiKey: string;

  /**
   * Environment to use for API requests
   * @default 'production'
   * - 'production': Uses https://api.dhl.com/dgff/transportation/v2
   * - 'sandbox': Uses https://api-sandbox.dhl.com/dgff/transportation/v2
   */
  environment?: Environment;
}

/**
 * Internal client configuration with resolved values
 * @internal
 */
export interface ResolvedClientConfig {
  apiKey: string;
  baseUrl: string;
  environment: Environment;
}
