/**
 * Search type options for shipment tracking queries
 * Each type searches by a different identifier
 */
export type ShipmentSearchType =
  | 'housebill'
  | 'shipmentID'
  | 'externalBookingID'
  | 'shipperReference'
  | 'consigneeReference'
  | 'fileReference'
  | 'masterbill'
  | 'containerNumber';

/**
 * Transit status of a shipment
 * Available for registered users only
 */
export type ShipmentPhase =
  | 'BookingCreated'
  | 'Planned'
  | 'InTransit'
  | 'Completed'
  | 'Cancelled';

/**
 * Delivery status of a shipment
 * Available for registered users only
 */
export type ShipmentStatus = 'Delayed' | 'OnTime';

/**
 * Parameter object for getShipment method
 */
export interface GetShipmentParams {
  /**
   * The type of identifier being used to search for the shipment
   */
  searchType: ShipmentSearchType;

  /**
   * The search value corresponding to the search type
   * @example
   * // For shipmentID type:
   * value: 'S2400127053'
   * // For housebill type:
   * value: 'X00016084'
   */
  value: string;
}

/**
 * Location information with airport/IATA code and UNLOCODE
 */
export interface Location {
  /**
   * IATA or three-character DHL station code
   * @example 'SIN'
   */
  airportCode?: string;

  /**
   * UNLOCODE or five-character DHL station code
   * @example 'SGSIN'
   */
  locationCode: string;

  /**
   * Human-readable location name
   * @example 'Singapore'
   */
  locationName?: string;

  /**
   * ISO country code (if applicable)
   * @example 'SG'
   */
  countryCode?: string;
}

/**
 * Address information for shipper/consignee
 * Available for registered users only
 */
export interface Address {
  /** First address line */
  addressLine1: string;

  /** Second address line (optional) */
  addressLine2?: string;

  /** Postal/ZIP code */
  postalCode?: string;

  /** City name */
  city?: string;

  /** State or province */
  stateProvince?: string;

  /** ISO country code */
  countryCode?: string;
}

/**
 * Party information (shipper or consignee)
 * Available for registered users only
 */
export interface ShippingParty {
  /**
   * Organization account number
   * @example 'USGEE036'
   */
  accountNumber?: string;

  /**
   * Company name
   * @example 'INT\'L INC'
   */
  name: string;

  /**
   * Company address
   */
  address?: Address;
}

/**
 * Carrier information for a shipment
 * Available for registered users only
 */
export interface Carrier {
  /**
   * Name of the carrier/transportation company
   * @example 'ATLANTIC CONTAINER LINE'
   */
  name: string;

  /**
   * Carrier's SCAC code
   * @example 'ACLU'
   */
  standardCarrierCode?: string;

  /**
   * Booking reference number
   * @example 'BBB-VAA 08JAN202'
   */
  bookingReference?: string;
}

/**
 * Single timestamp/event in shipment tracking history
 */
export interface TrackingTimestamp {
  /**
   * Status code identifier
   * See API documentation for code list by transport mode
   * @example 'EPD' (Estimated Departure)
   */
  timestampCode?: string;

  /**
   * Human-readable status description
   * @example 'Estimated Delivery'
   */
  timestampDescription: string;

  /**
   * Local date and time of the event
   * @example '2021-02-12T06:27:00.000Z'
   */
  timestampDateTime: string;

  /**
   * UNLOCODE for the event location
   * @example 'SGSIN'
   */
  locationCode?: string;

  /**
   * Location name
   * @example 'Singapore'
   */
  locationName?: string;

  /**
   * Flight/Journey identifier (for air transport)
   * Available for registered users only
   * @example 'SG439'
   */
  journeyID?: string;

  /**
   * Signatory name (for POD or A32)
   * Available for registered users only
   * @example 'HEBERT'
   */
  signatory?: string;

  /**
   * Additional remarks about the event
   */
  remarks?: string;
}

/**
 * Last known event of a shipment
 */
export interface LastEvent {
  /**
   * Status code of the last event
   */
  timestampCode?: string;

  /**
   * Description of the last event
   * @example 'Departure'
   */
  timestampDescription?: string;

  /**
   * Date/time of the last event
   * @example '2021-02-10T17:32+08:00'
   */
  timestampDateTime?: string;

  /**
   * Location code of the last event
   */
  locationCode?: string;

  /**
   * Location name of the last event
   */
  locationName?: string;
}

/**
 * Exception/issue with a shipment
 * Available for registered users only
 */
export interface ShipmentException {
  /** Exception type code */
  exceptionCode?: string;

  /** Exception type description */
  exceptionDescription?: string;

  /** Exception type classification */
  exceptionType?: string;

  /** Timestamp when exception occurred */
  exceptionDateTime?: string;

  /** Timestamp when exception was resolved */
  closureDateTime?: string;

  /** Additional remarks about the exception */
  remarks?: string;

  /** Party responsible for the exception */
  responsibleParty?: string;
}

/**
 * Transport unit (container) information
 * Available for ocean shipments and registered users only
 */
export interface TransportUnit {
  /**
   * Container ID
   * @example 'MRKU2335007'
   */
  transportUnitID: string;

  /**
   * Container size/type
   * @example '40GP'
   */
  transportUnitType?: string;

  /** Seal numbers on the container */
  sealNumbers?: string[];

  /** Timestamps for this container */
  timestamps?: TrackingTimestamp[];
}

/**
 * Single leg of a shipment's journey
 */
export interface TransportLeg {
  /**
   * Vessel name (for ocean transport)
   * @example 'MAERSK SARAT'
   */
  vesselName?: string;

  /**
   * Lloyd's Register number (for ocean transport)
   * @example '1112357'
   */
  vesselLloydsNumber?: string;

  /**
   * Flight number (for air) or voyage number (for ocean)
   * @example 'KL 480'
   */
  journeyID?: string;

  /**
   * Mode of transport
   * @example 'AIR'
   */
  modeOfTransport?: string;

  /**
   * Type of leg (e.g., 'MainCarriage')
   */
  legType?: string;

  /** Port/Airport where cargo is loaded */
  portOfLoading?: Location;

  /** Port/Airport where cargo is unloaded */
  portOfUnloading?: Location;

  /** Estimated departure date/time */
  estimatedDepartureDate?: string;

  /** Estimated arrival date/time */
  estimatedArrivalDate?: string;

  /** Actual departure date/time */
  actualDepartureDate?: string;

  /** Actual arrival date/time */
  actualArrivalDate?: string;
}

/**
 * Environmental emissions data for a shipment
 */
export interface EmissionMetric {
  /** Unit of measurement */
  uom: string;

  /** Tank-to-wheel value for pickup leg */
  pickupTankToWheel?: string;

  /** Well-to-wheel value for pickup leg */
  pickupWellToWheel?: string;

  /** Tank-to-wheel value for main haul */
  mainHaulTankToWheel?: string;

  /** Well-to-wheel value for main haul */
  mainHaulWellToWheel?: string;

  /** Tank-to-wheel value for delivery leg */
  deliveryTankToWheel?: string;

  /** Well-to-wheel value for delivery leg */
  deliveryWellToWheel?: string;

  /** Station handling tank-to-wheel value */
  stationHandlingTankToWheel?: string;

  /** Station handling well-to-wheel value */
  stationHandlingWellToWheel?: string;

  /** Total tank-to-wheel value */
  totalTankToWheel?: string;

  /** Total well-to-wheel value */
  totalWellToWheel?: string;
}

/**
 * Complete emissions data for a shipment
 */
export interface Emissions {
  /** Distance metrics */
  distance?: EmissionMetric;

  /** Energy consumption metrics */
  primaryEnergy?: EmissionMetric;

  /** Carbon dioxide equivalent metrics */
  carbonDioxideEquivalents?: EmissionMetric;

  /** Nitrogen oxides metrics */
  nitrogenOxides?: EmissionMetric;

  /** Sulfur dioxide metrics */
  sulfurDioxides?: EmissionMetric;

  /** Non-methane hydrocarbons metrics */
  nonMethaneHydrocarbons?: EmissionMetric;

  /** Particulate matter metrics */
  particles?: EmissionMetric;
}

/**
 * Complete shipment information
 */
export interface Shipment {
  /**
   * Housebill number
   * @example 'Q317839'
   */
  housebillNumber: string;

  /**
   * External booking ID (visible when querying by the same reference)
   * Available for registered users only
   * @example 'REF123'
   */
  externalBookingID?: string;

  /**
   * Current transit phase
   * Available for registered users only
   */
  phase?: ShipmentPhase;

  /** Origin location */
  origin: Location;

  /** Destination location */
  destination: Location;

  /**
   * Shipper information
   * Available for registered users only
   */
  shipper?: ShippingParty;

  /**
   * Consignee information
   * Available for registered users only
   */
  consignee?: ShippingParty;

  /**
   * Mode of transport
   * @example 'AIR'
   */
  modeOfTransport: string;

  /**
   * Total number of packages
   */
  totalPackages?: string;

  /**
   * Total shipment weight
   */
  totalWeight: string;

  /**
   * Unit of measurement for weight (default: KGM - kilograms)
   */
  totalWeightUom: string;

  /**
   * Total shipment volume
   */
  totalVolume: number;

  /**
   * Unit of measurement for volume (default: MTQ - cubic meters)
   */
  totalVolumeUom: string;

  /**
   * Chargeable weight
   * Available for registered users only
   */
  totalChargeable?: number;

  /**
   * Unit of measurement for chargeable weight
   * Available for registered users only
   */
  totalChargeableUom?: string;

  /**
   * Service code
   * @example 'AA3'
   */
  serviceCode?: string;

  /**
   * Service/Product name
   * @example 'Full Container Load'
   */
  serviceProduct?: string;

  /**
   * Payment terms
   * @example 'Collect'
   */
  paymentTerms?: string;

  /**
   * Express BOL flag (for ocean shipments)
   * true = Express BOL, false = Standard BOL
   */
  expressBOLFlag?: boolean;

  /** Warehouse update flag (for future use) */
  warehouseUpdateFlag?: boolean;

  /**
   * Incoterms code
   * Available for registered users only
   * @example 'EXW'
   */
  incoterms?: string;

  /**
   * Description of goods
   * Available for registered users only
   */
  goodsDescription?: string;

  /**
   * Delivery status (Delayed or OnTime)
   * Available for registered users only
   */
  status?: ShipmentStatus;

  /** Last known event */
  lastEvent?: LastEvent;

  /** All tracking events/timestamps */
  timestamps?: TrackingTimestamp[];

  /** Masterbill information (for registered users) */
  masterbills?: Array<{
    masterbillNumber: string;
    carrier?: Carrier;
  }>;

  /** Transport units (containers) for ocean shipments */
  transportUnits?: TransportUnit[];

  /** Journey legs (flights, vessel voyages, etc.) */
  transportLegs: TransportLeg[];

  /** Any exceptions or issues with the shipment */
  exceptions?: ShipmentException[];

  /** Additional reference numbers */
  references?: Array<{
    type: string;
    number: string;
  }>;

  /** Environmental impact data */
  emissions?: Emissions;
}

/**
 * Complete tracking response for a single shipment
 */
export interface TrackingResponse {
  /**
   * The query identifier used in the request
   */
  queryID?: string;

  /**
   * The type of query identifier
   */
  queryIDType?: ShipmentSearchType;

  /**
   * The shipment data
   */
  shipment: Shipment;
}

/**
 * Parameter structure for filtering in shipment list queries
 */
export interface ShipmentListFilter {
  /**
   * Filter operator (e.g., 'OR', 'AND')
   */
  operator?: string;

  /**
   * Array of values to filter by
   */
  values: string[];
}

/**
 * Parameters for listShipments method
 * At least one filter field must be provided
 */
export interface ListShipmentsParams {
  /**
   * Filter by shipment ID
   */
  shipmentID?: ShipmentListFilter;

  /**
   * Filter by housebill
   */
  housebill?: ShipmentListFilter;

  /**
   * Filter by external booking ID
   */
  externalBookingID?: ShipmentListFilter;

  /**
   * Filter by shipper reference
   */
  shipperReference?: ShipmentListFilter;

  /**
   * Filter by consignee reference
   */
  consigneeReference?: ShipmentListFilter;

  /**
   * Filter by file reference
   */
  fileReference?: ShipmentListFilter;

  /**
   * Filter by masterbill
   */
  masterbill?: ShipmentListFilter;

  /**
   * Filter by container number
   */
  ['container-number']?: ShipmentListFilter;

  /**
   * Start date for last update filter (required for public users)
   * @example '2024-07-30T07:49:35.551Z'
   */
  lastUpdateFrom?: string;

  /**
   * End date for last update filter (required for public users)
   * @example '2024-08-05T07:49:35.551Z'
   */
  lastUpdateTo?: string;

  /**
   * Number of results per page
   * @default 10
   */
  size?: number;

  /**
   * Number of results to skip (pagination)
   * @default 0
   */
  skipResults?: number;
}

/**
 * Single shipment summary in list response
 */
export interface ShipmentListItem {
  /**
   * Shipment ID
   */
  shipmentID: string;

  /**
   * Housebill number
   */
  housebill: string;

  /**
   * Current phase
   */
  phase: ShipmentPhase;

  /**
   * URL to get full tracking details
   */
  shipmentTrackingURL: string;
}

/**
 * Response for list shipments query
 */
export interface ListShipmentsResponse {
  /**
   * Array of shipment summaries
   */
  shipments: ShipmentListItem[];
}
