# MyDHL API — TypeScript Type Reference

> **Version:** 3.2.2 | **Base URLs:**  
> - Production: `https://express.api.dhl.com/mydhlapi`  
> - Test: `https://express.api.dhl.com/mydhlapi/test`

**Authentication:** HTTP Basic Auth — set `Authorization: Basic <base64(user:pass)>` on every request.

---

## Table of Contents

1. [API Endpoints](#api-endpoints)
2. [Core Types](#core-types)
3. [Rating & Products](#rating--products)
4. [Shipment](#shipment)
5. [Pickup](#pickup)
6. [Tracking](#tracking)
7. [Identifiers & Reference](#identifiers--reference)
8. [Service Points](#service-points)
9. [Errors](#errors)
10. [Type Aliases](#type-aliases)

---

## API Endpoints

### Pickup

#### `PATCH /pickups/{dispatchConfirmationNumber}`

**Update pickup information for an existing DHL Express pickup booking request**  

`operationId: exp-api-pickups-update`


**Query Parameters:**

```typescript
  /** Please provide message reference
 */
  Message-Reference?: string;
  /** Optional reference date in the  HTTP-date format https://tools.ietf.org/html/rfc7231#section-7.1.1.2 */
  Message-Reference-Date?: string;
  /** Please provide name of the plugin (applicable to 3PV only)
 */
  Plugin-Name?: string;
  /** Please provide version of the plugin (applicable to 3PV only)
 */
  Plugin-Version?: string;
  /** Please provide name of the shipping platform(applicable to 3PV only)
 */
  Shipping-System-Platform-Name?: string;
  /** Please provide version of the shipping platform (applicable to 3PV only)
 */
  Shipping-System-Platform-Version?: string;
  /** Please provide name of the webstore platform (applicable to 3PV only)
 */
  Webstore-Platform-Name?: string;
  /** Please provide version of the webstore platform (applicable to 3PV only)
 */
  Webstore-Platform-Version?: string;
  /** Interface version - do not change this field value
 */
  x-version: string;
```

**Request Body:** `supermodelIoLogisticsExpressUpdatePickupRequest`

**Responses:**

| Status | Type |
|--------|------|
| `200` | `supermodelIoLogisticsExpressUpdatePickupResponse` |
| `400` | `supermodelIoLogisticsExpressErrorResponse` |
| `404` | `supermodelIoLogisticsExpressErrorResponse` |
| `422` | `supermodelIoLogisticsExpressErrorResponse` |

#### `DELETE /pickups/{dispatchConfirmationNumber}`

**Cancel a DHL Express pickup booking request**  

`operationId: exp-api-pickups-cancel`


**Query Parameters:**

```typescript
  /** Name of the person requesting to cancel the scheduled pickup
 */
  requestorName: string;
  /** Provide why scheduled pickup is being cancelled
 */
  reason: string;
  /** Please provide message reference
 */
  Message-Reference?: string;
  /** Optional reference date in the  HTTP-date format https://tools.ietf.org/html/rfc7231#section-7.1.1.2 */
  Message-Reference-Date?: string;
  /** Please provide name of the plugin (applicable to 3PV only)
 */
  Plugin-Name?: string;
  /** Please provide version of the plugin (applicable to 3PV only)
 */
  Plugin-Version?: string;
  /** Please provide name of the shipping platform(applicable to 3PV only)
 */
  Shipping-System-Platform-Name?: string;
  /** Please provide version of the shipping platform (applicable to 3PV only)
 */
  Shipping-System-Platform-Version?: string;
  /** Please provide name of the webstore platform (applicable to 3PV only)
 */
  Webstore-Platform-Name?: string;
  /** Please provide version of the webstore platform (applicable to 3PV only)
 */
  Webstore-Platform-Version?: string;
  /** Interface version - do not change this field value
 */
  x-version: string;
```

**Responses:**

| Status | Type |
|--------|------|
| `200` | `void` |
| `400` | `supermodelIoLogisticsExpressErrorResponse` |
| `404` | `supermodelIoLogisticsExpressErrorResponse` |

#### `POST /pickups`

**Create a DHL Express pickup booking request**  

`operationId: exp-api-pickups`


**Query Parameters:**

```typescript
  /** Please provide message reference
 */
  Message-Reference?: string;
  /** Optional reference date in the  HTTP-date format https://tools.ietf.org/html/rfc7231#section-7.1.1.2 */
  Message-Reference-Date?: string;
  /** Please provide name of the plugin (applicable to 3PV only)
 */
  Plugin-Name?: string;
  /** Please provide version of the plugin (applicable to 3PV only)
 */
  Plugin-Version?: string;
  /** Please provide name of the shipping platform(applicable to 3PV only)
 */
  Shipping-System-Platform-Name?: string;
  /** Please provide version of the shipping platform (applicable to 3PV only)
 */
  Shipping-System-Platform-Version?: string;
  /** Please provide name of the webstore platform (applicable to 3PV only)
 */
  Webstore-Platform-Name?: string;
  /** Please provide version of the webstore platform (applicable to 3PV only)
 */
  Webstore-Platform-Version?: string;
  /** Interface version - do not change this field value
 */
  x-version: string;
```

**Request Body:** `supermodelIoLogisticsExpressPickupRequest`

**Responses:**

| Status | Type |
|--------|------|
| `201` | `supermodelIoLogisticsExpressPickupResponse` |
| `400` | `supermodelIoLogisticsExpressErrorResponse` |

### Shipment

#### `GET /shipments/{shipmentTrackingNumber}/proof-of-delivery`

**Electronic Proof of Delivery**  

`operationId: exp-api-shipments-epod`


**Query Parameters:**

```typescript
  /** DHL Express shipment identification number */
  shipmentTrackingNumber: string;
  /** DHL Express customer shipper account number */
  shipperAccountNumber?: string;
  content?: "epod-detail" | "epod-summary" | "epod-detail-esig" | "epod-summary-esig" | "epod-table" | "epod-table-detail" | "epod-table-esig";
  /** Please provide message reference
 */
  Message-Reference?: string;
  /** Optional reference date in the  HTTP-date format https://tools.ietf.org/html/rfc7231#section-7.1.1.2 */
  Message-Reference-Date?: string;
  /** Please provide name of the plugin (applicable to 3PV only)
 */
  Plugin-Name?: string;
  /** Please provide version of the plugin (applicable to 3PV only)
 */
  Plugin-Version?: string;
  /** Please provide name of the shipping platform(applicable to 3PV only)
 */
  Shipping-System-Platform-Name?: string;
  /** Please provide version of the shipping platform (applicable to 3PV only)
 */
  Shipping-System-Platform-Version?: string;
  /** Please provide name of the webstore platform (applicable to 3PV only)
 */
  Webstore-Platform-Name?: string;
  /** Please provide version of the webstore platform (applicable to 3PV only)
 */
  Webstore-Platform-Version?: string;
  /** Interface version - do not change this field value
 */
  x-version: string;
```

**Responses:**

| Status | Type |
|--------|------|
| `200` | `supermodelIoLogisticsExpressEPODResponse` |
| `400` | `supermodelIoLogisticsExpressErrorResponse` |
| `404` | `supermodelIoLogisticsExpressErrorResponse` |

#### `PATCH /shipments/{shipmentTrackingNumber}/upload-image`

**Upload Paperless Trade shipment (PLT) images of previously created shipment.**  

`operationId: exp-api-shipments-img-upload`


**Query Parameters:**

```typescript
  /** Interface version - do not change this field value
 */
  x-version: string;
  /** DHL Express shipment identification number */
  shipmentTrackingNumber: string;
```

**Request Body:** `supermodelIoLogisticsExpressImageUploadRequest`

**Responses:**

| Status | Type |
|--------|------|
| `200` | `void` |
| `400` | `supermodelIoLogisticsExpressErrorResponse` |
| `404` | `supermodelIoLogisticsExpressErrorResponse` |
| `422` | `supermodelIoLogisticsExpressErrorResponse` |

#### `POST /shipments`

**Create Shipment**  

`operationId: exp-api-shipments`


**Query Parameters:**

```typescript
  /** Please provide message reference
 */
  Message-Reference?: string;
  /** Optional reference date in the  HTTP-date format https://tools.ietf.org/html/rfc7231#section-7.1.1.2 */
  Message-Reference-Date?: string;
  /** Please provide name of the plugin (applicable to 3PV only)
 */
  Plugin-Name?: string;
  /** Please provide version of the plugin (applicable to 3PV only)
 */
  Plugin-Version?: string;
  /** Please provide name of the shipping platform(applicable to 3PV only)
 */
  Shipping-System-Platform-Name?: string;
  /** Please provide version of the shipping platform (applicable to 3PV only)
 */
  Shipping-System-Platform-Version?: string;
  /** Please provide name of the webstore platform (applicable to 3PV only)
 */
  Webstore-Platform-Name?: string;
  /** Please provide version of the webstore platform (applicable to 3PV only)
 */
  Webstore-Platform-Version?: string;
  /** Interface version - do not change this field value
 */
  x-version: string;
  /** If set to true, indicate strict DCT validation of address details, and validation of product and service(s) combination provided in request. */
  strictValidation?: boolean;
  /** Option to bypass PLT - WY service code lane capability validation
 */
  bypassPLTError?: boolean;
  /** If set to true, indicate to perform shipment data compliant validation on the shipment information. */
  validateDataOnly?: boolean;
```

**Request Body:** `supermodelIoLogisticsExpressCreateShipmentRequest`

**Responses:**

| Status | Type |
|--------|------|
| `201` | `supermodelIoLogisticsExpressCreateShipmentResponse` |
| `400` | `supermodelIoLogisticsExpressErrorResponse` |
| `422` | `supermodelIoLogisticsExpressErrorResponse` |
| `500` | `supermodelIoLogisticsExpressErrorResponse` |

#### `PATCH /shipments/{shipmentTrackingNumber}/upload-invoice-data`

**Upload Commercial Invoice data for your DHL Express shipment**  

`operationId: exp-api-shipments-invoice-data-awb`


**Query Parameters:**

```typescript
  /** DHL Express shipment identification number */
  shipmentTrackingNumber: string;
  /** Please provide message reference
 */
  Message-Reference?: string;
  /** Optional reference date in the  HTTP-date format https://tools.ietf.org/html/rfc7231#section-7.1.1.2 */
  Message-Reference-Date?: string;
  /** Please provide name of the plugin (applicable to 3PV only)
 */
  Plugin-Name?: string;
  /** Please provide version of the plugin (applicable to 3PV only)
 */
  Plugin-Version?: string;
  /** Please provide name of the shipping platform(applicable to 3PV only)
 */
  Shipping-System-Platform-Name?: string;
  /** Please provide version of the shipping platform (applicable to 3PV only)
 */
  Shipping-System-Platform-Version?: string;
  /** Please provide name of the webstore platform (applicable to 3PV only)
 */
  Webstore-Platform-Name?: string;
  /** Please provide version of the webstore platform (applicable to 3PV only)
 */
  Webstore-Platform-Version?: string;
  /** Interface version - do not change this field value
 */
  x-version: string;
```

**Request Body:** `supermodelIoLogisticsExpressUploadInvoiceDataRequest`

**Responses:**

| Status | Type |
|--------|------|
| `200` | `void` |
| `400` | `supermodelIoLogisticsExpressErrorResponse` |
| `422` | `supermodelIoLogisticsExpressErrorResponse` |

#### `GET /shipments/{shipmentTrackingNumber}/get-image`

**Get Image**  

`operationId: exp-api-shipments-documentimage`


**Query Parameters:**

```typescript
  /** DHL Express shipment identification number */
  shipmentTrackingNumber: string;
  /** DHL Express customer shipper account number. Either one of shipper or payer account number is required. */
  shipperAccountNumber?: string;
  /** DHL Express customer payer account number. Either one of shipper or payer account number is required. */
  payerAccountNumber?: string;
  /** Please provide correct document type. */
  typeCode: "waybill" | "commercial-invoice" | "customs-entry" | "transport-accompanying-document" | "generic-entry-summary" | "dhl-issued-proforma-invoice";
  /** Please provide the pickup's date in YYYY-MM format
 */
  pickupYearAndMonth: string;
  /** Please provide the document image encoding format in pdf or tiff format
 */
  encodingFormat?: "pdf" | "tiff";
  /** Option to return all the document images in a single PDF file
 */
  allInOnePDF?: boolean;
  /** Option to return all the document images in a compressed package
 */
  compressedPackage?: boolean;
  /** Please provide message reference
 */
  Message-Reference?: string;
  /** Optional reference date in the  HTTP-date format https://tools.ietf.org/html/rfc7231#section-7.1.1.2 */
  Message-Reference-Date?: string;
  /** Please provide name of the plugin (applicable to 3PV only)
 */
  Plugin-Name?: string;
  /** Please provide version of the plugin (applicable to 3PV only)
 */
  Plugin-Version?: string;
  /** Please provide name of the shipping platform(applicable to 3PV only)
 */
  Shipping-System-Platform-Name?: string;
  /** Please provide version of the shipping platform (applicable to 3PV only)
 */
  Shipping-System-Platform-Version?: string;
  /** Please provide name of the webstore platform (applicable to 3PV only)
 */
  Webstore-Platform-Name?: string;
  /** Please provide version of the webstore platform (applicable to 3PV only)
 */
  Webstore-Platform-Version?: string;
  /** Interface version - do not change this field value
 */
  x-version: string;
```

**Responses:**

| Status | Type |
|--------|------|
| `200` | `supermodelIoLogisticsExpressDocumentImageResponse` |
| `400` | `supermodelIoLogisticsExpressErrorResponse` |
| `404` | `supermodelIoLogisticsExpressErrorResponse` |

#### `PATCH /shipments/{shipmentTrackingNumber}/add-piece`

**Adding new pieces to a previously created shipment.**  

`operationId: exp-api-shipments-add-piece`


**Query Parameters:**

```typescript
  /** DHL Express shipment identification number */
  shipmentTrackingNumber: string;
  /** Please provide message reference
 */
  Message-Reference?: string;
  /** Optional reference date in the  HTTP-date format https://tools.ietf.org/html/rfc7231#section-7.1.1.2 */
  Message-Reference-Date?: string;
  /** Please provide name of the plugin (applicable to 3PV only)
 */
  Plugin-Name?: string;
  /** Please provide version of the plugin (applicable to 3PV only)
 */
  Plugin-Version?: string;
  /** Please provide name of the shipping platform(applicable to 3PV only)
 */
  Shipping-System-Platform-Name?: string;
  /** Please provide version of the shipping platform (applicable to 3PV only)
 */
  Shipping-System-Platform-Version?: string;
  /** Please provide name of the webstore platform (applicable to 3PV only)
 */
  Webstore-Platform-Name?: string;
  /** Please provide version of the webstore platform (applicable to 3PV only)
 */
  Webstore-Platform-Version?: string;
  /** Interface version - do not change this field value
 */
  x-version: string;
```

**Request Body:** `supermodelIoLogisticsExpressAddPieceRequest`

**Responses:**

| Status | Type |
|--------|------|
| `200` | `void` |
| `400` | `supermodelIoLogisticsExpressErrorResponse` |
| `404` | `supermodelIoLogisticsExpressErrorResponse` |
| `422` | `supermodelIoLogisticsExpressErrorResponse` |

### Early Shipment Screening

#### `POST /early-shipment-screening`

**Early shipment screening for break bulk baby shipments**  

`operationId: exp-api-earlyshipmentscreening`


**Query Parameters:**

```typescript
  /** Please provide message reference
 */
  Message-Reference?: string;
  /** Optional reference date in the  HTTP-date format https://tools.ietf.org/html/rfc7231#section-7.1.1.2 */
  Message-Reference-Date?: string;
  /** Please provide name of the plugin (applicable to 3PV only)
 */
  Plugin-Name?: string;
  /** Please provide version of the plugin (applicable to 3PV only)
 */
  Plugin-Version?: string;
  /** Please provide name of the shipping platform(applicable to 3PV only)
 */
  Shipping-System-Platform-Name?: string;
  /** Please provide version of the shipping platform (applicable to 3PV only)
 */
  Shipping-System-Platform-Version?: string;
  /** Please provide name of the webstore platform (applicable to 3PV only)
 */
  Webstore-Platform-Name?: string;
  /** Please provide version of the webstore platform (applicable to 3PV only)
 */
  Webstore-Platform-Version?: string;
```

**Request Body:** `supermodelIoLogisticsExpressEarlyShipmentScreeningRequest`

**Responses:**

| Status | Type |
|--------|------|
| `200` | `supermodelIoLogisticsExpressEarlyShipmentScreeningResponse` |
| `400` | `supermodelIoLogisticsExpressErrorResponse` |
| `422` | `supermodelIoLogisticsExpressErrorResponse` |
| `500` | `supermodelIoLogisticsExpressErrorResponse` |

### Rating

#### `GET /rates`

**Retrieve Rates for a one piece Shipment**  

`operationId: exp-api-rates`


**Query Parameters:**

```typescript
  /** DHL Express customer account number */
  accountNumber: string;
  /** A short text string code (see values defined in ISO 3166) specifying the shipment origin country. https://gs1.org/voc/Country, Alpha-2 Code */
  originCountryCode: string;
  /** Text specifying the postal code for an address. https://gs1.org/voc/postalCode */
  originPostalCode?: string;
  /** Text specifying the city name */
  originCityName: string;
  /** A short text string code (see values defined in ISO 3166) specifying the shipment destination country. https://gs1.org/voc/Country, Alpha-2 Code */
  destinationCountryCode: string;
  /** Text specifying the postal code for an address. https://gs1.org/voc/postalCode */
  destinationPostalCode?: string;
  /** Text specifying the city name */
  destinationCityName: string;
  /** Gross weight of the shipment including packaging. */
  weight: number;
  /** Total length of the shipment including packaging. */
  length: number;
  /** Total width of the shipment including packaging. */
  width: number;
  /** Total height of the shipment including packaging. */
  height: number;
  /** Timestamp represents the date you plan to ship your prospected shipment
 */
  plannedShippingDate: string;
  isCustomsDeclarable: true | false;
  /** The UnitOfMeasurement node conveys the unit of measurements used in the operation. This single value corresponds to the units of weight and measurement which are used throughout the message processing.
 */
  unitOfMeasurement: "metric" | "imperial";
  /** When set to true and there are no products available for given plannedShippingDate then products available for the next possible pickup date are returned
 */
  nextBusinessDay?: true | false;
  /** Please provide message reference
 */
  Message-Reference?: string;
  /** Optional reference date in the  HTTP-date format https://tools.ietf.org/html/rfc7231#section-7.1.1.2 */
  Message-Reference-Date?: string;
  /** Please provide name of the plugin (applicable to 3PV only)
 */
  Plugin-Name?: string;
  /** Please provide version of the plugin (applicable to 3PV only)
 */
  Plugin-Version?: string;
  /** Please provide name of the shipping platform(applicable to 3PV only)
 */
  Shipping-System-Platform-Name?: string;
  /** Please provide version of the shipping platform (applicable to 3PV only)
 */
  Shipping-System-Platform-Version?: string;
  /** Please provide name of the webstore platform (applicable to 3PV only)
 */
  Webstore-Platform-Name?: string;
  /** Please provide version of the webstore platform (applicable to 3PV only)
 */
  Webstore-Platform-Version?: string;
  /** Interface version - do not change this field value
 */
  x-version: string;
  /** If set to true, indicate strict DCT validation of address details, and validation of product and service(s) combination provided in request. */
  strictValidation?: boolean;
  /** Option to return list of all value added services and its rule groups if applicable */
  getAllValueAddedServices?: boolean;
  /** Option to return Estimated Delivery Date in response */
  requestEstimatedDeliveryDate?: boolean;
  /** Estimated Delivery Date Type. QDDF: is the fastest transit time as quoted to the customer at booking or shipment creation. When clearance or any other non-transport operational component is expected to impact transit time, QDDF does not constitute DHL's service commitment. QDDC: cconstitutes DHL's service commitment as quoted at booking or shipment creation. QDDC builds in clearance time, and potentially other special operational non-transport component(s), when relevant.  */
  estimatedDeliveryDateType?: "QDDC" | "QDDF";
```

**Responses:**

| Status | Type |
|--------|------|
| `200` | `supermodelIoLogisticsExpressRates` |
| `400` | `supermodelIoLogisticsExpressErrorResponse` |
| `500` | `supermodelIoLogisticsExpressErrorResponse` |

#### `POST /rates`

**Retrieve Rates for Multi-piece Shipments**  

`operationId: exp-api-rates-many`


**Query Parameters:**

```typescript
  /** Please provide message reference
 */
  Message-Reference?: string;
  /** Optional reference date in the  HTTP-date format https://tools.ietf.org/html/rfc7231#section-7.1.1.2 */
  Message-Reference-Date?: string;
  /** Please provide name of the plugin (applicable to 3PV only)
 */
  Plugin-Name?: string;
  /** Please provide version of the plugin (applicable to 3PV only)
 */
  Plugin-Version?: string;
  /** Please provide name of the shipping platform(applicable to 3PV only)
 */
  Shipping-System-Platform-Name?: string;
  /** Please provide version of the shipping platform (applicable to 3PV only)
 */
  Shipping-System-Platform-Version?: string;
  /** Please provide name of the webstore platform (applicable to 3PV only)
 */
  Webstore-Platform-Name?: string;
  /** Please provide version of the webstore platform (applicable to 3PV only)
 */
  Webstore-Platform-Version?: string;
  /** Interface version - do not change this field value
 */
  x-version: string;
  /** If set to true, indicate strict DCT validation of address details, and validation of product and service(s) combination provided in request. */
  strictValidation?: boolean;
```

**Request Body:** `supermodelIoLogisticsExpressRateRequest`

**Responses:**

| Status | Type |
|--------|------|
| `200` | `supermodelIoLogisticsExpressRates` |
| `400` | `supermodelIoLogisticsExpressErrorResponse` |
| `500` | `supermodelIoLogisticsExpressErrorResponse` |

#### `POST /landed-cost`

**Landed Cost**  

`operationId: exp-api-landed-cost`


**Query Parameters:**

```typescript
  /** Please provide message reference
 */
  Message-Reference?: string;
  /** Optional reference date in the  HTTP-date format https://tools.ietf.org/html/rfc7231#section-7.1.1.2 */
  Message-Reference-Date?: string;
  /** Please provide name of the plugin (applicable to 3PV only)
 */
  Plugin-Name?: string;
  /** Please provide version of the plugin (applicable to 3PV only)
 */
  Plugin-Version?: string;
  /** Please provide name of the shipping platform(applicable to 3PV only)
 */
  Shipping-System-Platform-Name?: string;
  /** Please provide version of the shipping platform (applicable to 3PV only)
 */
  Shipping-System-Platform-Version?: string;
  /** Please provide name of the webstore platform (applicable to 3PV only)
 */
  Webstore-Platform-Name?: string;
  /** Please provide version of the webstore platform (applicable to 3PV only)
 */
  Webstore-Platform-Version?: string;
  /** Interface version - do not change this field value
 */
  x-version: string;
```

**Request Body:** `supermodelIoLogisticsExpressLandedCostRequest`

**Responses:**

| Status | Type |
|--------|------|
| `200` | `supermodelIoLogisticsExpressRates` |
| `400` | `supermodelIoLogisticsExpressErrorResponse` |
| `500` | `supermodelIoLogisticsExpressErrorResponse` |

### Product

#### `GET /products`

**Retrieve available DHL Express products for a one piece Shipment**  

`operationId: exp-api-products`


**Query Parameters:**

```typescript
  /** DHL Express customer account number */
  accountNumber: string;
  /** A short text string code (see values defined in ISO 3166) specifying the shipment origin country. https://gs1.org/voc/Country, Alpha-2 Code */
  originCountryCode: string;
  /** Text specifying the postal code for an address. https://gs1.org/voc/postalCode */
  originPostalCode?: string;
  /** Text specifying the city name */
  originCityName: string;
  /** A short text string code (see values defined in ISO 3166) specifying the shipment destination country. https://gs1.org/voc/Country, Alpha-2 Code */
  destinationCountryCode: string;
  /** Text specifying the postal code for an address. https://gs1.org/voc/postalCode */
  destinationPostalCode?: string;
  /** Text specifying the city name */
  destinationCityName: string;
  /** Gross weight of the shipment including packaging. */
  weight: number;
  /** Total length of the shipment including packaging. */
  length: number;
  /** Total width of the shipment including packaging. */
  width: number;
  /** Total height of the shipment including packaging. */
  height: number;
  /** Timestamp represents the date you plan to ship your prospected shipment
 */
  plannedShippingDate: string;
  isCustomsDeclarable: true | false;
  /** The UnitOfMeasurement node conveys the unit of measurements used in the operation. This single value corresponds to the units of weight and measurement which are used throughout the message processing.
 */
  unitOfMeasurement: "metric" | "imperial";
  /** When set to true and there are no products available for given plannedShippingDate then products available for the next possible pickup date are returned
 */
  nextBusinessDay?: true | false;
  /** Please provide message reference
 */
  Message-Reference?: string;
  /** Optional reference date in the  HTTP-date format https://tools.ietf.org/html/rfc7231#section-7.1.1.2 */
  Message-Reference-Date?: string;
  /** Please provide name of the plugin (applicable to 3PV only)
 */
  Plugin-Name?: string;
  /** Please provide version of the plugin (applicable to 3PV only)
 */
  Plugin-Version?: string;
  /** Please provide name of the shipping platform(applicable to 3PV only)
 */
  Shipping-System-Platform-Name?: string;
  /** Please provide version of the shipping platform (applicable to 3PV only)
 */
  Shipping-System-Platform-Version?: string;
  /** Please provide name of the webstore platform (applicable to 3PV only)
 */
  Webstore-Platform-Name?: string;
  /** Please provide version of the webstore platform (applicable to 3PV only)
 */
  Webstore-Platform-Version?: string;
  /** Interface version - do not change this field value
 */
  x-version: string;
  /** If set to true, indicate strict DCT validation of address details, and validation of product and service(s) combination provided in request. */
  strictValidation?: boolean;
  /** Option to return list of all value added services and its rule groups if applicable */
  getAllValueAddedServices?: boolean;
  /** Option to return Estimated Delivery Date in response */
  requestEstimatedDeliveryDate?: boolean;
  /** Estimated Delivery Date Type. QDDF: is the fastest transit time as quoted to the customer at booking or shipment creation. When clearance or any other non-transport operational component is expected to impact transit time, QDDF does not constitute DHL's service commitment. QDDC: cconstitutes DHL's service commitment as quoted at booking or shipment creation. QDDC builds in clearance time, and potentially other special operational non-transport component(s), when relevant.  */
  estimatedDeliveryDateType?: "QDDC" | "QDDF";
```

**Responses:**

| Status | Type |
|--------|------|
| `200` | `supermodelIoLogisticsExpressProducts` |
| `400` | `supermodelIoLogisticsExpressErrorResponse` |
| `500` | `supermodelIoLogisticsExpressErrorResponse` |

### Tracking

#### `GET /shipments/{shipmentTrackingNumber}/tracking`

**Track a single DHL Express Shipment**  

`operationId: exp-api-shipments-tracking`


**Query Parameters:**

```typescript
  /** DHL Express shipment identification number */
  shipmentTrackingNumber: string;
  trackingView?: "all-checkpoints" | "all-checkpoints-with-remarks" | "last-checkpoint" | "shipment-details-only" | "advance-shipment" | "bbx-children";
  levelOfDetail?: "shipment" | "piece" | "all";
  /** Query parameter to request to return values of controlled access code fields in response. */
  requestControlledAccessDataCodes?: true | false;
  /** Query parameter to request to return GMT Offset of each event in response, for both shipment level and piece level. */
  requestGMTOffsetPerEvent?: true | false;
  /** Please provide message reference
 */
  Message-Reference?: string;
  /** Optional reference date in the  HTTP-date format https://tools.ietf.org/html/rfc7231#section-7.1.1.2 */
  Message-Reference-Date?: string;
  /** Format {3-character language code} */
  Accept-Language?: string;
  /** Please provide name of the plugin (applicable to 3PV only)
 */
  Plugin-Name?: string;
  /** Please provide version of the plugin (applicable to 3PV only)
 */
  Plugin-Version?: string;
  /** Please provide name of the shipping platform(applicable to 3PV only)
 */
  Shipping-System-Platform-Name?: string;
  /** Please provide version of the shipping platform (applicable to 3PV only)
 */
  Shipping-System-Platform-Version?: string;
  /** Please provide name of the webstore platform (applicable to 3PV only)
 */
  Webstore-Platform-Name?: string;
  /** Please provide version of the webstore platform (applicable to 3PV only)
 */
  Webstore-Platform-Version?: string;
  /** Interface version - do not change this field value
 */
  x-version: string;
```

**Responses:**

| Status | Type |
|--------|------|
| `200` | `supermodelIoLogisticsExpressTrackingResponse` |
| `400` | `supermodelIoLogisticsExpressErrorResponse` |
| `404` | `supermodelIoLogisticsExpressErrorResponse` |

#### `GET /tracking`

**Track a single or multiple DHL Express Shipments**  

`operationId: exp-api-shipments-tracking-multi`


**Query Parameters:**

```typescript
  /** DHL Express shipment identification number. Supports up to 200 tracking numbers. */
  shipmentTrackingNumber?: string[];
  /** DHL Express shipment piece tracking number. Supports up to 200 tracking numbers. */
  pieceTrackingNumber?: string[];
  /** Shipment reference which was provided during the shipment label creation
 */
  shipmentReference?: string;
  /** Shipment reference type which was provided during the shipment label creation
 */
  shipmentReferenceType?: string;
  /** Shipper DHL Express Account number under which the shipment label was created. Either one of shipper or payer account number must be provided.
 */
  shipperAccountNumber?: string;
  /** Payer DHL Express Account number under which the shipment label was created. Either one of shipper or payer account number must be provided.
 */
  payerAccountNumber?: string;
  /** When tracking by Shipment reference you need to restrict the search by timeframe. Please provide the start of the period.
 */
  dateRangeFrom?: string;
  /** When tracking by Shipment reference you need to restrict the search by timeframe. Please provide the end of the period.
 */
  dateRangeTo?: string;
  trackingView?: "all-checkpoints" | "all-checkpoints-with-remarks" | "last-checkpoint" | "shipment-details-only" | "advance-shipment" | "bbx-children";
  levelOfDetail?: "shipment" | "piece" | "all";
  /** Query parameter to request to return values of controlled access code fields in response. */
  requestControlledAccessDataCodes?: true | false;
  /** Please provide message reference
 */
  Message-Reference?: string;
  /** Optional reference date in the  HTTP-date format https://tools.ietf.org/html/rfc7231#section-7.1.1.2 */
  Message-Reference-Date?: string;
  /** Format {3-character language code} */
  Accept-Language?: string;
  /** Please provide name of the plugin (applicable to 3PV only)
 */
  Plugin-Name?: string;
  /** Please provide version of the plugin (applicable to 3PV only)
 */
  Plugin-Version?: string;
  /** Please provide name of the shipping platform(applicable to 3PV only)
 */
  Shipping-System-Platform-Name?: string;
  /** Please provide version of the shipping platform (applicable to 3PV only)
 */
  Shipping-System-Platform-Version?: string;
  /** Please provide name of the webstore platform (applicable to 3PV only)
 */
  Webstore-Platform-Name?: string;
  /** Please provide version of the webstore platform (applicable to 3PV only)
 */
  Webstore-Platform-Version?: string;
  /** Interface version - do not change this field value
 */
  x-version: string;
```

**Responses:**

| Status | Type |
|--------|------|
| `200` | `supermodelIoLogisticsExpressTrackingResponse` |
| `400` | `supermodelIoLogisticsExpressErrorResponse` |
| `404` | `supermodelIoLogisticsExpressErrorResponse` |

### Address

#### `GET /address-validate`

**Validate DHL Express pickup/delivery capabilities at origin/destination**  

`operationId: exp-api-address-validate`


**Query Parameters:**

```typescript
  type: "pickup" | "delivery";
  /** A short text string code (see values defined in ISO 3166) specifying the shipment origin country. https://gs1.org/voc/Country, Alpha-2 Code */
  countryCode: string;
  /** Text specifying the postal code for an address. https://gs1.org/voc/postalCode */
  postalCode?: string;
  /** Text specifying the city name */
  cityName?: string;
  /** Text specifying the county name */
  countyName?: string;
  /** If set to true service will return no records when exact valid match not found */
  strictValidation?: boolean;
  /** Please provide message reference
 */
  Message-Reference?: string;
  /** Optional reference date in the  HTTP-date format https://tools.ietf.org/html/rfc7231#section-7.1.1.2 */
  Message-Reference-Date?: string;
  /** Please provide name of the plugin (applicable to 3PV only)
 */
  Plugin-Name?: string;
  /** Please provide version of the plugin (applicable to 3PV only)
 */
  Plugin-Version?: string;
  /** Please provide name of the shipping platform(applicable to 3PV only)
 */
  Shipping-System-Platform-Name?: string;
  /** Please provide version of the shipping platform (applicable to 3PV only)
 */
  Shipping-System-Platform-Version?: string;
  /** Please provide name of the webstore platform (applicable to 3PV only)
 */
  Webstore-Platform-Name?: string;
  /** Please provide version of the webstore platform (applicable to 3PV only)
 */
  Webstore-Platform-Version?: string;
  /** Interface version - do not change this field value
 */
  x-version: string;
```

**Responses:**

| Status | Type |
|--------|------|
| `200` | `supermodelIoLogisticsExpressAddressValidateResponse` |
| `400` | `supermodelIoLogisticsExpressErrorResponse` |

### Identifier

#### `GET /identifiers`

**Service to allocate identifiers upfront for DHL Express Breakbulk or Loose Break Bulk shipments**  

`operationId: exp-api-identifiers`


**Query Parameters:**

```typescript
  /** DHL Express customer account number */
  accountNumber: string;
  /** Type of DHL Express identifier to retrieve */
  type: "SID" | "PID" | "ASID3" | "ASID6" | "ASID12" | "ASID24" | "HUID";
  /** Number of identifiers to be retrieved */
  size: string;
  /** Please provide message reference
 */
  Message-Reference?: string;
  /** Optional reference date in the  HTTP-date format https://tools.ietf.org/html/rfc7231#section-7.1.1.2 */
  Message-Reference-Date?: string;
  /** Please provide name of the plugin (applicable to 3PV only)
 */
  Plugin-Name?: string;
  /** Please provide version of the plugin (applicable to 3PV only)
 */
  Plugin-Version?: string;
  /** Please provide name of the shipping platform(applicable to 3PV only)
 */
  Shipping-System-Platform-Name?: string;
  /** Please provide version of the shipping platform (applicable to 3PV only)
 */
  Shipping-System-Platform-Version?: string;
  /** Please provide name of the webstore platform (applicable to 3PV only)
 */
  Webstore-Platform-Name?: string;
  /** Please provide version of the webstore platform (applicable to 3PV only)
 */
  Webstore-Platform-Version?: string;
  /** Interface version - do not change this field value
 */
  x-version: string;
```

**Responses:**

| Status | Type |
|--------|------|
| `200` | `supermodelIoLogisticsExpressIdentifierResponse` |
| `400` | `supermodelIoLogisticsExpressErrorResponse` |

### Servicepoint

#### `GET /servicepoints`

**Returns list of service points based on the given postal location address, service point ID or geocode details for DHL Express Service points to pick-up and drop-off shipments**  

`operationId: exp-api-servicepoints`


**Query Parameters:**

```typescript
  /** The address near which Service Points are to be found. . This parameter is conditional because it is mandatory when neither the servicePointID nor the idf is included in the request. Conversely, the address parameter is not required when searching using servicePointID or idf. 

Address can be sent as raw address. However to be GDPR compliant, tokenized address in REST V3 request should be sent. */
  address?: string;
  /** To specify the placeID for which the nearest service points have to be searched. PlaceId refers to the ID provided by any provider for particular Address. Ex: Google */
  placeId?: string;
  /** To specify the providerId(provider) for the place ID */
  providerId?: string;
  /** Latitude of user location. If address / servicePointID / idf parameter used, this parameter is not needed. Conversely, this parameter is optional If address / servicePointID / idf parameter used */
  latitude?: string;
  /** Longitude of user location, e.g.: 101.47346. 
If address / servicePointID / idf parameter used, this parameter is not needed. Conversely, this parameter is optional If address / servicePointID / idf parameter used
 */
  longitude?: string;
  /** Service Point ID is a unique key with 6 characters, consisting of Service Area for first 3 characters (e.g. BRU) and the last 3 characters is the Facility code (e.g. 001); Service point ID = BRU001. 

This is conditional parameter because it's mandatory to send 'servicePointID' if neither address nor idf is sent in the request. If address or idf is used, servicePointID not possible to use. 

Validation: Input must be exactly 6 characters long */
  servicePointID?: string;
  /** Facility Reference ID: A unique code to identify facility used in country legacy systems. E.g. ES282291.  

This is conditional parameter because it's a mandatory to send 'idf' if neither address nor servicePointID is sent in the request. If address or servicePointID is used, idf not possible to use */
  idf?: string;
  /** The 'countryCode' parameter is a conditional parameter because its required when providing the 'address' parameter in a GSPL search. However, it is optional when using the 'servicePointID' or 'latitude' and 'longitude' parameters. 
Only ISO 3166-1 - Alpha-2 for country code can be used, e.g. NL, ES, GB . This country code is used for returning matching service points in that country. 

 

When rendering the service point information, the time format (24h or AM/PM), and distance unit (km/miles) are derived from the country information stored in the GSPL database for the country specified via this parameter. 

E.g. for countryCode=GB will be time format AM/PM and distance unit will be mi. 

E.g. for countryCode=DE will be time format 24h and distance unit will be km.  

 

The CountryCode will also be set in the GREF web service request, so that only service points from this country are returned. */
  countryCode?: string;
  /** Language Code - represents the language. Mandatory if Script Code is provided or Language Country Code is provided, else optional. E.g. 'eng' 

Language Code is using ISO 3166-1 alpha-3 (3 letters)). Language code 'eng' is used as default value if not provided in the URL  */
  language?: string;
  /** Language Script Code - represents the writing system. This is conditional parameter because its mandatory only if Language Country Code is provided, else optional. E.g. Latn. 
Default value is 'latn'.
 */
  languageScriptCode?: string;
  /** Language Country Code - can be used to differentiate between linguistic variants of the same Language. Default value is 'GB'. */
  languageCountryCode?: string;
  /** Max. number of service points to be returned. It's a mandatory parameter when searched with address / latitude & longitude parameters.  

If servicePointID or idf is used, this parameter is ignored, because in such case only 1 result is returned. 
Note: GSPL can return a max of 50 service points due to GREF's constraint. 
 */
  servicePointResults?: string;
  /** Comma separated list of physical process capability codes.

 81: I have a DHL account or return shipment

 82: I have paid online

 88: I will pay at the DHL Service Point

 73: I will create a DHL shipping label at the DHL Service Point

 74: I have printed a DHL label

75,76: I have a QR code

78,79: Im collecting a DHL Express parcel

86,87: I have directed a DHL Express parcel to a DHL Service Point

Possible Combinations : 81,73 | 81,74 | 81,75,76 | 83,74 | 83,75,76 | 82,74 | 82,75,76 | 88,73 | 78,79 | 86,87
Note: | is just used to represent the seperation of combinations.

If capability is not sent in the request, GSPL queries with all capabilities configured for the searched country.
 */
  capability?: string;
  /** Service points open Before given Time. E.g.: 14:00 will find service points which are open before 14:00. Validation: Ensure the time is formatted as HH:MM and falls within the range of 00:00 to 23:59 */
  openBefore?: string;
  /** Service points open After given time e.g.:15:00 will find service points which are open after 15:00. Validation: Ensure the time is formatted as HH:MM and falls within the range of 00:00 to 23:59 */
  openAfter?: string;
  /** Open on Weekday, valid values as follow: 

1 - Monday 

2 - Tuesday 

3 - Wednesday 

4 - Thursday 

5 - Friday 

6 - Saturday 

0 - Sunday  */
  openDay?: "1" | "2" | "3" | "4" | "5" | "6" | "0"[];
  /** Max. weight of the shipment. Decimals are allowed as well (decimal separator either ',' or '.').
Max weight depends on the selected country. e.g. 30. */
  weight?: string;
  /** Weight units - kg or lb. Required if weight is passed in.
Ensure that both metric units of measure, such as kg and cm, and imperial units of measure, such as lb and in, are sent together. If imperial and metric units of measure are sent in a mixed format, the system will display the unit of measure based on the 'resultUom'

Warning message 'Inconsistencies in units of measurement (UOMs) identified. Result derived by country configured UOM - <km/mile>.' will appear in the REST V3 response if mixed dimensionUom and weightUom(E.g. kg and In UOM's) are sent.
 */
  weightUom?: string;
  /** Max. length of the shipment  - the highest dimension. Max length depends on the selected country. 

e.g. 30. Decimals are allowed as well (decimal separator either ',' or '.') */
  length?: string;
  /** Max. width of the shipment  - the middle dimension 
Max width depends on the selected country.
e.g. 30. Decimals are allowed as well (decimal separator either ',' or '.') */
  width?: string;
  /** Max. height of the shipment  - the lowest dimension. Max height depends on the selected country. 

e.g. 30. Decimals are allowed as well (decimal separator either ',' or '.') */
  height?: string;
  /** Dimension units - cm or in. Required with any of length, width or height parameter.
Ensure that both metric units of measure, such as kg and cm, and imperial units of measure, such as lb and in, are sent together. If imperial and metric units of measure are sent in a mixed format, the system will display the unit of measure based on the 'resultUom'

Warning message 'Inconsistencies in units of measurement (UOMs) identified. Result derived by country configured UOM - <km/mile>.' will appear in the REST V3 response if mixed dimensionUom and weightUom(E.g. kg and In UOM's) are sent. 
 */
  dimensionsUom?: "cm" | "in"[];
  /** To specify the client app code to track GSPL client usage */
  clientAppCode?: string;
  /** To specify the session token for internal auditing and logging purposes. If the sessionToken is not sent, then, the transaction id from gspl is 
used on the api calls to external systems if required and logging. */
  sessionToken?: string;
  /** Distance uom to be used when returning response, it can be either km or mi. If not provided, default uom set for the country is returned.  */
  resultUom?: "km" | "mi"[];
  /** Service Area Code of the search address */
  serviceAreaCode?: string;
  /** Comma separated list of service point types, e.g. 'CTY,STN,247'. 

Allowed Values: 

CTY (City) - High street premises. DHL owned and managed. Eg. Downtown

STN (Station) - DHL premises. DHL owned and managed at PUD locations

PRT (Partner) - Partners(External) store. Eg. 7-Eleven, Shell

247 (24/7) - operating 24hours a day, has locker facility.  DHL owned and unmanned or / and automated */
  servicePointTypes?: "CTY" | "STN" | "PRT" | "247"[];
  /** Maximum distance in kilometers between the geocoded address and the returned Service Points. Values equal or less than 0 are ignored. 

Accuracy of the maxDistance parameter: 

The GREF web service uses a search rectangle for  Service Point searches. Therefore the maxDistance value is used to create a square with side length l = maxDistance * 2. This means that the distance of some of the found Service Points may actually be longer as specified by the maxDistance parameter, if the Service Point is located outside the circle with radius r = maxDistance, but still within the search square: 

Centre point of the search square is the latitude/longitude pair resulting from a geocoding request to the Bing geocoding API, which in some cases may not represent the actual location of the address. The more precisely the address is specified, the higher is the probability that the geocoded location matches with the search address.  */
  maxDistance?: string;
  /** Static number, max pieces which can be handled on the service point. */
  pieceCountLimit?: string;
  /** Y/N indicator whether it is possible to pay import charges on service point. Default value is 'false' if importCharges parameter is not sent.  */
  importCharges?: "y" | "n"[];
  /** Unique key which will be generated by WSB team and used for authentication */
  key?: string;
  /** Allows combination of values for parameters servicePointTypes and importChanges. Limitations:- Only 1 level of conditions is allowed (not multiple AND/OR)Applicable only on servicePointTypes and importCharges parameters | stands for OR condition & stands for AND condition, splits multiple conditions. */
  combineParameters?: string;
  /** Estimated Delivery date: 

YYYY-MM-DDThh:mm:ssTZD (for example 2023-06-25T22:59:00Z). This is a SCMS (Servicepoint Capacity Management System) Parameter to receive a capacity data of the found service points additionally calling SCMS (Servicepoint Capacity Management System) service. */
  edd?: string;
  /** Parameter which will enable to filter out fully booked services in the GSPL response to client. 

Values: 

Y - GSPL will not send back service points which are fully booked. 

N - GSPL will send back all service points, also those where is no free capacity. 

If not provided in request, it will be set up as N by default.  

This is a SCMS (Servicepoint Capacity Management System) parameter.  */
  excludeFullyBooked?: "y" | "n"[];
  /** To specify the shipment ID. This is a SCMS (Servicepoint Capacity Management System) parameter. */
  shipmentID?: string;
  /** Piece ID without Data Identifier / Prefix. (for example JD0081105201831337270 instead of JJD0081105201831337270). This is a SCMS (Servicepoint Capacity Management System) parameter. */
  pieceID?: string;
  /** To specify the Shipment Origin Service Area Code. This is a SCMS (Servicepoint Capacity Management System) parameter. */
  shipmentOriginServiceAreaCode?: string;
  /** This is to include preconfigured non UI capability codes(ex. PPC 72) to be considered while sending the request to GREF. PPC 72 is applicable only for REST v3 request and not for GSPL UI.  */
  isResultsSpecificCapabRequired?: "true" | "false"[];
  /** This 'encrypt' flag is to indicate to GSPL whether the address is tokenized(encrypt=y) or non-tokenized. So that GSPL can detokenize to provide matching SVP list. 

 

When 'encrypt=y', GSPL clients should mandatorily send tokenized address in the REST V3 request.  

When 'encrypt=n', or without 'encrypt' parameter, client should only send non-tokenized address(raw address). 

Sample below:  

      Non-tokenized(raw) address: Sabah, Malaysia 

      Tokenized address: YmtzOVpTQWdQSGRjSm41bFlDRkZjR0ZKSWc9PQ== 

 

Address Tokenization: GSPL provides additional security to mask the address sent by the client in REST V3 request which will hide raw address visible on the 'View page Source' or in 'Developer tools. */
  encrypt?: "y" | "n"[];
  /** To specify whether the address parameter contains the base64 encoded value or not. E.g b64=true. 
Default value is 'false' if b64 parameter is not sent.
Note: To get expected results, address value must be encoded when b64 is sent as 'true'.
 */
  b64?: "true" | "false"[];
  /** ServicePoint Status(svpStatus) to be used when SVP of specific status is expected. it can be either active(A) or inactive(S,U,X,Y). If not provided, by default active=A service points are displayed in SVP list section.
Note: GSPL only accepts uppercase values A, S, U, X, and Y, and it is case-sensitive. Default value is 'A' if svpStatus is not sent.
 */
  svpStatus?: "A" | "S" | "U" | "X" | "Y"[];
  /** This indicates whether a warning to be displayed or not in case of mixed dimensionsUom and weightUom */
  hasMixedUnits?: "true" | "false"[];
```

**Responses:**

| Status | Type |
|--------|------|
| `200` | `ServicePointsRestResponseV3` |
| `500` | `ExceptionResponse` |

### Reference Data

#### `GET /reference-data`

**provide reference data currently used for MyDHL API services usage.**  

`operationId: exp-api-reference-data`


**Query Parameters:**

```typescript
  /** Must provide at least one datasetName value. If providing just the datasetName with no filterBy fields - the response will return the entire data set from the dataset table (bulk). */
  datasetName: "country" | "countryPostalcodeFormat" | "dangerousGoods" | "incoterm" | "productCode" | "serviceCode" | "packageTypeCode" | "documentTypeCode" | "customerShipmentReferenceType" | "customerPackageReferenceType" | "invoiceReferenceType" | "invoiceItemReferenceType" | "registrationNumberTypeCode" | "commodityCategory" | "returnStatusMessage" | "trackingEventCode" | "unitOfMeasurement" | "languageCode" | "outputImageTemplate" | "all";
  /** Use filter by value to query based on the specific string for optimized search.<br> <br> List of supported filterByValue per dataset (eg. dataset: filterByAttribute| supported filterByValue) <br><br> a) returnStatusMessage: serviceName|CreateShipment,DocumentImageRequest,RateRequest,RequestIdentifier,RequestPickup,AddressValidateRequest,TrackingRequest,UpdatePickup,UpdateShipment,UploadInvoiceData,DeleteShipment,DocumentRetrieve-ePOD <br> b) returnStatusMessage: operationName|get-image,identifiers,address-validate,
   RouteRequest, shipments, tracking, upload-image,landed-cost,rates,upload-invoice-data,pickup,proof-of-delivery <br>
c) returnStatusMessage: protocol|REST,SOAP,XMLPI <br> d) productCode: docNonDocIndicator|Y,N <br> e) languageCode: serviceName|Tracking,CreateShipment, categoryGroup|Tracking,commercial invoice, shipment receipt, email notification <br> f) outputImageTemplate: serviceName|CreateShipment,AddPiece, templateName|ECOM26_84_001,ECOM26_84_A4_001,other supported GLS template name, categoryGroup|transport label,waybill document,commercial invoice,return invoice,shipment receipt,qr code, imageFormat|PDF,ZPL,LP2,EPL2, description:template decription, multilingualSupport:Yes,No */
  filterByValue?: string;
  /** Use filter by attribute to define the list of supported attibuted for the specified datasetName. <br> List of supported attributes per dataset <br> (eg. dataset: supported filterByAttributes values) <br><br> a) country: countryCode, countryName <br> b) countryPostalcodeFormat: countryCode <br> c) dangerousGoods: serviceCode <br> d) incoterm: incoterm <br> e) productCode: productCode, countryCode, docNonDocIndicator <br> f) serviceCode: serviceCode, countryCode, chargeCodeTypeCode, serviceGroupDescription <br> g) packageTypeCode: packageTypeCode <br> h) documentTypeCode: customsDocumentTypeCode <br> i) customerShipmentReferenceType: shipmentReferenceTypeCode <br> j) customerPackageReferenceType: packageReferenceTypeCode <br> k) invoiceReferenceType: invoiceReferenceTypeCode <br> l) invoiceItemReferenceType: itemReferenceTypeCode <br> m) registrationNumberTypeCode: registrationTypeCode <br> n) commodityCategory: commodityCategoryCode, commodityCategoryGroup, commodityCategoryDescription <br> o) returnStatusMessage: statusCode, serviceName, operationName, protocol <br> p) trackingEventCode: eventTypeCode, eventTypeDescription, visibleToCustomer <br> q) unitOfMeasurement: unitOfMeasurement <br> r) languageCode: languageCode, serviceName, categoryGroup, description <br> s) outputImageTemplate: serviceName, categoryGroup,description,multilingualSupport,templateName, imageFormat */
  filterByAttribute?: string;
  /** Use comparison operator to define the specific match condition for optimized search. */
  comparisonOperator?: "equal" | "notEqual" | "contains";
  /** Use queryString for additional filter criteria in format of '[attribute]:[value]:[comparisonOperator]'. <br> All additional filters are applied together with logical connector 'AND'. <br> Maximum of three additional attribute-value-comparisonOperator combinations. <br> Multiple queryString parameters will be separated  by comma "," separator */
  queryString?: string;
  /** Please provide message reference
 */
  Message-Reference?: string;
  /** Optional reference date in the  HTTP-date format https://tools.ietf.org/html/rfc7231#section-7.1.1.2 */
  Message-Reference-Date?: string;
  /** Please provide name of the plugin (applicable to 3PV only)
 */
  Plugin-Name?: string;
  /** Please provide version of the plugin (applicable to 3PV only)
 */
  Plugin-Version?: string;
  /** Please provide name of the shipping platform(applicable to 3PV only)
 */
  Shipping-System-Platform-Name?: string;
  /** Please provide version of the shipping platform (applicable to 3PV only)
 */
  Shipping-System-Platform-Version?: string;
  /** Please provide name of the webstore platform (applicable to 3PV only)
 */
  Webstore-Platform-Name?: string;
  /** Please provide version of the webstore platform (applicable to 3PV only)
 */
  Webstore-Platform-Version?: string;
  /** Interface version - do not change this field value
 */
  x-version: string;
```

**Responses:**

| Status | Type |
|--------|------|
| `200` | `supermodelIoLogisticsExpressReferenceDataResponse` |
| `400` | `supermodelIoLogisticsExpressErrorResponse` |
| `404` | `supermodelIoLogisticsExpressErrorResponse` |
| `403` | `supermodelIoLogisticsExpressErrorResponse` |
| `500` | `supermodelIoLogisticsExpressErrorResponse` |

### Invoice

#### `POST /invoices/upload-invoice-data`

**Upload Commercial invoice data**  

`operationId: exp-api-shipments-invoice-data`


**Query Parameters:**

```typescript
  /** Please provide message reference
 */
  Message-Reference?: string;
  /** Optional reference date in the  HTTP-date format https://tools.ietf.org/html/rfc7231#section-7.1.1.2 */
  Message-Reference-Date?: string;
  /** Please provide name of the plugin (applicable to 3PV only)
 */
  Plugin-Name?: string;
  /** Please provide version of the plugin (applicable to 3PV only)
 */
  Plugin-Version?: string;
  /** Please provide name of the shipping platform(applicable to 3PV only)
 */
  Shipping-System-Platform-Name?: string;
  /** Please provide version of the shipping platform (applicable to 3PV only)
 */
  Shipping-System-Platform-Version?: string;
  /** Please provide name of the webstore platform (applicable to 3PV only)
 */
  Webstore-Platform-Name?: string;
  /** Please provide version of the webstore platform (applicable to 3PV only)
 */
  Webstore-Platform-Version?: string;
  /** Interface version - do not change this field value
 */
  x-version: string;
```

**Request Body:** `supermodelIoLogisticsExpressUploadInvoiceDataRequestSID`

**Responses:**

| Status | Type |
|--------|------|
| `200` | `supermodelIoLogisticsExpressUploadInvoiceDataResponse` |
| `400` | `supermodelIoLogisticsExpressErrorResponse` |
| `500` | `supermodelIoLogisticsExpressErrorResponse` |

---

## Core Types

```typescript
/** Account definition */
export interface supermodelIoLogisticsExpressAccount {
  /** Please enter DHL Express acount type | @example shipper */
  typeCode: "shipper" | "payer" | "duties-taxes";
  /** Please enter DHL Express account number | @example 123456789 */
  number: string;
}

/** Address definition */
export interface supermodelIoLogisticsExpressAddress {
  /** Please enter your postcode or leave empty if the address doesn't have a postcode | @example 14800 */
  postalCode: string;
  /** Please enter the city | @example Prague */
  cityName: string;
  /** Please enter ISO country code | @example CZ */
  countryCode: string;
  /** Please enter your province or state code | @example CZ */
  provinceCode?: string;
  /** Please enter address line 1 | @example V Parku 2308/10 */
  addressLine1: string;
  /** Please enter address line 2 | @example addres2 */
  addressLine2?: string;
  /** Please enter address line 3 | @example addres3 */
  addressLine3?: string;
  /** Please enter your suburb or county name | @example Central Bohemia */
  countyName?: string;
}

/** Address definition for /shipments request */
export interface supermodelIoLogisticsExpressAddressCreateShipmentRequest {
  /** Please enter your postcode or leave empty if the address doesn't have a postcode | @example 14800 */
  postalCode: string;
  /** Please enter the city | @example Prague */
  cityName: string;
  /** Please enter ISO country code | @example CZ */
  countryCode: string;
  /** Please enter your province or state code | @example CZ */
  provinceCode?: string;
  /** Please enter address line 1 | @example V Parku 2308/10 */
  addressLine1: string;
  /** Please enter address line 2 | @example addres2 */
  addressLine2?: string;
  /** Please enter address line 3 | @example addres3 */
  addressLine3?: string;
  /** Please enter your suburb or county name | @example Central Bohemia */
  countyName?: string;
  /** Please enter your state or province name | @example Central Bohemia */
  provinceName?: string;
  /** Please enter your country name | @example Czech Republic */
  countryName?: string;
}

/** Address definition for /shipments response */
export interface supermodelIoLogisticsExpressAddressCreateShipmentResponse {
  /** Postal code | @example 27801 */
  postalCode: string;
  /** City name | @example Kralupy nad Vltavou */
  cityName: string;
  /** Country code | @example CZ */
  countryCode: string;
  /** Province or state code | @example CZ */
  provinceCode?: string;
  /** Address line 1 | @example Na Cukrovaru 1063 */
  addressLine1: string;
  /** Address line 2 | @example addres 2 */
  addressLine2?: string;
  /** Address line 3 | @example address 3 */
  addressLine3?: string;
  /** Suburb or county name | @example Kralupy */
  cityDistrictName?: string;
  /** Please enter your state or province name | @example Central Bohemia */
  provinceName?: string;
  /** Please enter your country name | @example Czech Republic */
  countryName?: string;
}

/** Address definition for /rates, /products, /landed-cost */
export interface supermodelIoLogisticsExpressAddressRatesRequest {
  /** Please enter your postcode or leave empty if the address doesn't have a postcode | @example 14800 */
  postalCode: string;
  /** Please enter the city | @example Prague */
  cityName: string;
  /** Please enter ISO country code | @example CZ */
  countryCode: string;
  /** Please enter your province or state code | @example CZ */
  provinceCode?: string;
  /** Please enter address line 1 | @example addres1 */
  addressLine1?: string;
  /** Please enter address line 3 | @example addres2 */
  addressLine2?: string;
  /** Please enter address line 3 | @example addres3 */
  addressLine3?: string;
  /** Please enter your suburb or county name | @example Central Bohemia */
  countyName?: string;
}

/** Contact definition */
export interface supermodelIoLogisticsExpressContact {
  /** Please enter email address | @example that@before.de */
  email?: string;
  /** Please enter phone number | @example +1123456789 */
  phone: string;
  /** Please enter mobile phone number | @example +60112345678 */
  mobilePhone?: string;
  /** Please enter company name | @example Company Name */
  companyName: string;
  /** Please enter full name | @example John Brew */
  fullName: string;
}

/** Contact definition (Buyer) */
export interface supermodelIoLogisticsExpressContactBuyer {
  /** Please enter email address | @example buyer@domain.com */
  email?: string;
  /** Please enter phone number | @example +44123456789 */
  phone: string;
  /** Please enter mobile phone number | @example +42123456789 */
  mobilePhone?: string;
  /** Please enter company name | @example Customer Company Name */
  companyName: string;
  /** Please enter full name | @example Mark Companer */
  fullName: string;
}

/** Contact definition of /shipments response */
export interface supermodelIoLogisticsExpressContactCreateShipmentResponse {
  /** Company name | @example Better One s.r.o */
  companyName: string;
  /** Full name | @example Huahom Peral */
  fullName: string;
}

/** Bank Details definition */
export interface supermodelIoLogisticsExpressBankDetails {
}

/** Reference definition */
export interface supermodelIoLogisticsExpressReference {
  /** Please provide reference | @example Customer reference */
  value: string;
  /** Please provide reference type<BR>      <BR>      AAO, shipment reference number of receiver<BR>      CU, reference number of consignor - default<BR>      FF, reference number of freight forwarder<BR>      FN, freight bill number for <ex works invoice number><BR>      IBC, inbound center reference number<BR>      LLR, load list reference for <10-digit Shipment ID><BR>      OBC, outbound center reference number for <SHIPMEN IDENTIFIER (COUNTRY OF ORIGIN)><BR>      PRN, pickup request number for <BOOKINGREFERENCE NUMBER><BR>      ACP, local payer account number<BR>      ACS, local shipper account number<BR>      ACR, local receiver account number<BR>      CDN, customs declaration number<BR>      STD, eurolog 15-digit shipment id<BR>      CO, buyers order number<BR>AFM, Import Pre-Clearance Reference Number | @example CU */
  typeCode?: "AAO"
    | "CU"
    | "FF"
    | "FN"
    | "IBC"
    | "LLR"
    | "OBC"
    | "PRN"
    | "ACP"
    | "ACS"
    | "ACR"
    | "CDN"
    | "STD"
    | "CO"
    | "AFM";
}

/** RegistrationNumbers definition */
export interface supermodelIoLogisticsExpressRegistrationNumbers {
  /** VAT: Value-Added tax<BR>      EIN: Employer Identification Number<BR>      SSN: Social Security Number<BR>      EOR: European Union Registration and Identification<BR>      DUN: Data Universal Numberin System<BR>      FED: Federal Tax ID<BR>      STA: State Tax ID<BR>      CNP: Brazil CNPJ/CPF Federal Tax<BR>      IE: Brazil type IE/RG Federal Tax<BR>      INN: Russia bank details section INN<BR>      KPP: Russia bank details section KPP<BR>      OGR: Russia bank details section OGRN<BR>      OKP: Russia bank details section OKPO<BR>      SDT: Overseas Registered Supplier or Import One-Stop-Shop or GB VAT (foreign) registration or AUSid GST Registration or VAT on E-Commerce<BR>      FTZ: Free Trade Zone ID<BR>      DAN: Deferment Account Duties Only<BR>      TAN: Deferment Account Tax Only<BR>      DTF: Deferment Account Duties, Taxes and Fees Only<BR>      RGP: EU Registered Exporters registration ID<BR>       NID: National Identity Card<BR> PAS: Passport<BR> IMS: UK Internal Market Scheme<BR> Note: 'IMS' code will be available in Production by the end of March 2025.<BR> EIC: eInvoice Carrier <BR> FTN: Foreign Tax Identification Number <BR> CIC: Customs Identification Number <BR> PEP: Peppol ID <BR> FII: Foreign Importer Identifier | @example VAT */
  typeCode: "VAT"
    | "EIN"
    | "SSN"
    | "EOR"
    | "DUN"
    | "FED"
    | "STA"
    | "CNP"
    | "IE"
    | "INN"
    | "KPP"
    | "OGR"
    | "OKP"
    | "MRN"
    | "SDT"
    | "FTZ"
    | "DAN"
    | "TAN"
    | "DTF"
    | "RGP"
    | "NID"
    | "PAS"
    | "IMS"
    | "EIC"
    | "FTN"
    | "CIC"
    | "PEP"
    | "FII";
  /** Please enter registration number | @example CZ123456789 */
  number: string;
  /** Please enter 2 character code of the country where the Registration Number has been issued by | @example CZ */
  issuerCountryCode: string;
}

/** Value Added Services definition for /shipments */
export interface supermodelIoLogisticsExpressValueAddedServices {
  /** Please enter DHL Express value added service code. For detailed list of all available service codes for your prospect shipment please invoke GET /products or GET /rates | @example II */
  serviceCode: string;
  /** Please enter monetary value of service (e.g. Insured Value) | @example 100 */
  value?: number;
  /** Please enter currency code (e.g. Insured Value currency code) | @example GBP */
  currency?: string;
  /** Payment method code (e.g. Cash) | @example cash */
  method?: string;
  /** The DangerousGoods section indicates if there is dangerous good content within the shipment. <BR> The ContentID node contains the Content ID for Dangerous Good classification. <BR> It is required to provide the dangerous good Content ID for every dangerous good special service provided, and vice versa. <BR> For the complete list of dangerous goods Content IDs and dangerous goods special services combinations, refer to Reference Data Guide section 5. valueAddedServicesDefinition\\dangerousGoods. <BR> Note: Please contact your DHL Express IT representative if additional assistance is required.<BR><BR> For dangerous goods shipment with Dry Ice example: UN1845 (Content ID: 901), additional node must be populated 'dryIceTotalNetWeight.'<BR> For dangerous goods shipment with 'Excepted Quantities', additional node may be populated 'unCodes'. Few scenarios guideline to prepare a Dangerous Goods shipment for:<BR><BR> A) Dry Ice: <BR> 1.'serviceCode' element must contain value of 'HC'<BR> 2.'contentID' element consists of '901'<BR> 3.'dryIceTotalNetWeight' element consists of the total net weight of the dry ice in 'unitofMeasurement' <BR><BR> B) Lithium Battery: <BR> 1.'serviceType' element must contain value of 'HD', 'HM', 'HV' or 'HW'<BR> 2.'contentID' element consists of '966', '969', '967', '970' respectively<BR><BR> C) Excepted Quantities:<BR> 1.'serviceCode' element must contain value of 'HH'<BR> 2.'contentID' element consists of 'E01<BR> 3. optional field: 'unCodes' element consists of the UN code associate with it.<BR> */
  dangerousGoods?: Record<string, unknown> | Record<string, unknown>[];
}

/** Value Added Services definition for /rates, /products, /landed-cost */
export interface supermodelIoLogisticsExpressValueAddedServicesRates {
  /** Please enter DHL Express value added global service code. For detailed list of all available service codes for your prospect shipment please invoke /products or /rates | @example II */
  serviceCode: string;
  /** Please enter DHL Express value added local service code. For detailed list of all available service codes for your prospect shipment please invoke /products or /rates | @example II */
  localServiceCode?: string;
  /** Please enter monetary value of service (e.g. Insured Value) | @example 100 */
  value?: number;
  /** Please enter currency code (e.g. Insured Value currency code) | @example GBP */
  currency?: string;
  /** For future use | @example cash */
  method?: "cash";
}

/** Identifier definition */
export interface supermodelIoLogisticsExpressIdentifier {
  /** Please provide type of the identifier you want to set value for | @example shipmentId */
  typeCode: "parentId" | "shipmentId" | "pieceId";
  /** Please enter value of your identifier (WB number, PieceID) | @example 1234567890 */
  value: string;
  /** Please enter value of Piece Data Identifier. Note: Piece identification data should be same for all the pieces provided in single shipment. | @example 00 */
  dataIdentifier?: string;
}

/** Package definition for /shipments */
export interface supermodelIoLogisticsExpressPackage {
  /** Please contact your DHL Express representative if you wish to use a DHL specific package otherwise ignore this element.<br> 1CE: Card Envelope (imperial UoM), <br> 2BC: Box 2 (Cube),  <br> 2BP: Box 2 (Pizza),  <br> 2BX: Box 2 (Shoe),  <br> 3BX: Box 3,  <br> 4BX: Box 4,  <br> 5BX: Box 5 (Jumbo Small),  <br> 6BX: Box 6,  <br> 7BX: Box 7,  <br> 8BX: Box 8 (Jumbo Large),  <br> CE1: Card Envelope,  <br> TBL: Tube Large,  <br> TBS: Tube Small,  <br> WB1: Box 2 (1 Bottle),  <br> WB2: Box 3 (2 Bottles),  <br> WB3: Box 4 (3 Bottles),  <br> WB6: Box 5 (6 Bottles),  <br> XPD: Express Envelope | @example 2BP */
  typeCode?: "1CE"
    | "2BC"
    | "2BP"
    | "2BX"
    | "3BX"
    | "4BX"
    | "5BX"
    | "6BX"
    | "7BX"
    | "8BX"
    | "CE1"
    | "TBL"
    | "TBS"
    | "WB1"
    | "WB2"
    | "WB3"
    | "WB6"
    | "XPD";
  /** The weight of the package. | @example 22.501 */
  weight: number;
  /** Dimensions of the package */
  dimensions?: Record<string, unknown>;
  /** Here you can declare your customer references for each package */
  customerReferences?: supermodelIoLogisticsExpressPackageReference[];
  /** Identifiers section is on the package level where you can optionaly provide a DHL Express waybill number. This has to be enabled by your DHL Express IT contact. */
  identifiers?: supermodelIoLogisticsExpressIdentifier[];
  /** Please enter description of content for each package | @example Piece content description */
  description?: string;
  /** This allows you to define up to two bespoke barcodes on the DHL Express Tranport label. To use this feature please set outputImageProperties/imageOptions/templateName as ECOM26_84CI_003 for typeCode=label */
  labelBarcodes?: Record<string, unknown>[];
  /** This allows you to enter up to two bespoke texts on the DHL Express Tranport label. To use this feature please set outputImageProperties/imageOptions/templateName as ECOM26_84CI_003 for typeCode=label */
  labelText?: Record<string, unknown>[];
  /** Please enter additional customer description | @example bespoke label description */
  labelDescription?: string;
  /** Please enter package reference number. If package reference number is provided for at least one package, then package reference number must be provided for all packages. | @example 1 */
  referenceNumber?: number;
}

/** Package definition for /rates, /products, /landed-cost */
export interface supermodelIoLogisticsExpressPackageRR {
  /** Please contact your DHL Express representative if you wish to use a DHL specific package otherwise ignore this element.<br> 1CE: Card Envelope (imperial UoM), <br> 2BC: Box 2 (Cube),  <br> 2BP: Box 2 (Pizza),  <br> 2BX: Box 2 (Shoe),  <br> 3BX: Box 3,  <br> 4BX: Box 4,  <br> 5BX: Box 5 (Jumbo Small),  <br> 6BX: Box 6,  <br> 7BX: Box 7,  <br> 8BX: Box 8 (Jumbo Large),  <br> CE1: Card Envelope,  <br> TBL: Tube Large,  <br> TBS: Tube Small,  <br> WB1: Box 2 (1 Bottle),  <br> WB2: Box 3 (2 Bottles),  <br> WB3: Box 4 (3 Bottles),  <br> WB6: Box 5 (6 Bottles),  <br> XPD: Express Envelope | @example 3BX */
  typeCode?: "1CE"
    | "2BC"
    | "2BP"
    | "2BX"
    | "3BX"
    | "4BX"
    | "5BX"
    | "6BX"
    | "7BX"
    | "8BX"
    | "CE1"
    | "TBL"
    | "TBS"
    | "WB1"
    | "WB2"
    | "WB3"
    | "WB6"
    | "XPD";
  /** The weight of the package. | @example 10.5 */
  weight: number;
  /** Dimensions of the package */
  dimensions?: Record<string, unknown>;
}

/** Package definition for /add-piece */
export interface supermodelIoLogisticsExpressPackageAddPiece {
  /** Please contact your DHL Express representative if you wish to use a DHL specific package otherwise ignore this element.<br> 1CE: Card Envelope (imperial UoM), <br> 2BC: Box 2 (Cube),  <br> 2BP: Box 2 (Pizza),  <br> 2BX: Box 2 (Shoe),  <br> 3BX: Box 3,  <br> 4BX: Box 4,  <br> 5BX: Box 5 (Jumbo Small),  <br> 6BX: Box 6,  <br> 7BX: Box 7,  <br> 8BX: Box 8 (Jumbo Large),  <br> CE1: Card Envelope,  <br> TBL: Tube Large,  <br> TBS: Tube Small,  <br> WB1: Box 2 (1 Bottle),  <br> WB2: Box 3 (2 Bottles),  <br> WB3: Box 4 (3 Bottles),  <br> WB6: Box 5 (6 Bottles),  <br> XPD: Express Envelope | @example 2BP */
  typeCode?: "1CE"
    | "2BC"
    | "2BP"
    | "2BX"
    | "3BX"
    | "4BX"
    | "5BX"
    | "6BX"
    | "7BX"
    | "8BX"
    | "CE1"
    | "TBL"
    | "TBS"
    | "WB1"
    | "WB2"
    | "WB3"
    | "WB6"
    | "XPD";
  /** The weight of the package. | @example 22.501 */
  weight: number;
  /** Dimensions of the package */
  dimensions?: Record<string, unknown>;
  /** Here you can declare your customer references for each package */
  customerReferences?: supermodelIoLogisticsExpressPackageReference[];
  /** Identifiers section is on the package level where you can optionaly provide a DHL Express waybill number. This has to be enabled by your DHL Express IT contact. */
  identifiers?: supermodelIoLogisticsExpressIdentifier[];
  /** Please enter description of content for each package | @example Piece content description */
  description?: string;
  /** This allows you to define up to two bespoke barcodes on the DHL Express Tranport label. To use this feature please set outputImageProperties/imageOptions/templateName as ECOM26_84CI_003 for typeCode=label */
  labelBarcodes?: Record<string, unknown>[];
  /** This allows you to enter up to two bespoke texts on the DHL Express Tranport label. To use this feature please set outputImageProperties/imageOptions/templateName as ECOM26_84CI_003 for typeCode=label */
  labelText?: Record<string, unknown>[];
  /** Please enter additional customer description | @example bespoke label description */
  labelDescription?: string;
  /** Please enter package reference number. If package reference number is provided for at least one package, then package reference number must be provided for all packages. | @example 1 */
  referenceNumber?: number;
  /** Set to true if this is the last package added for the shipment. Default if not provided is false. | @example False */
  isThisTheLastPackageAdded?: boolean;
}

/** Package Reference definition */
export interface supermodelIoLogisticsExpressPackageReference {
  /** Please provide reference | @example Customer reference */
  value: string;
  /** Please provide reference type<BR>      <BR>      AAO, shipment reference number of receiver<BR>      CU, reference number of consignor - default<BR>      FF, reference number of freight forwarder<BR>      FN, freight bill number for <ex works invoice number><BR>      IBC, inbound center reference number<BR>      LLR, load list reference for <10-digit Shipment ID><BR>      OBC, outbound center reference number for <SHIPMEN IDENTIFIER (COUNTRY OF ORIGIN)><BR>      PRN, pickup request number for <BOOKINGREFERENCE NUMBER><BR>      ACP, local payer account number<BR>      ACS, local shipper account number<BR>      ACR, local receiver account number<BR>      CDN, customs declaration number<BR>      STD, eurolog 15-digit shipment id<BR>      CO, buyers order number | @example CU */
  typeCode?: "AAO"
    | "CU"
    | "FF"
    | "FN"
    | "IBC"
    | "LLR"
    | "OBC"
    | "PRN"
    | "ACP"
    | "ACS"
    | "ACR"
    | "CDN"
    | "STD"
    | "CO";
}

```

---

## Rating & Products

```typescript
/** Definition of /rates request message */
export interface supermodelIoLogisticsExpressRateRequest {
  customerDetails: Record<string, unknown>;
  /** Please enter all the DHL Express accounts and types to be used for this shipment */
  accounts?: supermodelIoLogisticsExpressAccount[];
  /** Please enter DHL Express Global Product code | @example P */
  productCode?: string;
  /** Please enter DHL Express Local Product code | @example P */
  localProductCode?: string;
  /** Please use if you wish to filter the response by value added services */
  valueAddedServices?: supermodelIoLogisticsExpressValueAddedServicesRates[];
  /** Please use if you wish to filter the response by product(s) and/or value added services */
  productsAndServices?: Record<string, unknown>[];
  /** payerCountryCode is to be provided if your profile has been enabled to view rates without an account number (this will provide DHL Express published rates for the payer country) | @example CZ */
  payerCountryCode?: string;
  /** Identifies the date and time the package is tendered. Both the date and time portions of the string are expected to be used. The date should not be a past date or a date more than 10 days in the future. The time is the local time of the shipment based on the shipper's time zone. The date component must be in the format: YYYY-MM-DD; the time component must be in the format: HH:MM:SS using a 24 hour clock. The date and time parts are separated by the letter T (e.g. 2006-06-26T17:00:00 GMT+01:00). | @example 2020-03-24T13:00:00GMT+00:00 */
  plannedShippingDateAndTime: string;
  /** Please enter Unit of measurement - metric,imperial | @example metric */
  unitOfMeasurement: "metric" | "imperial";
  /** For customs purposes please advise if your shipment is dutiable (true) or non dutiable (false) | @example False */
  isCustomsDeclarable: boolean;
  /** Please provide monetary amount related to your shipment, for example shipment declared value */
  monetaryAmount?: Record<string, unknown>[];
  /** Legacy field and replaced by newer field getAdditionalInformation. Please set this to true to receive all value added services for each product available | @example False */
  requestAllValueAddedServices?: boolean;
  /** Estimated delivery date option for QDDF or QDDC. */
  estimatedDeliveryDate?: Record<string, unknown>;
  /** Provides additional information in the response like all value added services, and rule groups */
  getAdditionalInformation?: Record<string, unknown>[];
  /** Please set this to true to filter out all products which needs DHL Express special customer agreement | @example False */
  returnStandardProductsOnly?: boolean;
  /** Please set this to true in case you want to receive products which are not available on planned shipping date but next available day | @example False */
  nextBusinessDay?: boolean;
  /** Please select which type of priducts you are interested in | @example all */
  productTypeCode?: "all" | "dayDefinite" | "timeDefinite";
  /** Here you can define properties per package */
  packages: supermodelIoLogisticsExpressPackageRR[];
}

/** Definition of /rates, /landed-cost response message */
export interface supermodelIoLogisticsExpressRates {
  products: Record<string, unknown>[];
  exchangeRates?: Record<string, unknown>[];
  warnings?: string[];
}

/** Definition of /products response message */
export interface supermodelIoLogisticsExpressProducts {
  products: Record<string, unknown>[];
  warnings?: string[];
}

/** Definition of /address-validate response message */
export interface supermodelIoLogisticsExpressAddressValidateResponse {
  warnings?: string[];
  address?: Record<string, unknown>[];
}

/** Definition of /landed-cost request message */
export interface supermodelIoLogisticsExpressLandedCostRequest {
  /** Here you need to define all the parties needed to ship the package */
  customerDetails: Record<string, unknown>;
  /** Please enter all the DHL Express accounts and types to be used for this shipment */
  accounts: supermodelIoLogisticsExpressAccount[];
  /** Please enter DHL Express Global Product code | @example P */
  productCode?: string;
  /** Please enter DHL Express Local Product code | @example P */
  localProductCode?: string;
  /** Please enter Unit of measurement - metric,imperial | @example metric */
  unitOfMeasurement: "metric" | "imperial";
  /** Currency code for the item price (the product being sold) and freight charge. The Landed Cost calculation result will be returned in this defined currency | @example CZK */
  currencyCode: string;
  /** Set this to true is shipment contains declarable content | @example True */
  isCustomsDeclarable: boolean;
  /** Set this to true if you want DHL EXpress product Duties and Taxes Paid outside shipment destination | @example True */
  isDTPRequested?: boolean;
  /** Set this true if you ask for DHL Express insurance service | @example False */
  isInsuranceRequested?: boolean;
  /** Allowed values 'true' - item cost breakdown will be returned, 'false' - item cost breakdown will not be returned | @example True */
  getCostBreakdown: boolean;
  /** Please provide any additional charges you would like to include in total cost calculation */
  charges?: Record<string, unknown>[];
  /** Possible values:<BR>      commercial: B2B<BR>      personal: B2C<BR>      commercia': B2B<BR>      personal: B2C | @example personal */
  shipmentPurpose?: "commercial" | "personal";
  /** @example air */
  transportationMode?: "air" | "ocean" | "ground";
  /** Carrier being used to ship with. Allowed values are:<BR>      'DHL','UPS','FEDEX','TNT','POST',<BR>      'OTHERS' | @example DHL */
  merchantSelectedCarrierName?: "DHL" | "UPS" | "FEDEX" | "TNT" | "POST" | "OTHERS";
  /** Here you can define properties per package */
  packages: supermodelIoLogisticsExpressPackageRR[];
  items: Record<string, unknown>[];
  /** Allowed values 'true' - tariff formula on item and shipment level will be returned, 'false' - tariff formula on item and shipment level will not be returned | @example True */
  getTariffFormula?: boolean;
  /** Allowed values 'true' - quotation ID on shipment level will be returned, 'false' - quotation ID on shipment level will not be returned | @example True */
  getQuotationID?: boolean;
}

```

---

## Shipment

```typescript
/** Definition of /shipments request message */
export interface supermodelIoLogisticsExpressCreateShipmentRequest {
  /** Identifies the date and time the package is tendered. Both the date and time portions of the string are expected to be used. The date should not be in the past or more than 10 days in the future. The time represents the local time of the shipment origin coupled with corresponding time zone. The date component must be in the format: YYYY-MM-DD; the time component must be in the format: HH:MM:SS using a 24-hour clock. The date and time parts are separated by the letter T (e.g., 2025-01-18T17:00:00 GMT+01:00). It is not recommended to populate this field with current time, the time the request is sent to DHL Express as it may be evaluated as being in the past the time it is received. | @example 2019-08-04T14:00:31GMT+01:00 */
  plannedShippingDateAndTime: string;
  pickup: Record<string, unknown>;
  /** Please enter DHL Express Global Product code | @example D */
  productCode: string;
  /** Please enter DHL Express Local Product code. Important when shipping domestic products. | @example D */
  localProductCode?: string;
  /** Please advise if you want to get rate estimates for given shipment */
  getRateEstimates?: boolean;
  /** Please enter all the DHL Express accounts and types to be used for this shipment */
  accounts: supermodelIoLogisticsExpressAccount[];
  /** This section communicates additional shipping services, such as Insurance (or Shipment Value Protection). */
  valueAddedServices?: supermodelIoLogisticsExpressValueAddedServices[];
  /** Here you can modify label, waybillDoc, invoice and shipment receipt properties */
  outputImageProperties?: Record<string, unknown>;
  /** Here you can declare your customer references */
  customerReferences?: supermodelIoLogisticsExpressReference[];
  /** Identifiers section is on the shipment level where you can optionaly provide a DHL Express waybill number. This has to be enabled by your DHL Express IT contact. */
  identifiers?: supermodelIoLogisticsExpressIdentifier[];
  /** Here you need to define all the parties needed to ship the package */
  customerDetails: Record<string, unknown>;
  /** Here you can define all the properties related to the content of the prospected shipment */
  content: Record<string, unknown>;
  documentImages?: supermodelIoLogisticsExpressDocumentImages;
  /** Here you can provide data in case you wish to use DHL Express On demand delivery service. Please note, that if using this segment then 'buyerDetails' customer role data also must be populated in the request message. */
  onDemandDelivery?: object;
  /** Determines whether to request the On Demand Delivery (ODD) link. When set to true it will provide an URL link for the specified Waybill Number, Shipper Account Number. The default value is false, no ODD link URL is provided in the response message. | @example False */
  requestOndemandDeliveryURL?: boolean;
  /** This is to support sending email notification once the shipment is created. The email will contain the basic information on the shipper, recipient, waybill number, and shipment information */
  shipmentNotification?: Record<string, unknown>[];
  /** Please provide any charges you have already paid for this shipment, like freight paid upfront. To allow using this section please contact your DHL Express representative */
  prepaidCharges?: Record<string, unknown>[];
  /** If set to true, response will return transliterated text of shipper and receiver details. | @example False */
  getTransliteratedResponse?: boolean;
  /** Estimated delivery date option for QDDF or QDDC. */
  estimatedDeliveryDate?: Record<string, unknown>;
  /** Provides additional information in the response like service area details, routing code and pickup-related information */
  getAdditionalInformation?: Record<string, unknown>[];
  /** Please provide the parent (mother) shipment details */
  parentShipment?: Record<string, unknown>;
}

/** Definition of /shipments response message */
export interface supermodelIoLogisticsExpressCreateShipmentResponse {
  /** URL where the request has been sent to | @example https://express.api.dhl.com/mydhlapi/shipments */
  url?: string;
  /** Here you will receive Shipment Identification Number of your package | @example 123456790 */
  shipmentTrackingNumber?: string;
  /** If you requested pickup for your shipment you can use this URL to cancel the pickup | @example https://express.api.dhl.com/mydhlapi/shipment-pickups/PRG200227000256 */
  cancelPickupUrl?: string;
  /** You can use ths URL to track your shipment | @example https://express.api.dhl.com/mydhlapi/shipments/1234567890/tracking */
  trackingUrl?: string;
  /** If you asked for pickup service here you will find Dispach Confirmation Number which identifies your pickup booking | @example PRG200227000256 */
  dispatchConfirmationNumber?: string;
  /** Here you can find information for all pieces your shipment is having like Piece Identification Number */
  packages?: Record<string, unknown>[];
  /** Here you can find all documents created for the shipment like Transport and WaybillDoc labels, Invoice, Profoma or Receipt */
  documents?: Record<string, unknown>[];
  /** In this field you will find the On Demand Delivery (ODD) URL link if requested | @example https://odd-test.dhl.com/odd-online/US/wH24aaaaa1 */
  onDemandDeliveryURL?: string;
  /** Here you can find additional information related to your shipment when you ask for it in the request */
  shipmentDetails?: Record<string, unknown>[];
  /** Here you can find rates related to your shipment */
  shipmentCharges?: Record<string, unknown>[];
  /** Here you can find barcode details in base64 */
  barcodeInfo?: Record<string, unknown>;
  /** Here you can find details of estimated delivery date */
  estimatedDeliveryDate?: Record<string, unknown>;
  warnings?: string[];
}

/** Export Declaration definition details */
export interface supermodelIoLogisticsExpressExportDeclaration {
  /** Please enter details for each export line item */
  lineItems: Record<string, unknown>[];
  /** Please provide invoice related information */
  invoice: Record<string, unknown>;
  /** Please enter up to three remarks */
  remarks?: Record<string, unknown>[];
  /** Please enter additional charge to appear on the invoice<BR>      admin, Administration Charge<BR>      delivery, Delivery Charge<BR>      documentation, Documentation Charge<BR>      expedite, Expedite Charge<BR>      freight, Freight Charge<BR>      fuel surcharge, Fuel Surcharge<BR>      logistic, Logistic Charge<BR>      other, Other Charge<BR>      packaging, Packaging Charge<BR>      pickup, Pickup Charge<BR>      handling, Handling Charge<BR>      vat, VAT Charge<BR>      insurance, Insurance Cost */
  additionalCharges?: Record<string, unknown>[];
  /** Name of port of departure, shipment or destination as required under the applicable delivery term. | @example port of departure or destination details */
  placeOfIncoterm?: string;
  /** Please enter recipient reference | @example recipient reference */
  recipientReference?: string;
  /** Exporter related details */
  exporter?: Record<string, unknown>;
  /** Please provide the reason for export | @example permanent */
  exportReasonType?: "permanent"
    | "temporary"
    | "return"
    | "used_exhibition_goods_to_origin"
    | "intercompany_use"
    | "commercial_purpose_or_sale"
    | "personal_belongings_or_personal_use"
    | "sample"
    | "gift"
    | "return_to_origin"
    | "warranty_replacement"
    | "diplomatic_goods"
    | "defence_material";
  /** Please provide the shipment was sent for Personal (Gift) or Commercial (Sale) reasons | @example personal */
  shipmentType?: "personal" | "commercial";
  /** Please provide the Customs Documents at invoice level */
  customsDocuments?: Record<string, unknown>[];
  /** The Incoterms rules are a globally-recognized set of standards, used worldwide in international and domestic contracts for the delivery of goods, illustrating responsibilities between buyer and seller for costs and risk, as well as cargo insurance.<BR>      EXW ExWorks<BR>      FCA Free Carrier<BR>      CPT Carriage Paid To<BR>      CIP Carriage and Insurance Paid To<BR>      DPU Delivered at Place Unloaded<BR>      DAP Delivered at Place<BR>      DDP Delivered Duty Paid<BR>      FAS Free Alongside Ship<BR>      FOB Free on Board<BR>      CFR Cost and Freight<BR>      CIF Cost, Insurance and Freight<BR>      DAF Delivered at Frontier<BR>      DAT Delivered at Terminal<BR>      DDU Delivered Duty Unpaid<BR>      DEQ Delivery ex Quay<BR>      DES Delivered ex Ship | @example DAP */
  incoterm: "EXW"
    | "FCA"
    | "CPT"
    | "CIP"
    | "DPU"
    | "DAP"
    | "DDP"
    | "FAS"
    | "FOB"
    | "CFR"
    | "CIF"
    | "DAF"
    | "DAT"
    | "DDU"
    | "DEQ"
    | "DES";
}

/** Definition of image upload request response message */
export interface supermodelIoLogisticsExpressImageUploadRequest {
  /** @example 2020-04-20 */
  originalPlannedShippingDate: string;
  /** Please enter all the DHL Express accounts and types to be used for this shipment */
  accounts: supermodelIoLogisticsExpressAccount[];
  /** Please enter DHL Express Global Product code | @example D */
  productCode: string;
  documentImages: supermodelIoLogisticsExpressDocumentImages;
}

/** Definition of Upload Invoice Data request message */
export interface supermodelIoLogisticsExpressUploadInvoiceDataRequest {
  /** The planned shipment date for the provided shipmentTrackingNumber.  The date must be in the format: YYYY-MM-DD | @example 2020-04-20 */
  plannedShipDate?: string;
  /** Please enter all the DHL Express accounts and types to be used for this shipment.  
Note: accounts/0/number with typeCode 'shipper' is mandatory if using POST method and no shipmentTrackingNumber is provided in request. */
  accounts?: supermodelIoLogisticsExpressAccount[];
  /** Here you can define all the properties related to the content of the prospected shipment */
  content: Record<string, unknown>;
  /** Here you can set invoice properties */
  outputImageProperties?: Record<string, unknown>;
  /** Here you need to define all the parties needed to ship the package */
  customerDetails?: Record<string, unknown>;
}

/** Definition of Upload Invoice Data request message with SID */
export interface supermodelIoLogisticsExpressUploadInvoiceDataRequestSID {
  /** Please provide Shipment Identification number (AWB number) | @example 123456790 */
  shipmentTrackingNumber?: string;
  /** The planned shipment date for the provided shipmentTrackingNumber.  The date must be in the format: YYYY-MM-DD | @example 2020-04-20 */
  plannedShipDate?: string;
  /** Please enter all the DHL Express accounts and types to be used for this shipment.  
Note: accounts/0/number with typeCode 'shipper' is mandatory if using POST method and no shipmentTrackingNumber is provided in request. */
  accounts?: supermodelIoLogisticsExpressAccount[];
  /** Here you can define all the properties related to the content of the prospected shipment */
  content: Record<string, unknown>;
  /** Here you can set invoice properties */
  outputImageProperties?: Record<string, unknown>;
  /** Here you need to define all the parties needed to ship the package */
  customerDetails?: Record<string, unknown>;
}

/** Upload Invoice Data Response details */
export interface supermodelIoLogisticsExpressUploadInvoiceDataResponse {
  warnings?: string[];
  /** Status description | @example OK */
  status?: string;
}

/** Get Image Response definition */
export interface supermodelIoLogisticsExpressDocumentImageResponse {
  /** Here you can find all document images from search query */
  documents?: Record<string, unknown>[];
}

/** Get Image request definition */
export interface supermodelIoLogisticsExpressDocumentImages {
}

/** Definition of add piece(s) request schema */
export interface supermodelIoLogisticsExpressAddPieceRequest {
  /** Identifies the date the package is tendered. | @example 2020-04-20 */
  originalPlannedShippingDate: string;
  /** Please enter DHL Express Global Product code | @example D */
  productCode: string;
  /** Please enter all the DHL Express accounts and types to be used for this shipment */
  accounts: supermodelIoLogisticsExpressAccount[];
  /** Here you can modify label, waybillDoc properties */
  outputImageProperties?: Record<string, unknown>;
  /** Here you can define all the properties related to the content particularly the additional piece details */
  content: Record<string, unknown>;
  /** Please advise if you want to get rate estimates for given shipment */
  getRateEstimates?: boolean;
}

/** MyDHL API Early shipment screening API request message */
export interface supermodelIoLogisticsExpressEarlyShipmentScreeningRequest {
  /** Identifies the date and time the package is tendered. Both the date and time portions of the string are expected to be used. The date should not be a past date or a date more than 10 days in the future. The time is the local time of the shipment based on the shipper's time zone. The date component must be in the format: YYYY-MM-DD; the time component must be in the format: HH:MM:SS using a 24 hour clock. The date and time parts are separated by the letter T (e.g. 2006-06-26T17:00:00 GMT+01:00). | @example 2023-08-04T14:00:31GMT+01:00 */
  plannedShippingDateAndTime: string;
  /** Please enter DHL Express Global Product code | @example B */
  productCode: string;
  /** Here you need to define all the parties needed to ship the package */
  customerDetails: Record<string, unknown>;
  /** Please enter all the DHL Express accounts and types to be used for this shipment. At least one 'payer' account number must be provided in request message. */
  accounts: supermodelIoLogisticsExpressAccount[];
  /** Here you can declare your customer references. <br />At least one 'shipmentId' identifier OR 'CU' shipment reference must be provided in request message. */
  customerReferences?: supermodelIoLogisticsExpressReferenceEarlyShipmentScreening[];
  /** Identifiers section is on the shipment level where you can optionally provide a DHL Express waybill number. <br />At least one 'shipmentId' identifier OR 'CU' shipment reference must be provided in request message. */
  identifiers?: supermodelIoLogisticsExpressIdentifierEarlyShipmentScreening[];
}

/** Early Shipment Screening Response details */
export interface supermodelIoLogisticsExpressEarlyShipmentScreeningResponse {
  warnings?: string[];
  /** Status description | @example OK */
  status?: string;
}

/** Reference definition /early-shipment-screening */
export interface supermodelIoLogisticsExpressReferenceEarlyShipmentScreening {
  /** Please provide reference | @example Customer reference */
  value: string;
  /** Please provide reference type\r\n\r\nCU, reference number of consignor - default" | @example ['CU'] */
  typeCode?: "CU";
}

/** Identifier definition for /early-shipment-screening */
export interface supermodelIoLogisticsExpressIdentifierEarlyShipmentScreening {
  /** Please provide type of the identifier you want to set value for | @example shipmentId */
  typeCode: "shipmentId";
  /** Please enter value of your identifier (Waybill number) | @example 1234567890 */
  value: string;
}

```

---

## Pickup

```typescript
/** Definition of /pickups request message */
export interface supermodelIoLogisticsExpressPickupRequest {
  /** Identifies the date and time the package is ready for pickup Both the date and time portions of the string are expected to be used. The date should not be a past date or a date more than 10 days in the future. The time is the local time of the shipment based on the shipper's time zone. The date component must be in the format: YYYY-MM-DD; the time component must be in the format: HH:MM:SS using a 24 hour clock. The date and time parts are separated by the letter T (e.g. 2006-06-26T17:00:00 GMT+01:00).<BR> | @example 2019-08-04T14:00:31GMT+01:00 */
  plannedPickupDateAndTime: string;
  /** The latest time the location premises is available to dispatch the DHL Express shipment. (HH:MM) | @example 18:00 */
  closeTime?: string;
  /** Provides information on where the package should be picked up by DHL courier. <BR> | @example reception */
  location?: string;
  /** Provides information on where the package should be picked up by DHL courier. <BR> | @example residence */
  locationType?: "business" | "residence";
  accounts: supermodelIoLogisticsExpressAccount[];
  /** Details special pickup instructions you may wish to send to the DHL Courier. */
  specialInstructions?: Record<string, unknown>[];
  /** Please provide additional pickup remark */
  remark?: string;
  customerDetails: Record<string, unknown>;
  /** Please provide details related to shipment you want to do the pickup for */
  shipmentDetails: Record<string, unknown>[];
}

/** Definition of /pickups response message */
export interface supermodelIoLogisticsExpressPickupResponse {
  /** List of Dispatch Confirmation Numbers which identifies the scheduled pickup */
  dispatchConfirmationNumbers?: string[];
  /** @example 12:00 */
  readyByTime?: string;
  /** @example 2020-06-01 */
  nextPickupDate?: string;
  warnings?: string[];
}

/** Definition of /pickups update request message */
export interface supermodelIoLogisticsExpressUpdatePickupRequest {
  /** Please enter Dispatch confirmation number which identifies the already scheduled pickup | @example CBJ201220123456 */
  dispatchConfirmationNumber: string;
  /** Please enter the shipper account number which was used during the scheduled pickup creation | @example 123456789 */
  originalShipperAccountNumber: string;
  /** Identifies the date and time the package is ready for pickup Both the date and time portions of the string are expected to be used. The date should not be a past date or a date more than 10 days in the future. The time is the local time of the shipment based on the shipper's time zone. The date component must be in the format: YYYY-MM-DD; the time component must be in the format: HH:MM:SS using a 24 hour clock. The date and time parts are separated by the letter T (e.g. 2006-06-26T17:00:00 GMT+01:00).<BR> | @example 2019-08-04T14:00:31GMT+01:00 */
  plannedPickupDateAndTime: string;
  /** The latest time the location premises is available to dispatch the DHL Express shipment. (HH:MM) | @example 18:00 */
  closeTime?: string;
  /** Provides information on where the package should be picked up by DHL courier. <BR> | @example reception */
  location?: string;
  /** Provides information on where the package should be picked up by DHL courier. <BR> | @example residence */
  locationType?: "business" | "residence";
  accounts: supermodelIoLogisticsExpressAccount[];
  /** Details special pickup instructions you may wish to send to the DHL Courier. */
  specialInstructions?: Record<string, unknown>[];
  /** Please provide additional pickup remark */
  remark?: string;
  customerDetails: Record<string, unknown>;
  /** Please provide updated details related to shipment you want update the pickup for */
  shipmentDetails?: Record<string, unknown>[];
}

/** Definition of /pickups update response message */
export interface supermodelIoLogisticsExpressUpdatePickupResponse {
  /** Identifies the pickup you made the changes for | @example PRG201220123456 */
  dispatchConfirmationNumber?: string;
  /** @example 10:00 */
  readyByTime?: string;
  /** @example 2020-06-01 */
  nextPickupDate?: string;
  warnings?: string[];
}

```

---

## Tracking

```typescript
/** Definition of tracking response message */
export interface supermodelIoLogisticsExpressTrackingResponse {
  shipments?: Record<string, unknown>[];
}

/** Definition of electronic proof of delivery response message */
export interface supermodelIoLogisticsExpressEPODResponse {
  documents?: Record<string, unknown>[];
}

```

---

## Identifiers & Reference

```typescript
/** Definition of /identifiers response message */
export interface supermodelIoLogisticsExpressIdentifierResponse {
  warnings?: string[];
  identifiers?: Record<string, unknown>[];
}

/** Definition of Reference Data response message */
export interface supermodelIoLogisticsExpressReferenceDataResponse {
  /** The result of search from provided reference criteria */
  referenceData?: supermodelIoLogisticsExpressReferenceData[];
  warnings?: string[];
}

/** Definition of Reference Data response message object definition */
export interface supermodelIoLogisticsExpressReferenceData {
  /** The reference data dataset name | @example country */
  datasetName: string;
  dataSetCaptions?: string;
  data?: Record<string, unknown>[][];
}

```

---

## Service Points

```typescript
export interface ServicePointsRestResponseV3 {
  status?: RestResponseStatus;
  /** The address used for the search (value of request parameter âaddressâ) | @example Chennai */
  searchAddress?: string;
  searchLocation?: GeoLocation;
  /** The culture parameter for Bing Maps API (derived from the country parameter in the request) */
  mapCulture?: string;
  /** Map Culture Used for Third party Maps */
  mapLanguage?: string;
  /** Array of the found Service Points. Each Service Point entity contains details about the service point. */
  servicePoints?: ServicePoint[];
  translations?: Translations;
  /** Indicates whether lite mode is acitvated or not. */
  liteMode?: False;
  promotion?: Promotion;
}

/** Array of the found Service Points. Each Service Point entity contains details about the service point. */
export interface ServicePoint {
  /** Service Point ID is a unique key with 6 characters, consisting of Service Area for first 3 characters (e.g. BRU) and the last 3 characters is the Facility code (e.g. 001); Service point ID = BRU001.
 If address is used id not possible to use. */
  facilityId?: string;
  /** The facility type code from GREF database */
  facilityTypeCode?: string;
  /** The service pointâs Service Area Code */
  serviceAreaCode?: string;
  /** Name of the service point */
  servicePointName?: string;
  /** Formatted name of the service point */
  servicePointNameFormatted?: string;
  /** The local trading name of the Service Point */
  localName?: string;
  /** The type of the Service Point. CITY, STATION, PARTNER or TWENTYFOURSEVEN. */
  servicePointType?: "CITY" | "STATION" | "PARTNER" | "TWENTYFOURSEVEN";
  address?: Address;
  geoLocation?: GeoLocation;
  /** The distance from the search address to this Service Point (beeline). */
  distance?: string;
  /** Time until which a shipment can be handed in at the Service Point, and is still shipped on the same day */
  shippingCutOffTime?: string;
  openingHours?: OpeningHours;
  servicePointCapabilities?: ServicePointCapabilities;
  contactDetails?: ContactDetails;
  /** Distance of SVP from searched location */
  distanceValue?: string;
  /** Metric of distance */
  distanceMetric?: number;
  language?: Language;
  shipmentLimitations?: ShipmentLimitations;
  shipmentLimitationsByPiece?: ShipmentLimitationsByPiece;
  /** Charge code, e.g. XX */
  chargeCode?: string;
  partner?: Partner;
  promotion?: Promotion;
  capacityStatus?: CapacityStatus;
  /** Status of the service point(Active or Inactive) */
  svpStatus?: string;
  /** Number of day when the work week starts. It starts from 0 to 6(Sunday to Saturday) */
  workWeekStart?: number;
  locatedAt?: string;
  timeZone?: Record<string, unknown>;
  timeZoneInt?: DateTimeZone;
}

/** An entity that lists all capabilities of a Service Point. */
export interface ServicePointCapabilities {
  /** Indicates whether parking facility is available in the service point or not */
  parkingAvailable?: False;
  /** Indicates whether disabled access is available in the service point or not */
  disabledAccess?: False;
  /** Indicates whether Shipment Drop Off is available in the service point or not */
  shipmentDropOff?: False;
  /** Indicates whether Shipment Collection is available in the service point or not */
  shipmentCollection?: False;
  /** Indicates whether International Shipping is available in the service point or not */
  internationalShipping?: False;
  /** Indicates whether Domestic Shipping is available in the service point or not */
  domesticShipping?: False;
  /** Indicates whether Account Shipping is available in the service point or not */
  accountShippers?: False;
  /** Indicates whether Label Printing is available in the service point or not */
  labelPrinting?: False;
  /** Indicates whether Insurance facility is available in the service point or not */
  insurance?: False;
  /** Indicates whether Import Charges is applicable in the service point or not */
  importCharges?: False;
  /** Indicates whether Packaging facility is available in the service point or not */
  packaging?: False;
  /** Indicates whether Receiver Paying option is available in the service point or not */
  receiverPaid?: False;
  /** Indicates whether VISA program is applicable in the service point or not */
  visaProgram?: False;
  /** Indicates whether pay by cash option is available in the service point or not */
  payWithCash?: False;
  /** Indicates whether pay with credit card option is available in the service point or not */
  payWithCreditCard?: False;
  /** Indicates whether pay with cheque option is available in the service point or not */
  payWithCheque?: False;
  /** Indicates whether pay with mobile option is available in the service point or not */
  payWithMobile?: False;
  /** Indicates whether pay with paypal option is available in the service point or not */
  payWithPayPal?: False;
  /** Title for the parking icon */
  parkingTitle?: string;
  /** Title for the disable wheel chair icon */
  disabledAccessTitle?: string;
  /** Piece Weight Limit */
  pieceWeightLimit?: number;
  /** Enumeration (KG or LB) */
  pieceWeightLimitUnit?: string;
  pieceDimensionsLimit?: Dimensions;
  /** Enumeration (CM or IN) */
  pieceDimensionsLimitUnit?: string;
  /** Number (integer) */
  pieceCountLimit?: number;
  /** Account prepaid shippers */
  accountPrepaidShippers?: boolean;
  /** Prepaid shippers */
  prepaidShippers?: boolean;
  /** Pre-printed return label */
  prePrintReturnLabel?: boolean;
  /** Indicates whether this particular service point can handle label free shipments or not */
  labelFree?: boolean;
  /** Indicates whether International and domesting Shipping is available in the service point or not */
  internationalDomesticShipping?: False;
  /** Indicates whether European and Domestic Shipping is available in the service point or not */
  europeanUnionDomesticShipping?: False;
  /** Obsolete. This is planned to be removed in future releases. */
  html?: string;
  /** PPC codes available for this service point */
  capabilityCodes?: string;
  /** Indicates whether the service Pay in Store is available in the service point or not. */
  payInStoreShippers?: boolean;
  /** Indicates whether the service Account and Pay in Store is available in the service point or not. */
  accountPayInStoreShippers?: boolean;
  /** Indicates whether the service Prepaid online and Pay in Store is available in the service point or not. */
  prepaidPayInStoreShippers?: boolean;
  /** Indicates whether the service Account, Prepaid online and Pay in Store is available in the service point or not. */
  accountPrepaidPayInStoreShippers?: boolean;
  /** Indicates whether the service Shipment DropOff and Collection is available in the service point or not. */
  shipmentDropOffAndCollection?: boolean;
  /** Indicates whether the service Account and Prepaid online label free is possible in the service point or not. */
  accountPrepaidLabelFree?: boolean;
  /** Indicates whether the service Account holder label free is possible in the service point or not. */
  accountLabelFree?: boolean;
  /** Indicates whether the service Prepaid online label free is possible in the service point or not. */
  prepaidLabelFree?: boolean;
  /** Indicates whether the service Account holder Pre-Printed or Return label is possible in the service point or not. */
  accountPrePrintReturnLabel?: boolean;
  /** Indicates whether the service Prepaid online Pre-Printed or Return label is possible in the service point or not. */
  prepaidPrePrintReturnLabel?: boolean;
  /** Indicates whether the service Prepaid online label Printing is possible in the service point or not. */
  prepaidLabelPrinting?: boolean;
  /** Indicates whether the service Account holder label Printing is possible in the service point or not. */
  accountLabelPrinting?: boolean;
}

/** Sub-entity holding the facility address */
export interface Address {
  /** First line of the facility address */
  addressLine1?: string;
  /** Second line of the facility address (only present if field is filled in GREF database) */
  addressLine2?: string;
  /** Third line of the facility address (only present if field is filled in GREF database) */
  addressLine3?: string;
  /** Facility city */
  city?: string;
  /** Zip code of the facility */
  zipCode?: string;
  /** State */
  state?: string;
  /** Country */
  country?: string;
  /** DHL country */
  dhlCountry?: string;
  /** Country Division Code */
  countryDivisionCode?: string;
  /** Enumeration (State, Province) */
  countryDivisionCodeType?: string;
  /** Obsolete. This is planned to be removed in future releases. */
  html?: string;
}

/** Information about how the Service Point can be contacted */
export interface ContactDetails {
  /** Phone number of the Service Point */
  phoneNumber?: string;
  /** E-Mail address of the Service Point */
  email?: string;
  /** Link to website of the Service Point */
  linkUri?: string;
  /** Obsolete. This is planned to be removed in future releases. */
  html?: string;
  /** Provides the contact type */
  contactType?: string;
}

/** The geo coordinates of the facilityâs location */
export interface GeoLocation {
  /** Latitude of the geocoded search address (used for GREF web service search) */
  latitude?: number;
  /** Longitude of the geocoded search address (used for GREF web service search) */
  longitude?: number;
  suggestion?: Suggestion;
}

/** Array of openingHours entities, each consisting of week day, opening time and closing time. */
export interface OpeningHours {
  /** Multiple opening hours entities can exist for the same week day. */
  openingHours?: OpeningTime[];
  holidays?: Holidays;
}

/** Multiple opening hours entities can exist for the same week day. */
export interface OpeningTime {
  /** Weekday for which this opening hours entity is valid. Possible values are: MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY, HOLIDAY */
  dayOfWeek?: "MONDAY"
    | "TUESDAY"
    | "WEDNESDAY"
    | "THURSDAY"
    | "FRIDAY"
    | "SATURDAY"
    | "SUNDAY"
    | "HOLIDAY";
  /** The opening time of this entity */
  openingTime?: string;
  /** The closing time of this entity */
  closingTime?: string;
}

/** Array of objects: {date, from, to}, where date is date and from and to is time */
export interface OpenDatesTime {
  /** Date â when is open during holidays */
  date?: string;
  /** Time â beginning of open hours */
  from?: string;
  /** Time â end of open hours */
  to?: string;
}

/** Array of dates:{from, to} when is closed. */
export interface ClosedDates {
  /** Date â start when it is closed */
  from?: string;
  /** Date â end when it is closed */
  to?: string;
}

/** Holiday details */
export interface Holidays {
  /** Array of objects: {date, from, to}, where date is date and from and to is time */
  open?: OpenDatesTime[];
  /** Array of dates:{from, to} when is closed. */
  closed?: ClosedDates[];
}

/** Array of numbers L W H */
export interface Dimensions {
  l?: number;
  w?: number;
  h?: number;
}

/** Information about shipment piece / size */
export interface ShipmentLimitations {
  maxNumberOfPieces?: ValueUnit;
  maxShipmentWeight?: ValueUnit;
}

/** Shipment Piece Limitations in this Service Point. */
export interface ShipmentLimitationsByPiece {
  pieceSizeLimit1?: ValueUnit;
  pieceSizeLimit2?: ValueUnit;
  pieceSizeLimit3?: ValueUnit;
  maxPieceWeight?: ValueUnit;
}

/** Partner information (when SVP type is PRT) */
export interface Partner {
  /** ID of a partner */
  partnerId?: string;
  /** Name of a partner */
  partnerName?: string;
  /** Code of a partner */
  partnerTypeCode?: string;
  promotion?: Promotion;
}

/** Promotion on a SVP level */
export interface Promotion {
  /** Unique identifier for promotion */
  id: number;
  /** Country Code */
  countryCode?: string;
  /** Partner Type code */
  partnerTypeCode?: string;
  /** Service Point ID */
  servicePointId?: string;
  /** Client ID */
  clientId: string;
  /** Capability(PPC) */
  capability: string;
  /** Promotion Start date */
  startDate: string;
  /** Promotion End date */
  endDate: string;
  /** Promotion on specific day of the week */
  dayOfWeek?: string;
  /** Promotion message */
  text: string;
  /** Promotion button text */
  buttonText?: string;
  /** Promotion Language Code */
  languageCode1?: string;
  /** Promotion message */
  text1?: string;
  /** Promotion button text */
  buttonText1?: string;
  /** Promotion Language Code */
  languageCode2?: string;
  /** Promotion message */
  text2?: string;
  /** Promotion button text */
  buttonText2?: string;
  /** Promotion Language Code */
  languageCode3?: string;
  /** Promotion message */
  text3?: string;
  /** Promotion button text */
  buttonText3?: string;
  /** Promotion Web link */
  hyperlink?: string;
  /** Promotion created date */
  created?: string;
}

/** Information about language used for search */
export interface Language {
  /** Language Code */
  languageCode?: string;
  /** Language Script Code */
  languageScriptCode?: string;
  /** Language Country Code */
  languageCountryCode?: string;
  /** Language Valid */
  languageOk?: False;
}

/** Translations */
export interface Translations {
  /** key value pairs representing the translations | @example {'some-key': 'some-value'} */
  map?: Record<string, unknown>;
}

/** Suggestion for the search address */
export interface Suggestion {
  /** Always holds null value */
  label?: string;
  /** Always holds null value */
  value?: string;
  /** Latitude of the geocoded search address (used for GREF web service search) */
  latitude?: number;
  /** Longitude of the geocoded search address (used for GREF web service search) */
  longitude?: number;
  /** Country code of the search address */
  countryCode?: string;
  /** Place id of the search address */
  placeId?: string;
  /** Provider id of the search address */
  providerId?: string;
}

/** Capacity information â only if additional call to SCMS was triggered */
export interface CapacityStatus {
  /** Severity code */
  sev?: string;
  /** SCMS */
  msgClg?: string;
  /** SCMS Status code */
  msgCIgd?: string;
  /** SCMS Description of status code */
  dsc?: string;
  /** SCMS detailed description */
  dtlDsc?: string;
}

export interface DateTimeZone {
  id?: string;
  fixed?: boolean;
}

/** Max. weight per piece */
export interface ValueUnit {
  /** Value in BigDecimal */
  value?: number;
  /** UOM */
  uom?: string;
}

/** Response status */
export interface RestResponseStatus {
  /** Status/error code of the response */
  statusCode?: number;
  /** Status/error message text of the response */
  statusMessage?: string;
}

```

---

## Errors

```typescript
/** error message */
export interface supermodelIoLogisticsExpressErrorResponse {
  /** @example /expressapi/shipments */
  instance?: string;
  /** @example #/customerDetails/shipperDetails: required key [countryCode] not found */
  detail?: string;
  /** @example Validation error */
  title?: string;
  /** @example Unprocessable Entity */
  message?: string;
  additionalDetails?: string[];
  /** @example 998 */
  status?: string;
}

export interface ExceptionResponse {
  message?: string;
  status?: string;
  exception?: string;
}

```

---

## Type Aliases

For convenience, shorter aliases for the verbose schema names:

```typescript
export type Account = supermodelIoLogisticsExpressAccount;
export type Address = supermodelIoLogisticsExpressAddress;
export type AddressCreateShipmentRequest = supermodelIoLogisticsExpressAddressCreateShipmentRequest;
export type AddressCreateShipmentResponse = supermodelIoLogisticsExpressAddressCreateShipmentResponse;
export type AddressRatesRequest = supermodelIoLogisticsExpressAddressRatesRequest;
export type AddressValidateResponse = supermodelIoLogisticsExpressAddressValidateResponse;
export type BankDetails = supermodelIoLogisticsExpressBankDetails;
export type Contact = supermodelIoLogisticsExpressContact;
export type ContactBuyer = supermodelIoLogisticsExpressContactBuyer;
export type ContactCreateShipmentResponse = supermodelIoLogisticsExpressContactCreateShipmentResponse;
export type CreateShipmentRequest = supermodelIoLogisticsExpressCreateShipmentRequest;
export type CreateShipmentResponse = supermodelIoLogisticsExpressCreateShipmentResponse;
export type DocumentImageResponse = supermodelIoLogisticsExpressDocumentImageResponse;
export type DocumentImages = supermodelIoLogisticsExpressDocumentImages;
export type ErrorResponse = supermodelIoLogisticsExpressErrorResponse;
export type ExportDeclaration = supermodelIoLogisticsExpressExportDeclaration;
export type Identifier = supermodelIoLogisticsExpressIdentifier;
export type IdentifierResponse = supermodelIoLogisticsExpressIdentifierResponse;
export type ImageUploadRequest = supermodelIoLogisticsExpressImageUploadRequest;
export type LandedCostRequest = supermodelIoLogisticsExpressLandedCostRequest;
export type Package = supermodelIoLogisticsExpressPackage;
export type PackageRR = supermodelIoLogisticsExpressPackageRR;
export type PackageAddPiece = supermodelIoLogisticsExpressPackageAddPiece;
export type PackageReference = supermodelIoLogisticsExpressPackageReference;
export type PickupRequest = supermodelIoLogisticsExpressPickupRequest;
export type PickupResponse = supermodelIoLogisticsExpressPickupResponse;
export type Products = supermodelIoLogisticsExpressProducts;
export type RateRequest = supermodelIoLogisticsExpressRateRequest;
export type Rates = supermodelIoLogisticsExpressRates;
export type Reference = supermodelIoLogisticsExpressReference;
export type RegistrationNumbers = supermodelIoLogisticsExpressRegistrationNumbers;
export type TrackingResponse = supermodelIoLogisticsExpressTrackingResponse;
export type UpdatePickupRequest = supermodelIoLogisticsExpressUpdatePickupRequest;
export type UpdatePickupResponse = supermodelIoLogisticsExpressUpdatePickupResponse;
export type UploadInvoiceDataRequest = supermodelIoLogisticsExpressUploadInvoiceDataRequest;
export type UploadInvoiceDataRequestSID = supermodelIoLogisticsExpressUploadInvoiceDataRequestSID;
export type UploadInvoiceDataResponse = supermodelIoLogisticsExpressUploadInvoiceDataResponse;
export type ValueAddedServices = supermodelIoLogisticsExpressValueAddedServices;
export type ValueAddedServicesRates = supermodelIoLogisticsExpressValueAddedServicesRates;
export type EPODResponse = supermodelIoLogisticsExpressEPODResponse;
export type ReferenceDataResponse = supermodelIoLogisticsExpressReferenceDataResponse;
export type ReferenceData = supermodelIoLogisticsExpressReferenceData;
export type EarlyShipmentScreeningRequest = supermodelIoLogisticsExpressEarlyShipmentScreeningRequest;
export type EarlyShipmentScreeningResponse = supermodelIoLogisticsExpressEarlyShipmentScreeningResponse;
export type ReferenceEarlyShipmentScreening = supermodelIoLogisticsExpressReferenceEarlyShipmentScreening;
export type IdentifierEarlyShipmentScreening = supermodelIoLogisticsExpressIdentifierEarlyShipmentScreening;
export type AddPieceRequest = supermodelIoLogisticsExpressAddPieceRequest;
```