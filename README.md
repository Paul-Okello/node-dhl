# DHL Shipment Tracking SDK

A type-safe TypeScript SDK for the DHL Shipment Tracking API with integrated MyDHL Express functionality. Works in both Node.js and browser environments with zero external dependencies.

## Features

- 🎯 **Fully Type-Safe** — Complete TypeScript support with comprehensive type definitions from OpenAPI spec
- 📦 **Isomorphic** — Works in Node.js, browsers, and any environment with Fetch API support
- 🚀 **Zero Dependencies** — Uses native Fetch API, no external HTTP libraries
- 🎓 **Well-Documented** — Extensive JSDoc comments on all methods and types
- 🔐 **Environment Switching** — Easy switch between sandbox and production
- ⚡ **Manual Error Handling** — Clean, predictable error handling without automatic retries
- 🔌 **Extensible** — Simple to add new endpoints and methods
- 🚚 **MyDHL Express Support** — Complete MyDHL Express API with rates, products, shipments, tracking, and more

## How the SDK Works

The SDK provides a **unified client** for two DHL APIs:

| API | Purpose | Use Case |  Authentication |
|-----|---------|----------|-----------------|
| **DHL Shipment Tracking** | Track shipments in the DHL network | Monitor existing shipments | `DHL-API-Key` header |
| **MyDHL Express** | Create & manage shipments, get rates, validate addresses | Book shipments, check pricing | `X-API-KEY` header |

### Architecture Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    Your Application                             │
│                                                                 │
│  const client = new DHLClient({ apiKey: 'xxx' })              │
└──────────────────┬──────────────────────────────────────────────┘
                   │
         ┌─────────┴──────────┐
         │                    │
    ┌────▼─────────┐   ┌──────▼──────────┐
    │   Tracking   │   │  MyDHL Express  │
    │   Methods    │   │    Methods      │
    │              │   │                 │
    │ • getShipment│   │ • getRates      │
    │ • listShip.. │   │ • getProducts   │
    └────┬─────────┘   └──────┬──────────┘
         │                    │
         │ DHL-API-Key        │ X-API-KEY
         │                    │
    ┌────▼─────────┐   ┌──────▼──────────┐
    │ Tracking API │   │ Express API     │
    │ (api.dhl.com)│   │ (express.api...) │
    └──────────────┘   └─────────────────┘
```

## Installation

```bash
npm install dhl-ts
```

## Quick Start

### Basic Usage - Tracking

```typescript
import { DHLClient, DHLError } from 'dhl-ts';

// Initialize the client
const client = new DHLClient({
  apiKey: process.env.DHL_API_KEY,
  environment: 'production'  // or 'sandbox'
});

// Track a shipment
try {
  const tracking = await client.getShipment({
    searchType: 'shipmentID',
    value: 'S2400127053'
  });

  console.log(`Status: ${tracking.shipment.phase}`);
  console.log(`Origin: ${tracking.shipment.origin.locationName}`);
  console.log(`Destination: ${tracking.shipment.destination.locationName}`);
} catch (error) {
  if (error instanceof DHLError) {
    console.error(`Error [${error.code}]: ${error.message}`);
  }
}
```

---

## Complete Tutorial: Getting Express Rates (Pricing)

This is a step-by-step guide to calculate shipping prices using the MyDHL Express API.

### Step 1: Initialize the Client

```typescript
import { DHLClient, type ExpressRatesRequest, type ExpressRatesResponse } from 'dhl-ts';

const client = new DHLClient({
  apiKey: process.env.DHL_EXPRESS_API_KEY,
  expressEnvironment: 'production'  // Use 'test' for testing
});
```

### Step 2: Build the Rates Request

Define your shipment details:

```typescript
// Type-safe request - TypeScript ensures all required fields are provided
const ratesRequest: ExpressRatesRequest = {
  // Origin details
  originCountryCode: 'US',      // ISO 3166-1 Alpha-2
  originCityName: 'New York',
  originPostalCode: '10001',

  // Destination details
  destinationCountryCode: 'DE',  // Germany
  destinationCityName: 'Berlin',
  destinationPostalCode: '10115',

  // Shipment dimensions & weight
  weight: 5,                      // in kg or lbs (based on unitOfMeasure)
  weightUnit: 'kg',
  length: 30,                     // in cm or inches
  width: 20,
  height: 15,
  dimensionsUnit: 'cm',

  // Date and flags
  plannedShippingDate: '2025-04-15',  // YYYY-MM-DD format
  isCustomsDeclarable: false,         // International? Set true
  unitOfMeasure: 'metric',            // or 'imperial'
  nextBusinessDay: false,              // Next day options?

  // Optional: Your DHL Express account number
  accountNumber: '123456789',

  // Optional: Request quoted shipment ID
  getQuotationID: true,

  // Optional: Include estimated delivery dates
  requestEstimatedDeliveryDate: true,
};
```

### Step 3: Call the Rates Method

```typescript
try {
  const ratesResponse: ExpressRatesResponse = await client.getExpressRates(ratesRequest);

  console.log('✅ Rates retrieved successfully');
  console.log(`Available products: ${ratesResponse.products.length}`);
} catch (error) {
  if (error instanceof DHLError) {
    console.error(`❌ API Error: ${error.code} - ${error.message}`);
  }
}
```

### Step 4: Parse the Response - Pricing Breakdown

```typescript
const ratesResponse = await client.getExpressRates(ratesRequest);

// Iterate through available DHL Express services
ratesResponse.products.forEach((product) => {
  console.log('\n' + '='.repeat(60));
  console.log(`📦 Service: ${product.productName}`);
  console.log(`   Code: ${product.productCode}`);
  console.log(`   Type: ${product.networkTypeCode}`); // DD=Day Definite, TD=Time Definite
  console.log(`   Requires Agreement: ${product.isCustomerAgreement}`);

  // Weight information
  console.log(`\n📊 Weight:`);
  console.log(`   Volumetric: ${product.weight.volumetric} ${product.weight.unitOfMeasurement}`);
  console.log(`   Provided: ${product.weight.provided} ${product.weight.unitOfMeasurement}`);

  // Pricing information
  console.log(`\n💰 Total Price:`);
  product.totalPrice.forEach((priceInfo) => {
    console.log(`   ${priceInfo.priceCurrency}: ${priceInfo.price}`);
  });

  // Detailed breakdown (if available)
  if (product.detailedPriceBreakdown && product.detailedPriceBreakdown.length > 0) {
    console.log(`\n📋 Price Breakdown:`);
    product.detailedPriceBreakdown.forEach((breakdown) => {
      breakdown.breakdown.forEach((item) => {
        console.log(`   - ${item.name}: ${breakdown.priceCurrency} ${item.price}`);
        if (item.priceBreakdown) {
          item.priceBreakdown.forEach((pb) => {
            console.log(`     • ${pb.priceType}: ${pb.price} (${pb.rate}%)`);
          });
        }
      });
    });
  }

  // Estimated delivery date (if requested)
  if (product.estimatedDeliveryDate) {
    console.log(`\n📅 Estimated Delivery: ${product.estimatedDeliveryDate}`);
  }
});
```

### Complete Example: Get Cheapest Option

```typescript
import { DHLClient, DHLError, type ExpressRatesRequest } from 'dhl-ts';

async function getCheapestShippingOption() {
  const client = new DHLClient({
    apiKey: process.env.DHL_EXPRESS_API_KEY,
    expressEnvironment: 'production'
  });

  const ratesRequest: ExpressRatesRequest = {
    originCountryCode: 'US',
    originCityName: 'Los Angeles',
    originPostalCode: '90001',
    destinationCountryCode: 'FR',
    destinationCityName: 'Paris',
    destinationPostalCode: '75001',
    weight: 2.5,
    weightUnit: 'kg',
    length: 25,
    width: 15,
    height: 10,
    dimensionsUnit: 'cm',
    plannedShippingDate: '2025-04-20',
    isCustomsDeclarable: true,
    unitOfMeasure: 'metric'
  };

  try {
    const rates = await client.getExpressRates(ratesRequest);

    // Find product with lowest price
    let cheapest = rates.products[0];
    let lowestPrice = cheapest.totalPrice[0]?.price ?? Infinity;

    rates.products.forEach((product) => {
      const price = product.totalPrice[0]?.price ?? Infinity;
      if (price < lowestPrice) {
        lowestPrice = price;
        cheapest = product;
      }
    });

    console.log('✅ Cheapest Option Found:');
    console.log(`   Service: ${cheapest.productName}`);
    console.log(`   Price: ${cheapest.totalPrice[0]?.priceCurrency} ${lowestPrice}`);
    console.log(`   Product Code: ${cheapest.productCode}`);

    return {
      service: cheapest.productName,
      price: lowestPrice,
      currency: cheapest.totalPrice[0]?.priceCurrency,
      productCode: cheapest.productCode
    };
  } catch (error) {
    if (error instanceof DHLError) {
      console.error(`Error getting rates: ${error.code} - ${error.message}`);
      throw error;
    }
  }
}

// Usage
const cheapestOption = await getCheapestShippingOption();
```

### Expected Output

```
✅ Cheapest Option Found:
   Service: DHL Express Worldwide
   Price: EUR 45.50
   Product Code: P
```

---

## Configuration

### Environment Selection

```typescript
// Production (default) - Real shipments
const prodClient = new DHLClient({
  apiKey: 'your-api-key'
});

// Sandbox tracking environment - Test tracking
const sandboxClient = new DHLClient({
  apiKey: 'your-sandbox-key',
  environment: 'sandbox'
});

// MyDHL Express test environment - Test rates/shipments
const expressTestClient = new DHLClient({
  apiKey: 'your-api-key',
  expressEnvironment: 'test'
});

// Hybrid: Production tracking + Test Express rates
const hybridClient = new DHLClient({
  apiKey: 'your-api-key',
  environment: 'production',        // Tracking API
  expressEnvironment: 'test'         // MyDHL Expression API
});

// Check current environments
console.log(client.getBaseUrl());     // https://api.dhl.com/dgff/transportation/v2
```

---

## API Methods Reference

### Tracking Methods (DHL Shipment Tracking API)

### Tracking Methods (DHL Shipment Tracking API)

#### `getShipment(params: GetShipmentParams) → Promise<TrackingResponse>`

Retrieve detailed tracking information for a single shipment.

```typescript
import type { GetShipmentParams } from 'dhl-ts';

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

// Access response data
console.log(result.shipment.phase);              // 'InTransit' | 'Picked up' | etc
console.log(result.shipment.origin.locationName);
console.log(result.shipment.destination.locationName);
console.log(result.shipment.estimatedTimeOfDelivery);
```

**Available Search Types:**
- `housebill`
- `shipmentID`
- `externalBookingID`
- `shipperReference`
- `consigneeReference`
- `fileReference`
- `masterbill`
- `containerNumber`

#### `listShipments(params: ListShipmentsParams) → Promise<ListShipmentsResponse>`

List shipments based on filter criteria.

```typescript
import type { ListShipmentsParams } from 'dhl-ts';

// List by shipment IDs with pagination
const list = await client.listShipments({
  shipmentID: {
    operator: 'OR',
    values: ['S2400127053', 'S2400127054']
  },
  lastUpdateFrom: '2024-07-30T00:00:00.000Z',
  lastUpdateTo: '2024-08-05T23:59:59.000Z',
  size: 20,           // Results per page
  skipResults: 0      // Pagination offset
});

console.log(list.shipments.length);  // Number of shipments
list.shipments.forEach(shipment => {
  console.log(`${shipment.id}: ${shipment.phase}`);
});
```

---

### MyDHL Express Methods

#### `getExpressRates(params: ExpressRatesRequest) → Promise<ExpressRatesResponse>`

**Get DHL Express shipping rates and available products** — This is the primary method for determining shipping costs.

```typescript
import type { ExpressRatesRequest, ExpressRatesResponse } from 'dhl-ts';

const rates: ExpressRatesResponse = await client.getExpressRates({
  originCountryCode: 'US',
  originCityName: 'New York',
  originPostalCode: '10001',
  destinationCountryCode: 'DE',
  destinationCityName: 'Berlin',
  destinationPostalCode: '10115',
  weight: 5,
  weightUnit: 'kg',
  length: 30,
  width: 20,
  height: 15,
  dimensionsUnit: 'cm',
  plannedShippingDate: '2025-04-15',
  isCustomsDeclarable: true,
  unitOfMeasure: 'metric'
});

// Check available services and prices
console.log(`Available services: ${rates.products.length}`);

rates.products.forEach(product => {
  console.log(`\n${product.productName}`);
  console.log(`  Code: ${product.productCode}`);
  console.log(`  Network Type: ${product.networkTypeCode}`);
  
  // Get the price
  const pricing = product.totalPrice[0];
  console.log(`  Price: ${pricing?.priceCurrency} ${pricing?.price}`);
  
  // Estimated delivery
  if (product.estimatedDeliveryDate) {
    console.log(`  Delivery: ${product.estimatedDeliveryDate}`);
  }
});
```

#### `getExpressProducts(params: ExpressProductsRequest) → Promise<ExpressProductsResponse>`

Retrieve available DHL Express products for a shipment (lightweight version of rates).

```typescript
const products = await client.getExpressProducts({
  originCountryCode: 'US',
  originCityName: 'Los Angeles',
  originPostalCode: '90001',
  destinationCountryCode: 'UK',
  destinationCityName: 'London',
  destinationPostalCode: 'SW1A1AA',
  weight: 2,
  weightUnit: 'kg',
  plannedShippingDate: '2025-04-20',
  isCustomsDeclarable: false
});

products.products.forEach(product => {
  console.log(`${product.productName} - ${product.productCode}`);
});
```

#### `validateExpressAddress(params: ExpressAddressValidateRequest) → Promise<ExpressAddressValidateResponse>`

Validate if DHL can ship to a specific address.

```typescript
const validation = await client.validateExpressAddress({
  type: 'delivery',
  countryCode: 'DE',
  cityName: 'Berlin',
  postalCode: '10115'
});

if (validation.isValidAddress) {
  console.log('✅ Can ship to this address');
} else {
  console.log('❌ Cannot ship to this address');
}
```

#### `getExpressLandedCost(params: ExpressLandedCostRequest) → Promise<ExpressLandedCostResponse>`

Calculate landed costs including duties, taxes, and shipping.

```typescript
const landedCost = await client.getExpressLandedCost({
  originCountryCode: 'US',
  originCityName: 'New York',
  originPostalCode: '10001',
  destinationCountryCode: 'DE',
  destinationCityName: 'Berlin',
  destinationPostalCode: '10115',
  weight: 10,
  weightUnit: 'kg',
  plannedShippingDate: '2025-04-15',
  isCustomsDeclarable: true,
  // Include items for duty calculation
  packages: [{
    weight: 10,
    dimensions: { length: 30, width: 20, height: 15 }
  }]
});

landedCost.products.forEach(product => {
  const price = product.totalPrice[0];
  console.log(`${product.productName}: ${price?.priceCurrency} ${price?.price}`);
});
```

#### `createExpressShipment(payload: ExpressCreateShipmentRequest) → Promise<ExpressCreateShipmentResponse>`

Create a new shipment in DHL Express.

```typescript
const shipment = await client.createExpressShipment({
  plannedShippingDateAndTime: '2025-04-15T10:00:00GMT+02:00',
  pickup: {
    isRequested: true,
    location: 'reception'
  },
  // ... full shipment details
});

console.log(`Shipment created: ${shipment.shipmentIdentificationNumber}`);
```

#### Express Tracking & Management Methods

```typescript
// Track a single shipment
const tracking = await client.getExpressShipmentTracking('1234567890');

// Track multiple shipments
const multiTracking = await client.trackExpressMultipleShipments({
  shipmentReference: 'My-Reference-123'
});

// Create pickup
const pickup = await client.createExpressPickup({
  /* pickup details */
});

// Update pickup
const updated = await client.updateExpressPickup('pickupNumber', {
  /* updated details */
});

// Cancel pickup
await client.cancelExpressPickup('pickupNumber', 'John Doe', 'no longer needed');

// Get proof of delivery
const pod = await client.getExpressProofOfDelivery('shipmentNumber');

// Upload document
const upload = await client.uploadExpressImage('shipmentNumber', {
  /* image data */
});

// Upload invoice data
const invoice = await client.uploadExpressInvoiceData('shipmentNumber', {
  /* invoice details */
});

// Add piece to existing shipment
const piece = await client.addExpressPiece('shipmentNumber', {
  /* piece details */
});

// Get reference data
const refData = await client.getExpressReferenceData();
```

---

## Error Handling

All methods throw `DHLError` on failure:

```typescript
import { DHLError } from 'dhl-ts';

try {
  const tracking = await client.getShipment({
    searchType: 'shipmentID',
    value: 'INVALID123'
  });
} catch (error) {
  if (error instanceof DHLError) {
    // Type-safe error properties
    console.log(`Code: ${error.code}`);        // e.g., 'SHIPMENT_NOT_FOUND'
    console.log(`Message: ${error.message}`);  // Human-readable message
    console.log(`Status: ${error.statusCode}); // HTTP status code
    
    switch (error.code) {
      case 'SHIPMENT_NOT_FOUND':
        console.log('That shipment does not exist');
        break;
      case 'UNAUTHORIZED':
        console.log('Invalid API key');
        break;
      case 'SERVER_ERROR':
        console.log('DHL servers temporarily unavailable');
        break;
      default:

        console.log(`Error: ${error.message}`);
    }
    
    // Also available:
    console.log(error.statusCode);  // HTTP status code
  }
}
```

### Error Codes

| Code | Description |
|------|-------------|
| `UNAUTHORIZED` | Invalid or missing API key (HTTP 401) |
| `SHIPMENT_NOT_FOUND` | Shipment doesn't exist (HTTP 404) |
| `INVALID_REQUEST` | Invalid request parameters (HTTP 400) |
| `SERVER_ERROR` | DHL API server error (HTTP 500) |
| `NETWORK_ERROR` | Network request failed |
| `UNKNOWN_ERROR` | An unexpected error occurred |

---

## TypeScript Type System

The SDK is fully typed from OpenAPI specifications:

```typescript
// All types are exported
import type {
  // Requests
  ExpressRatesRequest,
  ExpressRatesResponse,
  ExpressProductsRequest,
  ExpressProductsResponse,
  ExpressCreateShipmentRequest,
  ExpressCreateShipmentResponse,
  ExpressTrackingResponse,
  
  // Responses follow API spec exactly
  GetShipmentParams,
  TrackingResponse,
  
  // Configuration
  ClientConfig,
  Environment,
  ExpressEnvironment
} from 'dhl-ts';

// Example: Rates with full type safety
const ratesRequest: ExpressRatesRequest = {
  originCountryCode: 'US',      // TypeScript autocomplete on every field
  destinationCountryCode: 'DE',
  // ... error if required fields missing
};

const response: ExpressRatesResponse = await client.getExpressRates(ratesRequest);

// Type-safe access to response
response.products.forEach(product => {
  const price: number = product.totalPrice[0]?.price ?? 0;
  const currency: string = product.totalPrice[0]?.priceCurrency ?? 'USD';
});
```

---

## Complete Workflow Example

Track → Validate → Get Rates → Create Shipment:

```typescript
import { DHLClient, DHLError, type ExpressRatesRequest } from 'dhl-ts';

async function processShipmentRequest(
  originCountry: string,
  destinationCountry: string,
  weight: number
) {
  const client = new DHLClient({
    apiKey: process.env.DHL_EXPRESS_API_KEY,
    expressEnvironment: 'production'
  });

  try {
    // Step 1: Validate destination
    console.log('📍 Validating address...');
    const validation = await client.validateExpressAddress({
      type: 'delivery',
      countryCode: destinationCountry,
      cityName: 'Berlin',
      postalCode: '10115'
    });

    if (!validation.isValidAddress) {
      console.log('❌ Address not serviceable');
      return;
    }
    console.log('✅ Address validated');

    // Step 2: Get available rates
    console.log('💰 Fetching rates...');
    const ratesRequest: ExpressRatesRequest = {
      originCountryCode: originCountry,
      originCityName: 'New York',
      originPostalCode: '10001',
      destinationCountryCode: destinationCountry,
      destinationCityName: 'Berlin',
      destinationPostalCode: '10115',
      weight,
      weightUnit: 'kg',
      plannedShippingDate: new Date(Date.now() + 86400000)
        .toISOString()
        .split('T')[0],
      isCustomsDeclarable: originCountry !== destinationCountry,
      requestEstimatedDeliveryDate: true,
      getQuotationID: true
    };

    const rates = await client.getExpressRates(ratesRequest);

    // Step 3: Find best option
    const bestOption = rates.products.reduce((best, current) => {
      const bestPrice = best.totalPrice[0]?.price ?? Infinity;
      const currentPrice = current.totalPrice[0]?.price ?? Infinity;
      return currentPrice < bestPrice ? current : best;
    });

    console.log('✅ Best Rate Found:');
    console.log(`   Service: ${bestOption.productName}`);
    console.log(`   Price: ${bestOption.totalPrice[0]?.priceCurrency} ${bestOption.totalPrice[0]?.price}`);
    console.log(`   Delivery: ${bestOption.estimatedDeliveryDate}`);

    // Step 4: Ready to create shipment
    console.log('\n✅ Ready to create shipment with selected product');
    console.log(`   Product Code: ${bestOption.productCode}`);

    return {
      selected: bestOption,
      ratesId: rates.quotationID
    };
  } catch (error) {
    if (error instanceof DHLError) {
      console.error(`❌ Error: ${error.code} - ${error.message}`);
    }
    throw error;
  }
}

// Usage
await processShipmentRequest('US', 'DE', 2.5);
```

Output:
```
📍 Validating address...
✅ Address validated
💰 Fetching rates...
✅ Best Rate Found:
   Service: DHL Express Worldwide
   Price: EUR 45.50
   Delivery: 2025-04-17

✅ Ready to create shipment with selected product
   Product Code: P
```

---

## Browser Usage

Works in any modern browser:

```html
<!-- CDN or bundler -->
<script type="module">
  import { DHLClient } from './dist/index.js';

  const client = new DHLClient({
    apiKey: 'your-api-key',
    environment: 'sandbox'
  });

  const tracking = await client.getShipment({
    searchType: 'shipmentID',
    value: 'S2400127053'
  });

  console.log(tracking);
</script>
```

---

## Building & Publishing

```bash
# Install dependencies
npm install

# Build TypeScript → JavaScript
npm run build

# Watch mode for development
npm run dev

# Publish to npm (after updating version)
npm publish
```

## Extending the SDK

Add new methods:

```typescript
// src/client.ts
async myNewMethod(params: MyNewParams): Promise<MyNewResponse> {
  return makeRequest<MyNewResponse, MyNewParams>(this.config, {
    method: 'POST',
    endpoint: '/my-endpoint',
    body: params,
    apiType: 'express'  // or omit for tracking API
  });
}

// src/types/express.ts - Add your types
export interface MyNewParams {
  field1: string;
  field2: number;
}

export interface MyNewResponse {
  result: string;
}

// src/index.ts - Export types
export type { MyNewParams, MyNewResponse } from './types/express.js';
```

---

## Requirements

- **Node.js:** 14.0.0 or higher
- **TypeScript:** 5.0 or higher (optional, if using TS)
- **Browsers:** Modern browsers with Fetch API support
  - Chrome 41+
  - Firefox 39+
  - Safari 10.1+
  - Edge 14+

---

## FAQ

### Q: How do I get an API key?
**A:** Visit [DHL Developer Portal](https://developer.dhl.com) and register for API access.

### Q: Which API should I use for rates?
**A:** Use `getExpressRates()` - it's the most comprehensive method for pricing. Use `getExpressProducts()` for a lightweight version.

### Q: Can I use this in my frontend?
**A:** Yes, but avoid exposing your API key. Use a backend proxy or implement authentication server-side.

### Q: What's the difference between testing and production?
**A:** The `expressEnvironment: 'test'` uses the DHL test server. Use it to validate your integration without real charges.

### Q: How do I handle errors gracefully?
**A:** Always wrap API calls in try-catch and check `error instanceof DHLError`.

---

## Support

- **SDK Issues:** [GitHub Issues](https://github.com/Paul-Okello/node-dhl/issues)
- **DHL API Support:** dgf.apisupport@dhl.com
- **DHL Developer Portal:** https://developer.dhl.com

---

## License

MIT
