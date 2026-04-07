import type {
  ClientConfig,
  Environment,
  ResolvedClientConfig,
} from './types/config.js';
import type {
  GetShipmentParams,
  ListShipmentsParams,
  TrackingResponse,
  ListShipmentsResponse,
} from './types/shipment.js';
import { makeRequest } from './utils/request.js';

/**
 * DHL Shipment Tracking API Client
 *
 * Type-safe SDK for retrieving shipment tracking information from the DHL API.
 * Supports both sandbox and production environments.
 *
 * @example
 * ```typescript
 * import { DHLClient } from '@dhl/shipment-tracking';
 *
 * const client = new DHLClient({
 *   apiKey: process.env.DHL_API_KEY,
 *   environment: 'production'
 * });
 *
 * Get tracking details for a shipment
 * try {
 *   const tracking = await client.getShipment({
 *     searchType: 'shipmentID',
 *     value: 'S2400127053'
 *   });
 *   console.log(tracking.shipment.phase);
 * } catch (error) {
 *   if (error instanceof DHLError) {
 *     console.error(`Error [${error.code}]: ${error.message}`);
 *   }
 * }
 * ```
 */
export class DHLClient {
  private config: ResolvedClientConfig;

  /**
   * Initialize the DHL Shipment Tracking client
   *
   * @param options - Configuration options
   * @throws {Error} If API key is missing
   *
   * @example
   * ```typescript
   * Using production environment (default)
   * const client = new DHLClient({
   *   apiKey: 'your-api-key'
   * });
   *
   * Using sandbox environment
   * const sandboxClient = new DHLClient({
   *   apiKey: 'your-sandbox-api-key',
   *   environment: 'sandbox'
   * });
   * ```
   */
  constructor(options: ClientConfig) {
    if (!options.apiKey) {
      throw new Error('API key is required');
    }

    const environment: Environment = options.environment || 'production';
    const baseUrl = this.resolveBaseUrl(environment);

    this.config = {
      apiKey: options.apiKey,
      baseUrl,
      environment,
    };
  }

  /**
   * Retrieve detailed tracking information for a single shipment
   *
   * Returns comprehensive shipment data including routing details, timestamps,
   * transport legs, and masterbill information (for registered users).
   *
   * @param params - Search parameters
   * @returns Promise resolving to tracking response with shipment details
   * @throws {DHLError} If the API returns an error
   *
   * @example
   * ```typescript
   * Track by shipment ID
   * const tracking = await client.getShipment({
   *   searchType: 'shipmentID',
   *   value: 'S2400127053'
   * });
   * console.log(tracking.shipment.origin.locationName);
   *
   * Track by housebill
   * const tracking = await client.getShipment({
   *   searchType: 'housebill',
   *   value: 'Q317839'
   * });
   *
   * Handle errors
   * try {
   *   const result = await client.getShipment({
   *     searchType: 'shipmentID',
   *     value: 'INVALID'
   *   });
   * } catch (error) {
   *   if (error instanceof DHLError && error.code === 'SHIPMENT_NOT_FOUND') {
   *     console.log('Shipment not found');
   *   }
   * }
   * ```
   */
  async getShipment(params: GetShipmentParams): Promise<TrackingResponse> {
    const response = await makeRequest<{ shipmentTracking: TrackingResponse }>(
      this.config,
      {
        method: 'GET',
        endpoint: '/shipment-tracking',
        queryParams: {
          'search-type': params.searchType,
          value: params.value,
        },
      }
    );

    return response.shipmentTracking;
  }

  /**
   * List shipments based on filter criteria
   *
   * Returns a list of shipments matching the provided filters. At least one
   * filter field must be provided. For public users, lastUpdateFrom and
   * lastUpdateTo are required.
   *
   * @param params - Filter parameters
   * @returns Promise resolving to list of shipments matching filters
   * @throws {DHLError} If the API returns an error or invalid parameters are provided
   *
   * @example
   * ```typescript
   * List shipments by multiple shipment IDs
   * const list = await client.listShipments({
   *   shipmentID: {
   *     operator: 'OR',
   *     values: ['S2400127053', 'S2400127054']
   *   },
   *   lastUpdateFrom: '2024-07-30T00:00:00.000Z',
   *   lastUpdateTo: '2024-08-05T23:59:59.000Z'
   * });
   *
   * List shipments with pagination
   * const list = await client.listShipments({
   *   housebill: {
   *     operator: 'OR',
   *     values: ['X00016084']
   *   },
   *   lastUpdateFrom: '2024-07-30T00:00:00.000Z',
   *   lastUpdateTo: '2024-08-05T23:59:59.000Z',
   *   size: 20,
   *   skipResults: 0
   * });
   *
   * List by container number
   * const list = await client.listShipments({
   *   'container-number': {
   *     operator: 'OR',
   *     values: ['MRKU2335007']
   *   },
   *   lastUpdateFrom: '2024-07-30T00:00:00.000Z',
   *   lastUpdateTo: '2024-08-05T23:59:59.000Z'
   * });
   * ```
   */
  async listShipments(params: ListShipmentsParams): Promise<ListShipmentsResponse> {
    // Filter out undefined values from params
    const bodyData = Object.entries(params).reduce(
      (acc, [key, value]) => {
        if (value !== undefined && value !== null) {
          acc[key] = value;
        }
        return acc;
      },
      {} as Record<string, unknown>
    );

    const response = await makeRequest<ListShipmentsResponse>(
      this.config,
      {
        method: 'POST',
        endpoint: '/shipment-list',
        body: bodyData,
      }
    );

    return response;
  }

  /**
   * Get the current environment (production or sandbox)
   *
   * @returns The current environment setting
   */
  getEnvironment(): Environment {
    return this.config.environment;
  }

  /**
   * Get the base URL being used for API requests
   *
   * @returns The base URL
   */
  getBaseUrl(): string {
    return this.config.baseUrl;
  }

  /**
   * Resolve the base URL from the environment setting
   * @internal
   */
 private resolveBaseUrl(environment: Environment): string {
  switch (environment) {
    case 'production':
      return 'https://api.dhl.com/dgff/transportation/v2';

    case 'sandbox':
      return 'https://api-sandbox.dhl.com/dgff/transportation/v2';

    default: {
      const exhaustive: never = environment;
      throw new Error(`Unknown environment: ${exhaustive}`);
    }
  }
}
}