import type {
  ClientConfig,
  Environment,
  ExpressEnvironment,
  ResolvedClientConfig,
} from './types/config.js';
import type {
  GetShipmentParams,
  ListShipmentsParams,
  TrackingResponse,
  ListShipmentsResponse,
} from './types/shipment.js';
import type {
  ExpressCreateShipmentRequest,
  ExpressCreateShipmentResponse,
  ExpressTrackingOptions,
  ExpressTrackingResponse,
  ExpressProductsRequest,
  ExpressProductsResponse,
  ExpressAddressValidateRequest,
  ExpressAddressValidateResponse,
  ExpressRatesRequest,
  ExpressRatesResponse,
  ExpressLandedCostRequest,
  ExpressLandedCostResponse,
  ExpressCreatePickupRequest,
  ExpressCreatePickupResponse,
  ExpressUpdatePickupRequest,
  ExpressUpdatePickupResponse,
  ExpressAllocateIdentifiersRequest,
  ExpressAllocateIdentifiersResponse,
  ExpressUploadImageRequest,
  ExpressUploadImageResponse,
  ExpressUploadInvoiceDataRequest,
  ExpressUploadInvoiceDataResponse,
  ExpressAddPieceRequest,
  ExpressAddPieceResponse,
  ExpressEarlyShipmentScreeningRequest,
  ExpressEarlyShipmentScreeningResponse,
  ExpressProofOfDeliveryResponse,
  ExpressReferenceDataResponse,
  ExpressGetImageResponse,
  ExpressGetImageOptions,
  ExpressTrackMultipleOptions,
} from './types/express.js';
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
    const expressEnvironment: ExpressEnvironment = options.expressEnvironment || 'production';
    const expressBaseUrl = this.resolveExpressBaseUrl(expressEnvironment);

    this.config = {
      apiKey: options.apiKey,
      baseUrl,
      environment,
      expressBaseUrl,
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
   * Create a new DHL Express shipment using the MyDHL API.
   *
   * @param payload - Request payload for MyDHL Express shipment creation
   */
  async createExpressShipment(
    payload: ExpressCreateShipmentRequest
  ): Promise<ExpressCreateShipmentResponse> {
    return makeRequest<
					ExpressCreateShipmentResponse,
					ExpressCreateShipmentRequest
				>(this.config, {
					method: "POST",
					endpoint: "/shipments",
					body: payload,
					apiType: "express",
				});
  }

  /**
   * Retrieve DHL Express shipment tracking details from the MyDHL API.
   *
   * @param shipmentNumber - DHL Express shipment number
   * @param options - Optional tracking query parameters
   */
  async getExpressShipmentTracking(
    shipmentNumber: string,
    options?: ExpressTrackingOptions
  ): Promise<ExpressTrackingResponse> {
    const queryParams: Record<string, string> = {};

    if (options?.trackingView) {
      queryParams.trackingView = options.trackingView;
    }
    if (options?.levelOfDetail) {
      queryParams.levelOfDetail = options.levelOfDetail;
    }
    if (options?.shipperAccountNumber) {
      queryParams.shipperAccountNumber = options.shipperAccountNumber;
    }

    return makeRequest<ExpressTrackingResponse>(this.config, {
					method: "GET",
					endpoint: `/shipments/${encodeURIComponent(shipmentNumber)}/tracking`,
					queryParams,
					apiType: "express",
				});
  }

  /**
   * Retrieve available DHL Express products for a shipment.
   *
   * @param params - Request payload for MyDHL Express products lookup
   */
  async getExpressProducts(
    params: ExpressProductsRequest
  ): Promise<ExpressProductsResponse> {
    return makeRequest<ExpressProductsResponse, ExpressProductsRequest>(
					this.config,
					{
						method: "POST",
						endpoint: "/products",
						body: params,
						apiType: "express",
					},
				);
  }

  /**
   * Validate a DHL Express address using the MyDHL API.
   *
   * @param params - Address validation request payload
   */
  async validateExpressAddress(
    params: ExpressAddressValidateRequest
  ): Promise<ExpressAddressValidateResponse> {
    return makeRequest<
					ExpressAddressValidateResponse,
					ExpressAddressValidateRequest
				>(this.config, {
					method: "POST",
					endpoint: "/address_validate",
					body: params,
					apiType: "express",
				});
  }

  /**
   * Get DHL Express rates using the MyDHL API.
   *
   * @param params - Rates request payload
   */
  async getExpressRates(
    params: ExpressRatesRequest
  ): Promise<ExpressRatesResponse> {
    return makeRequest<ExpressRatesResponse, ExpressRatesRequest>(
					this.config,
					{
						method: "POST",
						endpoint: "/rates",
						body: params,
						apiType: "express",
					},
				);
  }

  /**
   * Get DHL Express landed cost using the MyDHL API.
   *
   * @param params - Landed cost request payload
   */
  async getExpressLandedCost(
    params: ExpressLandedCostRequest
  ): Promise<ExpressLandedCostResponse> {
    return makeRequest<ExpressLandedCostResponse, ExpressLandedCostRequest>(
					this.config,
					{
						method: "POST",
						endpoint: "/landedcost",
						body: params,
						apiType: "express",
					},
				);
  }

  /**
   * Create a DHL Express pickup using the MyDHL API.
   *
   * @param params - Pickup creation request payload
   */
  async createExpressPickup(
    params: ExpressCreatePickupRequest
  ): Promise<ExpressCreatePickupResponse> {
    return makeRequest<
					ExpressCreatePickupResponse,
					ExpressCreatePickupRequest
				>(this.config, {
					method: "POST",
					endpoint: "/pickups",
					body: params,
					apiType: "express",
				});
  }

  /**
   * Update a DHL Express pickup using the MyDHL API.
   *
   * @param dispatchConfirmationNumber - Pickup dispatch confirmation number
   * @param params - Pickup update request payload
   */
  async updateExpressPickup(
    dispatchConfirmationNumber: string,
    params: ExpressUpdatePickupRequest
  ): Promise<ExpressUpdatePickupResponse> {
    return makeRequest<
					ExpressUpdatePickupResponse,
					ExpressUpdatePickupRequest
				>(this.config, {
					method: "PATCH",
					endpoint: `/pickups/${encodeURIComponent(dispatchConfirmationNumber)}`,
					body: params,
					apiType: "express",
				});
  }

  /**
   * Cancel a DHL Express pickup using the MyDHL API.
   *
   * @param dispatchConfirmationNumber - Pickup dispatch confirmation number
   * @param requestorName - Name of the requestor
   * @param reason - Reason for cancellation
   */
  async cancelExpressPickup(
    dispatchConfirmationNumber: string,
    requestorName: string,
    reason: string
  ): Promise<void> {
    return makeRequest<void>(this.config, {
					method: "DELETE",
					endpoint: `/pickups/${encodeURIComponent(dispatchConfirmationNumber)}`,
					queryParams: {
						requestorName: encodeURIComponent(requestorName),
						reason: encodeURIComponent(reason),
					},
					apiType: "express",
				});
  }

  /**
   * Allocate identifiers for DHL Express shipments using the MyDHL API.
   *
   * @param params - Identifier allocation request payload
   */
  async allocateExpressIdentifiers(
    params: ExpressAllocateIdentifiersRequest
  ): Promise<ExpressAllocateIdentifiersResponse> {
    return makeRequest<
					ExpressAllocateIdentifiersResponse,
					ExpressAllocateIdentifiersRequest
				>(this.config, {
					method: "POST",
					endpoint: "/identifiers",
					body: params,
					apiType: "express",
				});
  }

  /**
   * Upload image for a DHL Express shipment using the MyDHL API.
   *
   * @param shipmentNumber - Shipment identification number
   * @param params - Image upload request payload
   */
  async uploadExpressImage(
    shipmentNumber: string,
    params: ExpressUploadImageRequest
  ): Promise<ExpressUploadImageResponse> {
    return makeRequest<
					ExpressUploadImageResponse,
					ExpressUploadImageRequest
				>(this.config, {
					method: "POST",
					endpoint: `/shipments/${encodeURIComponent(shipmentNumber)}/upload-image`,
					body: params,
					apiType: "express",
				});
  }

  /**
   * Upload invoice data for a DHL Express shipment using the MyDHL API.
   *
   * @param shipmentNumber - Shipment identification number
   * @param params - Invoice data upload request payload
   */
  async uploadExpressInvoiceData(
    shipmentNumber: string,
    params: ExpressUploadInvoiceDataRequest
  ): Promise<ExpressUploadInvoiceDataResponse> {
    return makeRequest<
					ExpressUploadInvoiceDataResponse,
					ExpressUploadInvoiceDataRequest
				>(this.config, {
					method: "POST",
					endpoint: `/shipments/${encodeURIComponent(shipmentNumber)}/upload-invoice-data`,
					body: params,
					apiType: "express",
				});
  }

  /**
   * Upload invoice data without shipment number using the MyDHL API.
   *
   * @param params - Invoice data upload request payload
   */
  async uploadExpressInvoiceDataWithoutSID(
    params: ExpressUploadInvoiceDataRequest
  ): Promise<ExpressUploadInvoiceDataResponse> {
    return makeRequest<
					ExpressUploadInvoiceDataResponse,
					ExpressUploadInvoiceDataRequest
				>(this.config, {
					method: "POST",
					endpoint: "/invoices/upload-invoice-data",
					body: params,
					apiType: "express",
				});
  }

  /**
   * Add a piece to a DHL Express shipment using the MyDHL API.
   *
   * @param shipmentNumber - Shipment identification number
   * @param params - Add piece request payload
   */
  async addExpressPiece(
    shipmentNumber: string,
    params: ExpressAddPieceRequest
  ): Promise<ExpressAddPieceResponse> {
    return makeRequest<ExpressAddPieceResponse, ExpressAddPieceRequest>(
					this.config,
					{
						method: "POST",
						endpoint: `/shipments/${encodeURIComponent(shipmentNumber)}/add-piece`,
						body: params,
						apiType: "express",
					},
				);
  }

  /**
   * Perform early shipment screening for a DHL Express shipment using the MyDHL API.
   *
   * @param params - Early shipment screening request payload
   */
  async earlyExpressShipmentScreening(
    params: ExpressEarlyShipmentScreeningRequest
  ): Promise<ExpressEarlyShipmentScreeningResponse> {
    return makeRequest<
					ExpressEarlyShipmentScreeningResponse,
					ExpressEarlyShipmentScreeningRequest
				>(this.config, {
					method: "POST",
					endpoint: "/early-shipment-screening",
					body: params,
					apiType: "express",
				});
  }

  /**
   * Get proof of delivery for a DHL Express shipment using the MyDHL API.
   *
   * @param shipmentNumber - Shipment identification number
   */
  async getExpressProofOfDelivery(
    shipmentNumber: string
  ): Promise<ExpressProofOfDeliveryResponse> {
    return makeRequest<ExpressProofOfDeliveryResponse>(this.config, {
					method: "GET",
					endpoint: `/shipments/${encodeURIComponent(shipmentNumber)}/proof-of-delivery`,
					apiType: "express",
				});
  }

  /**
   * Get reference data for MyDHL API services.
   */
  async getExpressReferenceData(): Promise<ExpressReferenceDataResponse> {
    return makeRequest<ExpressReferenceDataResponse>(this.config, {
					method: "GET",
					endpoint: "/reference-data",
					apiType: "express",
				});
  }

  /**
   * Get image/document for a DHL Express shipment using the MyDHL API.
   *
   * @param shipmentNumber - Shipment identification number
   * @param options - Query parameters for image retrieval
   */
  async getExpressImage(
    shipmentNumber: string,
    options?: ExpressGetImageOptions
  ): Promise<ExpressGetImageResponse> {
    const queryParams: Record<string, string> = {};

    if (options?.shipperAccountNumber) {
      queryParams.shipperAccountNumber = options.shipperAccountNumber;
    }
    if (options?.typeCode && options.typeCode.length > 0) {
      queryParams.typeCode = options.typeCode.join(',');
    }
    if (options?.pickupYearAndMonth) {
      queryParams.pickupYearAndMonth = options.pickupYearAndMonth;
    }
    if (options?.encodingFormat) {
      queryParams.encodingFormat = options.encodingFormat;
    }
    if (options?.allInOnePDF !== undefined) {
      queryParams.allInOnePDF = String(options.allInOnePDF);
    }
    if (options?.compressedPackage !== undefined) {
      queryParams.compressedPackage = String(options.compressedPackage);
    }

    return makeRequest<ExpressGetImageResponse>(this.config, {
					method: "GET",
					endpoint: `/shipments/${encodeURIComponent(shipmentNumber)}/get-image`,
					queryParams,
					apiType: "express",
				});
  }

  /**
   * Track multiple DHL Express shipments using the MyDHL API.
   *
   * @param options - Query parameters for tracking multiple shipments
   */
  async trackExpressMultipleShipments(
    options?: ExpressTrackMultipleOptions
  ): Promise<ExpressTrackingResponse> {
    const queryParams: Record<string, string> = {};

    if (options?.shipmentReference) {
      queryParams.shipmentReference = options.shipmentReference;
    }
    if (options?.shipperAccountNumber) {
      queryParams.shipperAccountNumber = options.shipperAccountNumber;
    }
    if (options?.dateRangeFrom) {
      queryParams.dateRangeFrom = options.dateRangeFrom;
    }
    if (options?.dateRangeTo) {
      queryParams.dateRangeTo = options.dateRangeTo;
    }
    if (options?.trackingView) {
      queryParams.trackingView = options.trackingView;
    }
    if (options?.levelOfDetail) {
      queryParams.levelOfDetail = options.levelOfDetail;
    }

    return makeRequest<ExpressTrackingResponse>(this.config, {
					method: "GET",
					endpoint: "/tracking",
					queryParams,
					apiType: "express",
				});
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

  /**
   * Resolve the MyDHL Express base URL from the environment setting
   * @internal
   */
  private resolveExpressBaseUrl(environment: ExpressEnvironment): string {
    switch (environment) {
      case 'production':
        return 'https://express.api.dhl.com/mydhlapi';

      case 'test':
        return 'https://express.api.dhl.com/mydhlapi/test';

      default: {
        const exhaustive: never = environment;
        throw new Error(`Unknown express environment: ${exhaustive}`);
      }
    }
  }
}
