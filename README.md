# DHL Shipment Tracking SDK

A type-safe TypeScript SDK for the DHL Shipment Tracking API. Works in both Node.js and browser environments with zero external dependencies.

## Features

- 🎯 **Fully Type-Safe** — Complete TypeScript support with comprehensive type definitions from OpenAPI spec
- 📦 **Isomorphic** — Works in Node.js, browsers, and any environment with Fetch API support
- 🚀 **Zero Dependencies** — Uses native Fetch API, no external HTTP libraries
- 🎓 **Well-Documented** — Extensive JSDoc comments on all methods and types
- 🔐 **Environment Switching** — Easy switch between sandbox and production
- ⚡ **Manual Error Handling** — Clean, predictable error handling without automatic retries
- 🔌 **Extensible** — Simple to add new endpoints and methods
- 🚚 **MyDHL Express Support** — Unified `DHLClient` can call the MyDHL Express API with `X-API-KEY`

## Installation

```bash
npm install dhl-ts
```

## Quick Start

### Basic Usage

```typescript
import { DHLClient, DHLError } from 'dhl-ts';

// Initialize the client
const client = new DHLClient({
  apiKey: process.env.DHL_API_KEY,
  environment: 'production' // or 'sandbox'
});

// Get tracking information for a shipment
try {
  const tracking = await client.getShipment({
    searchType: 'shipmentID',
    value: 'S2400127053'
  });

  console.log(tracking.shipment.phase);        // InTransit
  console.log(tracking.shipment.origin);       // Origin location
  console.log(tracking.shipment.destination);  // Destination location
} catch (error) {
  if (error instanceof DHLError) {
    console.error(`Error [${error.code}]: ${error.message}`);
  }
}
```

## Configuration

### Environment Selection

```typescript
// Production (default)
const prodClient = new DHLClient({
  apiKey: 'your-api-key'
});

// Sandbox tracking environment
const sandboxClient = new DHLClient({
  apiKey: 'your-sandbox-key',
  environment: 'sandbox'
});

// MyDHL Express test environment
const expressClient = new DHLClient({
  apiKey: 'your-api-key',
  expressEnvironment: 'test'
});

// Check current environment
console.log(client.getEnvironment()); // 'production'
console.log(client.getBaseUrl());     // 'https://api.dhl.com/dgff/transportation/v2'
```

## API Methods

### getShipment(params)

Retrieve detailed tracking information for a single shipment.

```typescript
// Search by shipment ID
const result = await client.getShipment({
  searchType: 'shipmentID',
  value: 'S2400127053'
});

// Search by housebill
const result = await client.getShipment({
  searchType: 'housebill',
  value: 'Q317839'
});

// Search by other identifiers
const result = await client.getShipment({
  searchType: 'externalBookingID',
  value: 'REF123'
});

// Available search types:
// - housebill
// - shipmentID
// - externalBookingID
// - shipperReference
// - consigneeReference
// - fileReference
// - masterbill
// - containerNumber
```

### listShipments(params)

List shipments based on filter criteria.

```typescript
// List by shipment IDs
const list = await client.listShipments({
  shipmentID: {
    operator: 'OR',
    values: ['S2400127053', 'S2400127054']
  },
  lastUpdateFrom: '2024-07-30T00:00:00.000Z',
  lastUpdateTo: '2024-08-05T23:59:59.000Z'
});

// List by housebills with pagination
const list = await client.listShipments({
  housebill: {
    operator: 'OR',
    values: ['X00016084', 'X00016085']
  },
  lastUpdateFrom: '2024-07-30T00:00:00.000Z',
  lastUpdateTo: '2024-08-05T23:59:59.000Z',
  size: 20,        // Results per page
  skipResults: 0   // Pagination offset
});
```

### MyDHL Express methods

These methods use the same `DHLClient` and the same `apiKey`, but call the MyDHL Express API using `X-API-KEY`.

```typescript
const client = new DHLClient({
  apiKey: process.env.DHL_API_KEY,
  expressEnvironment: 'production'
});

// Create shipment
const shipment = await client.createExpressShipment({
  plannedShippingDateAndTime: '2025-01-18T17:00:00GMT+01:00',
  // ... full MyDHL payload
});

// Track single shipment
const tracking = await client.getExpressShipmentTracking('1251820953', {
  trackingView: 'shipment-details',
  levelOfDetail: 'shipment'
});

// Track multiple shipments
const multiTracking = await client.trackExpressMultipleShipments({
  shipmentReference: 'ShipReferenceRCS03',
  trackingView: 'shipment-details-only'
});

// Get products
const products = await client.getExpressProducts({
  // ... full MyDHL products request payload
});

// Get rates
const rates = await client.getExpressRates({
  // ... full MyDHL rates request payload
});

// Get landed cost
const landedCost = await client.getExpressLandedCost({
  // ... full MyDHL landed cost request payload
});

// Validate address
const validation = await client.validateExpressAddress({
  // ... full MyDHL address validation request payload
});

// Create pickup
const pickup = await client.createExpressPickup({
  // ... full MyDHL pickup request payload
});

// Update pickup
const updatedPickup = await client.updateExpressPickup('dispatch123', {
  // ... full MyDHL update pickup payload
});

// Cancel pickup
await client.cancelExpressPickup('dispatch123', 'John Doe', 'no longer needed');

// Allocate identifiers
const identifiers = await client.allocateExpressIdentifiers({
  // ... full MyDHL identifiers request payload
});

// Upload image
const imageUpload = await client.uploadExpressImage('1234567890', {
  // ... full MyDHL image upload payload
});

// Upload invoice data
const invoiceUpload = await client.uploadExpressInvoiceData('1234567890', {
  // ... full MyDHL invoice data payload
});

// Upload invoice data without SID
const invoiceUploadNoSID = await client.uploadExpressInvoiceDataWithoutSID({
  // ... full MyDHL invoice data payload
});

// Add piece
const addPiece = await client.addExpressPiece('1234567890', {
  // ... full MyDHL add piece payload
});

// Early shipment screening
const screening = await client.earlyExpressShipmentScreening({
  // ... full MyDHL screening payload
});

// Get proof of delivery
const pod = await client.getExpressProofOfDelivery('1234567890');

// Get reference data
const refData = await client.getExpressReferenceData();

// Get image/document
const image = await client.getExpressImage('1234567890', {
  shipperAccountNumber: '848811505',
  typeCode: ['waybill', 'commercial-invoice'],
  encodingFormat: 'tiff',
  allInOnePDF: true
});
```

## Error Handling

```typescript
import { DHLError } from 'dhl-ts';

try {
  const tracking = await client.getShipment({
    searchType: 'shipmentID',
    value: 'INVALID'
  });
} catch (error) {
  if (error instanceof DHLError) {
    switch (error.code) {
      case 'SHIPMENT_NOT_FOUND':
        console.log('That shipment does not exist');
        break;
      case 'UNAUTHORIZED':
        console.log('Invalid API key');
        break;
      case 'SERVER_ERROR':
        console.log('DHL API is temporarily unavailable');
        break;
      default:
        console.log(`Error: ${error.message}`);
    }
  }
}
```

### Error Codes

| Code | Description |
|------|-------------|
| `UNAUTHORIZED` | Invalid or missing API key (HTTP 401) |
| `SHIPMENT_NOT_FOUND` | Shipment doesn't exist (HTTP 404) |
| `SERVER_ERROR` | DHL API server error (HTTP 500) |
| `NETWORK_ERROR` | Network request failed |
| `INVALID_REQUEST` | Invalid request parameters (HTTP 400) |
| `UNKNOWN_ERROR` | An unexpected error occurred |

## Type Safety

All parameters and responses are fully typed:

```typescript
import type {
  GetShipmentParams,
  TrackingResponse,
  Shipment,
  TrackingTimestamp
} from 'dhl-ts';

const params: GetShipmentParams = {
  searchType: 'shipmentID', // TypeScript ensures valid option
  value: 'S2400127053'
};

const tracking = await client.getShipment(params);
const shipment: Shipment = tracking.shipment;
```

## Building

```bash
# Install dependencies
npm install

# Build TypeScript
npm run build

# Watch mode for development
npm run dev
```

## Publishing to npm

1. Update version in `package.json`
2. Run `npm run build`
3. Run `npm publish`

## Extending the SDK

Add new API methods by:

1. Adding types to `src/types/shipment.ts`
2. Adding method to `src/client.ts` using the `makeRequest` utility
3. Exporting types from `src/index.ts`

Example:

```typescript
async newMethod(params: NewMethodParams): Promise<NewMethodResponse> {
  const response = await makeRequest<{ data: NewMethodResponse }>(
    this.config,
    {
      method: 'POST',
      endpoint: '/new-endpoint',
      body: params
    }
  );
  return response.data;
}
```

## Browser Usage

Works in any modern browser with Fetch API support:

```typescript
const client = new DHLClient({
  apiKey: 'your-api-key',
  environment: 'sandbox'
});

// Use with React, Vue, or any framework
```

## Requirements

- Node.js 14.0.0 or higher
- TypeScript 5.0 or higher
- Modern browsers with Fetch API (Chrome 41+, Firefox 39+, Safari 10.1+, Edge 14+)

## License

MIT

## Support

- DHL API Support: dgf.apisupport@dhl.com
- SDK Repository Issues: [GitHub Issues](https://github.com/yourusername/node-dhl/issues)
