# MyDHL Express Extension Design

## Goal

Extend the existing `DHLClient` SDK so it supports both:

- DHL shipment tracking API (`dhl-ts` current tracking functionality)
- MyDHL Express API (`DHL Express` / `mydhlapi`) using the same `apiKey`

The extension will preserve the current tracking API surface and add new Express methods while keeping one unified client class.

## Requirements

- Keep `DHLClient` as the single exported class
- Use `apiKey` for both DHL tracking and express requests
- Use `X-API-KEY` header for MyDHL Express requests
- Support tracking base URLs and MyDHL Express base URLs separately
- Add minimal Express methods and documentation in `README.md`

## Design

### Configuration

Extend `ClientConfig` in `src/types/config.ts` with:

- `expressEnvironment?: 'production' | 'test'`

Internally, resolve two base URLs:

- tracking base URL: `https://api.dhl.com/dgff/transportation/v2` or sandbox equivalent
- express base URL: `https://express.api.dhl.com/mydhlapi` or `.../test`

### Request utility

Update `src/utils/request.ts` to support:

- `useExpress?: boolean` on request config
- if `useExpress` is true:
  - use `expressBaseUrl`
  - send header `X-API-KEY: <apiKey>`
- else use current tracking headers

### Client API

Keep existing methods:

- `getShipment(params: GetShipmentParams)`
- `listShipments(params: ListShipmentsParams)`

Add Express methods:

- `createExpressShipment(payload: ExpressCreateShipmentRequest): Promise<ExpressCreateShipmentResponse>`
- `getExpressShipmentTracking(shipmentNumber: string, options?: ExpressTrackingOptions): Promise<ExpressTrackingResponse>`
- `getExpressProducts(params: ExpressProductsRequest): Promise<ExpressProductsResponse>`
- `validateExpressAddress(params: ExpressAddressValidateRequest): Promise<ExpressAddressValidateResponse>`

### Types

Add `src/types/express.ts` with minimal, generic request/response structures for Express methods.

Export new types from `src/index.ts`.

### README

Update `README.md` to document:

- `expressEnvironment` and `X-API-KEY`
- new Express methods
- example usage for shipping creation and tracking

## File changes

- `src/types/config.ts`
- `src/utils/request.ts`
- `src/client.ts`
- `src/types/express.ts`
- `src/index.ts`
- `README.md`
- `docs/superpowers/specs/2026-04-08-mydhl-express-extension-design.md`

## Implementation notes

- Keep the existing tracking client behavior unchanged.
- Use the same top-level `apiKey` for both APIs.
- Use optional Express config to avoid breaking existing SDK users.
- The Express methods will initially support a compact surface rather than the full MyDHL API.

## Testing

- Manual sanity check by verifying build and type exports
- Confirm `DHLClient` remains importable
- Confirm new methods compile and are present in type exports

## Questions answered

- One unified `DHLClient` class: yes.
- `X-API-KEY` header for Express Auth: yes.
- Minimal docs update: yes.
