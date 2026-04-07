// Client
export { DHLClient } from './client.js';

// Error handling
export { DHLError } from './errors/DHLError.js';

// Configuration types
export type { ClientConfig, Environment } from './types/config.js';

// Shipment types
export type {
  ShipmentSearchType,
  ShipmentPhase,
  ShipmentStatus,
  GetShipmentParams,
  ListShipmentsParams,
  Location,
  Address,
  ShippingParty,
  Carrier,
  TrackingTimestamp,
  LastEvent,
  ShipmentException,
  TransportUnit,
  TransportLeg,
  Emissions,
  EmissionMetric,
  Shipment,
  TrackingResponse,
  ShipmentListItem,
  ListShipmentsResponse,
  ShipmentListFilter,
} from './types/shipment.js';

// Error types
export type { ErrorCode, DHLErrorResponse } from './types/errors.js';
export { isDHLError } from './types/errors.js';
