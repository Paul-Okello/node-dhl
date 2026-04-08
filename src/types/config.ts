/**
 * Environment configuration type for DHL API
 * @enum {string}
 */
export type Environment = 'production' | 'sandbox';

/**
 * Environment configuration type for MyDHL Express API
 * @enum {string}
 */
export type ExpressEnvironment = "production" | "test";

/**
 * Client configuration options for initializing the DHL Shipment Tracking SDK
 */
export interface ClientConfig {
		/**
		 * DHL API Key for authentication.
		 * Available from your DHL developer account.
		 * Used in the 'DHL-API-Key' or 'X-API-KEY' header for requests.
		 */
		apiKey: string;

		/**
		 * Environment to use for tracking API requests
		 * @default 'production'
		 * - 'production': Uses https://api.dhl.com/dgff/transportation/v2
		 * - 'sandbox': Uses https://api-sandbox.dhl.com/dgff/transportation/v2
		 */
		environment?: Environment;

		/**
		 * Environment to use for MyDHL Express requests
		 * @default 'production'
		 * - 'production': Uses https://express.api.dhl.com/mydhlapi
		 * - 'test': Uses https://express.api.dhl.com/mydhlapi/test
		 */
		expressEnvironment?: ExpressEnvironment;
	}

/**
 * Internal client configuration with resolved values
 * @internal
 */
export interface ResolvedClientConfig {
		apiKey: string;
		baseUrl: string;
		environment: Environment;
		expressBaseUrl: string;
	}
