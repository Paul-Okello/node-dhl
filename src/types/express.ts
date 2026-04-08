/**
 * DHL Express Create Shipment Request
 * Complete shipment creation payload for MyDHL Express API
 */
export interface ExpressCreateShipmentRequest {
  /** Identifies the date and time the package is tendered */
  plannedShippingDateAndTime?: string;
  /** Pickup booking details */
  pickup?: {
    /** Please advise if a pickup is needed for this shipment */
    isRequested: boolean;
    /** The latest time the location premises is available to dispatch the DHL Express shipment (HH:MM) */
    closeTime?: string;
    /** Provides information on where the package should be picked up by DHL courier */
    location?: string;
    /** Details special pickup instructions */
    specialInstructions?: Array<{
      /** Any special instructions user wish to send to the courier for the order pick-up */
      value: string;
      /** For future use */
      typeCode?: string;
    }>;
    /** Please enter address and contact details related to your pickup */
    pickupDetails?: {
      /** Postal address for pickup */
      postalAddress: ExpressAddress;
      /** Contact information for pickup */
      contactInformation: ExpressContact;
      /** Registration numbers */
      registrationNumbers?: ExpressRegistrationNumber[];
      /** Bank details */
      bankDetails?: ExpressBankDetails[];
      /** Business party type related to the pickup */
      typeCode?: 'business' | 'direct_consumer' | 'government' | 'other' | 'private' | 'reseller';
    };
    /** Address and contact details of the individual requesting the pickup */
    pickupRequestorDetails?: {
      /** Postal address of pickup requestor */
      postalAddress: ExpressAddress;
      /** Contact information of pickup requestor */
      contactInformation: ExpressContact;
      /** Registration numbers */
      registrationNumbers?: ExpressRegistrationNumber[];
      /** Bank details */
      bankDetails?: ExpressBankDetails[];
      /** Business party type of the pickup requestor */
      typeCode?: 'business' | 'direct_consumer' | 'government' | 'other' | 'private' | 'reseller';
    };
  };
  /** Please enter DHL Express Global Product code */
  productCode: string;
  /** Please enter DHL Express Local Product code */
  localProductCode?: string;
  /** Please advise if you want to get rate estimates for given shipment */
  getRateEstimates?: boolean;
  /** Please enter all the DHL Express accounts and types to be used for this shipment */
  accounts: ExpressAccount[];
  /** Additional shipping services */
  valueAddedServices?: ExpressValueAddedService[];
  /** Here you can modify label, waybillDoc, invoice and shipment receipt properties */
  outputImageProperties?: {
    /** Printer DPI Resolution for X-axis and Y-axis (in DPI) for transport label and waybill document output */
    printerDPI?: 200 | 300;
    /** Customer barcodes to be printed on supported transport label templates */
    customerBarcodes?: Array<{
      /** Please enter barcode content */
      content: string;
      /** Please enter text below customer barcode */
      textBelowBarcode?: string;
      /** Please enter valid Symbology code */
      symbologyCode: '93' | '39' | '128';
    }>;
    /** Customer Logo Image to be printed on transport label */
    customerLogos?: Array<{
      /** Please specify image file format */
      fileFormat: 'PNG' | 'GIF' | 'JPEG' | 'JPG';
      /** Please provide base64 encoded logo image */
      content: string;
    }>;
    /** Please provide the format of the output documents */
    encodingFormat?: 'pdf' | 'zpl' | 'lp2' | 'epl';
    /** Image options for label, waybillDoc, invoice, QRcode and shipment receipt */
    imageOptions?: Array<{
      /** Please enter the document type you want to set properties for */
      typeCode: 'label' | 'waybillDoc' | 'invoice' | 'qr-code' | 'shipmentReceipt';
      /** Please enter DHL Express document template name */
      templateName?: string;
      /** To be used for waybillDoc, invoice, shipment receipt and QRcode */
      isRequested?: boolean;
      /** To be used for waybillDoc - if set to true then account information will not be printed */
      hideAccountNumber?: boolean;
      /** You can ask up to 2 waybillDoc copies to be provided */
      numberOfCopies?: number;
      /** Please advise what type of customs documentation is required */
      invoiceType?: 'commercial' | 'proforma' | 'returns';
      /** Please enter ISO 3 letters language code for invoice or shipment receipt */
      languageCode?: string;
    }>;
  };
  /** Customer references */
  customerReferences?: ExpressReference[];
  /** Regulatory filings */
  regulatoryFilings?: ExpressRegulatoryFiling[];
  /** Customs declarations */
  customsDeclarations?: ExpressCustomsDeclaration[];
  /** Export declaration details */
  exportDeclaration?: ExpressExportDeclaration[];
  /** Shipment notification details */
  shipmentNotification?: ExpressShipmentNotification[];
  /** Please enter address and contact details related to your shipment */
  shipper: {
    /** Postal address */
    postalAddress: ExpressAddress;
    /** Contact information */
    contactInformation: ExpressContact;
    /** Registration numbers */
    registrationNumbers?: ExpressRegistrationNumber[];
    /** Bank details */
    bankDetails?: ExpressBankDetails[];
    /** Business party type */
    typeCode?: 'business' | 'direct_consumer' | 'government' | 'other' | 'private' | 'reseller';
  };
  /** Please enter address and contact details related to your shipment */
  receiver: {
    /** Postal address */
    postalAddress: ExpressAddress;
    /** Contact information */
    contactInformation: ExpressContact;
    /** Registration numbers */
    registrationNumbers?: ExpressRegistrationNumber[];
    /** Bank details */
    bankDetails?: ExpressBankDetails[];
    /** Business party type */
    typeCode?: 'business' | 'direct_consumer' | 'government' | 'other' | 'private' | 'reseller';
  };
  /** Return address details */
  returnAddress?: {
    /** Postal address */
    postalAddress: ExpressAddress;
    /** Contact information */
    contactInformation: ExpressContact;
    /** Registration numbers */
    registrationNumbers?: ExpressRegistrationNumber[];
    /** Bank details */
    bankDetails?: ExpressBankDetails[];
    /** Business party type */
    typeCode?: 'business' | 'direct_consumer' | 'government' | 'other' | 'private' | 'reseller';
  };
  /** Buyer details */
  buyer?: {
    /** Postal address */
    postalAddress: ExpressAddress;
    /** Contact information */
    contactInformation: ExpressContactBuyer;
    /** Registration numbers */
    registrationNumbers?: ExpressRegistrationNumber[];
    /** Bank details */
    bankDetails?: ExpressBankDetails[];
    /** Business party type */
    typeCode?: 'business' | 'direct_consumer' | 'government' | 'other' | 'private' | 'reseller';
  };
  /** Importer details */
  importer?: {
    /** Postal address */
    postalAddress: ExpressAddress;
    /** Contact information */
    contactInformation: ExpressContact;
    /** Registration numbers */
    registrationNumbers?: ExpressRegistrationNumber[];
    /** Bank details */
    bankDetails?: ExpressBankDetails[];
    /** Business party type */
    typeCode?: 'business' | 'direct_consumer' | 'government' | 'other' | 'private' | 'reseller';
  };
  /** Exporter details */
  exporter?: {
    /** Postal address */
    postalAddress: ExpressAddress;
    /** Contact information */
    contactInformation: ExpressContact;
    /** Registration numbers */
    registrationNumbers?: ExpressRegistrationNumber[];
    /** Bank details */
    bankDetails?: ExpressBankDetails[];
    /** Business party type */
    typeCode?: 'business' | 'direct_consumer' | 'government' | 'other' | 'private' | 'reseller';
  };
  /** Seller details */
  seller?: {
    /** Postal address */
    postalAddress: ExpressAddress;
    /** Contact information */
    contactInformation: ExpressContact;
    /** Registration numbers */
    registrationNumbers?: ExpressRegistrationNumber[];
    /** Bank details */
    bankDetails?: ExpressBankDetails[];
    /** Business party type */
    typeCode?: 'business' | 'direct_consumer' | 'government' | 'other' | 'private' | 'reseller';
  };
  /** Payer details */
  payer?: {
    /** Postal address */
    postalAddress: ExpressAddress;
    /** Contact information */
    contactInformation: ExpressContact;
    /** Registration numbers */
    registrationNumbers?: ExpressRegistrationNumber[];
    /** Bank details */
    bankDetails?: ExpressBankDetails[];
    /** Business party type */
    typeCode?: 'business' | 'direct_consumer' | 'government' | 'other' | 'private' | 'reseller';
  };
  /** Broker details */
  broker?: {
    /** Postal address */
    postalAddress: ExpressAddress;
    /** Contact information */
    contactInformation: ExpressContact;
    /** Registration numbers */
    registrationNumbers?: ExpressRegistrationNumber[];
    /** Bank details */
    bankDetails?: ExpressBankDetails[];
    /** Business party type */
    typeCode?: 'business' | 'direct_consumer' | 'government' | 'other' | 'private' | 'reseller';
  };
  /** Dangerous goods details */
  dangerousGoods?: ExpressDangerousGoods[];
  /** Content details */
  content?: ExpressContent;
  /** Request the system to validate data only without creating the shipment */
  validateDataOnly?: boolean;
  /** Bypass PLT error */
  bypassPLTError?: boolean;
  /** Strict validation flag */
  strictValidation?: boolean;
}

/**
 * DHL Express Create Shipment Response
 */
export interface ExpressCreateShipmentResponse {
  /** Shipment tracking number */
  shipmentTrackingNumber?: string;
  /** Cancel pickup URL */
  cancelPickupUrl?: string;
  /** Tracking URL */
  trackingUrl?: string;
  /** Dispatch confirmation number */
  dispatchConfirmationNumber?: string;
  /** Package details */
  packages?: Array<{
    /** AWB number */
    awbNumber?: string;
    /** Reference numbers */
    references?: ExpressReference[];
  }>;
  /** Documents */
  documents?: Array<{
    /** Document type */
    typeCode: string;
    /** Image format */
    imageFormat: string;
    /** Content */
    content: string;
  }>;
  /** On demand delivery URL */
  onDemandDeliveryURL?: string;
  /** Shipment details */
  shipmentDetails?: Array<{
    /** Product code */
    productCode?: string;
    /** Local product code */
    localProductCode?: string;
    /** Accounts */
    accounts?: ExpressAccount[];
    /** Value added services */
    valueAddedServices?: ExpressValueAddedService[];
    /** Customer references */
    customerReferences?: ExpressReference[];
    /** Regulatory filings */
    regulatoryFilings?: ExpressRegulatoryFiling[];
    /** Customs declarations */
    customsDeclarations?: ExpressCustomsDeclaration[];
    /** Export declaration */
    exportDeclaration?: ExpressExportDeclaration[];
    /** Shipment notification */
    shipmentNotification?: ExpressShipmentNotification[];
    /** Shipper details */
    shipper?: {
      postalAddress?: ExpressAddress;
      contactInformation?: ExpressContact;
      registrationNumbers?: ExpressRegistrationNumber[];
      bankDetails?: ExpressBankDetails[];
      typeCode?: string;
    };
    /** Receiver details */
    receiver?: {
      postalAddress?: ExpressAddress;
      contactInformation?: ExpressContact;
      registrationNumbers?: ExpressRegistrationNumber[];
      bankDetails?: ExpressBankDetails[];
      typeCode?: string;
    };
    /** Return address */
    returnAddress?: {
      postalAddress?: ExpressAddress;
      contactInformation?: ExpressContact;
      registrationNumbers?: ExpressRegistrationNumber[];
      bankDetails?: ExpressBankDetails[];
      typeCode?: string;
    };
    /** Buyer details */
    buyer?: {
      postalAddress?: ExpressAddress;
      contactInformation?: ExpressContactBuyer;
      registrationNumbers?: ExpressRegistrationNumber[];
      bankDetails?: ExpressBankDetails[];
      typeCode?: string;
    };
    /** Importer details */
    importer?: {
      postalAddress?: ExpressAddress;
      contactInformation?: ExpressContact;
      registrationNumbers?: ExpressRegistrationNumber[];
      bankDetails?: ExpressBankDetails[];
      typeCode?: string;
    };
    /** Exporter details */
    exporter?: {
      postalAddress?: ExpressAddress;
      contactInformation?: ExpressContact;
      registrationNumbers?: ExpressRegistrationNumber[];
      bankDetails?: ExpressBankDetails[];
      typeCode?: string;
    };
    /** Seller details */
    seller?: {
      postalAddress?: ExpressAddress;
      contactInformation?: ExpressContact;
      registrationNumbers?: ExpressRegistrationNumber[];
      bankDetails?: ExpressBankDetails[];
      typeCode?: string;
    };
    /** Payer details */
    payer?: {
      postalAddress?: ExpressAddress;
      contactInformation?: ExpressContact;
      registrationNumbers?: ExpressRegistrationNumber[];
      bankDetails?: ExpressBankDetails[];
      typeCode?: string;
    };
    /** Broker details */
    broker?: {
      postalAddress?: ExpressAddress;
      contactInformation?: ExpressContact;
      registrationNumbers?: ExpressRegistrationNumber[];
      bankDetails?: ExpressBankDetails[];
      typeCode?: string;
    };
    /** Dangerous goods */
    dangerousGoods?: ExpressDangerousGoods[];
    /** Content */
    content?: ExpressContent;
  }>;
  /** Warnings */
  warnings?: string[];
}

/**
 * DHL Express Address
 */
export interface ExpressAddress {
  /** Postal code */
  postalCode: string;
  /** City name */
  cityName: string;
  /** Country code */
  countryCode: string;
  /** Province code */
  provinceCode?: string;
  /** County name */
  countyName?: string;
  /** Street lines */
  streetLines?: string[];
  /** Additional address information */
  additionalAddressInformation?: string[];
}

/**
 * DHL Express Contact
 */
export interface ExpressContact {
  /** Email address */
  email?: string;
  /** Phone number */
  phone: string;
  /** Mobile phone number */
  mobilePhone?: string;
  /** Company name */
  companyName: string;
  /** Full name */
  fullName: string;
}

/**
 * DHL Express Contact for Buyer
 */
export interface ExpressContactBuyer {
  /** Email address */
  email?: string;
  /** Phone number */
  phone?: string;
  /** Mobile phone number */
  mobilePhone?: string;
  /** Company name */
  companyName?: string;
  /** Full name */
  fullName: string;
}

/**
 * DHL Express Account
 */
export interface ExpressAccount {
  /** Account number */
  number: string;
  /** Account type code */
  typeCode: string;
}

/**
 * DHL Express Value Added Service
 */
export interface ExpressValueAddedService {
  /** Service code */
  serviceCode: string;
  /** Service type code */
  serviceTypeCode?: string;
  /** Value */
  value?: string;
  /** Currency code */
  currencyCode?: string;
  /** Method of payment */
  methodOfPayment?: string;
  /** Dangerous goods details */
  dangerousGoods?: ExpressDangerousGoods[];
}

/**
 * DHL Express Reference
 */
export interface ExpressReference {
  /** Reference value */
  value: string;
  /** Reference type code */
  typeCode?: string;
}

/**
 * DHL Express Registration Number
 */
export interface ExpressRegistrationNumber {
  /** Registration number type code */
  typeCode: string;
  /** Registration number value */
  number: string;
  /** Registration number issuer country code */
  issuerCountryCode?: string;
}

/**
 * DHL Express Bank Details
 */
export interface ExpressBankDetails {
  /** Bank name */
  name?: string;
  /** Settlement local currency */
  settlementLocalCurrency?: string;
  /** Settlement foreign currency */
  settlementForeignCurrency?: string;
}

/**
 * DHL Express Regulatory Filing
 */
export interface ExpressRegulatoryFiling {
  /** Regulatory authority */
  regulatoryAuthority: string;
  /** Filing number */
  filingNumber?: string;
}

/**
 * DHL Express Customs Declaration
 */
export interface ExpressCustomsDeclaration {
  /** Customs clearance type */
  typeCode?: string;
  /** Customs clearance value */
  clearanceValue?: number;
  /** Customs clearance currency */
  clearanceCurrency?: string;
  /** Customs clearance value type */
  clearanceValueType?: string;
  /** Commercial invoice number */
  commercialInvoiceNumber?: string;
  /** Commercial invoice date */
  commercialInvoiceDate?: string;
  /** Shipment purpose */
  shipmentPurpose?: string;
  /** Shipment type */
  shipmentType?: string;
  /** Customs office code */
  customsOfficeCode?: string;
  /** Customs office name */
  customsOfficeName?: string;
  /** Customs clearance instructions */
  clearanceInstructions?: string;
  /** Customs clearance port */
  clearancePort?: string;
  /** Customs clearance country */
  clearanceCountry?: string;
  /** Customs clearance zone */
  clearanceZone?: string;
  /** Customs clearance bill to party */
  clearanceBillToParty?: string;
  /** Line items */
  lineItems?: ExpressCustomsLineItem[];
}

/**
 * DHL Express Customs Line Item
 */
export interface ExpressCustomsLineItem {
  /** Item number */
  number: number;
  /** Item description */
  description: string;
  /** Price */
  price: number;
  /** Quantity */
  quantity: {
    /** Quantity value */
    value: number;
    /** Quantity unit of measurement */
    unitOfMeasurement: string;
  };
  /** Commodity code */
  commodityCode?: string;
  /** Item weight */
  weight?: {
    /** Weight value */
    value: number;
    /** Weight unit of measurement */
    unitOfMeasurement: string;
  };
  /** Item dimensions */
  dimensions?: {
    /** Length */
    length: number;
    /** Width */
    width: number;
    /** Height */
    height: number;
    /** Unit of measurement */
    unitOfMeasurement: string;
  };
  /** Manufacturing country code */
  manufacturingCountryCode?: string;
  /** Manufacturing country name */
  manufacturingCountryName?: string;
}

/**
 * DHL Express Export Declaration
 */
export interface ExpressExportDeclaration {
  /** Line items */
  lineItems: ExpressExportLineItem[];
  /** Invoice number */
  invoiceNumber?: string;
  /** Invoice date */
  invoiceDate?: string;
  /** Export reason */
  exportReason?: string;
  /** Export reason type */
  exportReasonType?: string;
  /** Licenses */
  licenses?: ExpressLicense[];
  /** Certificate number */
  certificateNumber?: string;
  /** Comments */
  comments?: string;
  /** Declaration notes */
  declarationNotes?: ExpressDeclarationNote[];
  /** Shipper reference */
  shipperReference?: string;
  /** Consignee reference */
  consigneeReference?: string;
  /** Importer reference */
  importerReference?: string;
  /** Customer references */
  customerReferences?: ExpressReference[];
  /** Invoice total net weight */
  invoiceTotalNetWeight?: number;
  /** Invoice total gross weight */
  invoiceTotalGrossWeight?: number;
  /** Invoice total chargeable weight */
  invoiceTotalChargeableWeight?: number;
  /** Place of incubation */
  placeOfIncubation?: string;
  /** Recipient reference */
  recipientReference?: string;
  /** Exporter code */
  exporterCode?: string;
  /** Exporter id */
  exporterId?: string;
  /** Importer id */
  importerId?: string;
  /** Recipient id */
  recipientId?: string;
  /** Recipient tax id */
  recipientTaxId?: string;
  /** Recipient type */
  recipientType?: string;
  /** Exporter type */
  exporterType?: string;
  /** Importer type */
  importerType?: string;
  /** Signature name */
  signatureName?: string;
  /** Signature title */
  signatureTitle?: string;
  /** Signature image */
  signatureImage?: string;
  /** Additional charges */
  additionalCharges?: ExpressAdditionalCharge[];
  /** Destination port name */
  destinationPortName?: string;
  /** Terms of trade */
  termsOfTrade?: string;
  /** Declaration type */
  declarationType?: string;
  /** Invoice type */
  invoiceType?: string;
  /** Invoice total value */
  invoiceTotalValue?: number;
  /** Invoice total value currency */
  invoiceTotalValueCurrency?: string;
  /** Freight charge */
  freightCharge?: number;
  /** Freight charge currency */
  freightChargeCurrency?: string;
  /** Insurance charge */
  insuranceCharge?: number;
  /** Insurance charge currency */
  insuranceChargeCurrency?: string;
  /** Other charge */
  otherCharge?: number;
  /** Other charge currency */
  otherChargeCurrency?: string;
  /** Other charge description */
  otherChargeDescription?: string;
  /** Customs currency code */
  customsCurrencyCode?: string;
  /** Exchange rate */
  exchangeRate?: number;
  /** Export reference */
  exportReference?: string;
  /** Ultimate destination country */
  ultimateDestinationCountry?: string;
  /** Ultimate destination type */
  ultimateDestinationType?: string;
  /** Invoice number type */
  invoiceNumberType?: string;
  /** Invoice date type */
  invoiceDateType?: string;
  /** Invoice total net weight unit */
  invoiceTotalNetWeightUnit?: string;
  /** Invoice total gross weight unit */
  invoiceTotalGrossWeightUnit?: string;
  /** Invoice total chargeable weight unit */
  invoiceTotalChargeableWeightUnit?: string;
  /** Invoice total value type */
  invoiceTotalValueType?: string;
  /** Freight charge type */
  freightChargeType?: string;
  /** Insurance charge type */
  insuranceChargeType?: string;
  /** Other charge type */
  otherChargeType?: string;
  /** Exchange rate type */
  exchangeRateType?: string;
}

/**
 * DHL Express Export Line Item
 */
export interface ExpressExportLineItem {
  /** Item number */
  number: number;
  /** Item description */
  description: string;
  /** Price */
  price: number;
  /** Quantity */
  quantity: {
    /** Quantity value */
    value: number;
    /** Quantity unit of measurement */
    unitOfMeasurement: string;
  };
  /** Commodity code */
  commodityCode?: string;
  /** Item weight */
  weight?: {
    /** Weight value */
    value: number;
    /** Weight unit of measurement */
    unitOfMeasurement: string;
  };
  /** Item dimensions */
  dimensions?: {
    /** Length */
    length: number;
    /** Width */
    width: number;
    /** Height */
    height: number;
    /** Unit of measurement */
    unitOfMeasurement: string;
  };
  /** Manufacturing country code */
  manufacturingCountryCode?: string;
  /** Manufacturing country name */
  manufacturingCountryName?: string;
  /** Export reason type */
  exportReasonType?: string;
  /** Item references */
  itemReferences?: ExpressReference[];
  /** Quantity unit of measurement type */
  quantityUnitOfMeasurementType?: string;
  /** Price currency code */
  priceCurrencyCode?: string;
  /** Price type */
  priceType?: string;
  /** Weight unit of measurement type */
  weightUnitOfMeasurementType?: string;
  /** Dimensions unit of measurement type */
  dimensionsUnitOfMeasurementType?: string;
  /** Manufacturing country code type */
  manufacturingCountryCodeType?: string;
  /** Commodity code type */
  commodityCodeType?: string;
  /** Item number type */
  itemNumberType?: string;
  /** Description type */
  descriptionType?: string;
  /** Export reason type code */
  exportReasonTypeCode?: string;
}

/**
 * DHL Express License
 */
export interface ExpressLicense {
  /** License type */
  typeCode: string;
  /** License number */
  number: string;
  /** License date */
  date?: string;
}

/**
 * DHL Express Declaration Note
 */
export interface ExpressDeclarationNote {
  /** Note value */
  value: string;
}

/**
 * DHL Express Additional Charge
 */
export interface ExpressAdditionalCharge {
  /** Charge type */
  typeCode: string;
  /** Charge value */
  value: number;
  /** Charge currency */
  currency?: string;
  /** Charge caption */
  caption?: string;
}

/**
 * DHL Express Shipment Notification
 */
export interface ExpressShipmentNotification {
  /** Notification type code */
  typeCode: string;
  /** Receiver id */
  receiverId?: string;
  /** Language code */
  languageCode?: string;
  /** Language country code */
  languageCountryCode?: string;
  /** Bespoke message */
  bespokeMessage?: string;
}

/**
 * DHL Express Dangerous Goods
 */
export interface ExpressDangerousGoods {
  /** Content id */
  contentId?: string;
  /** Content description */
  contentDescription?: string;
  /** UN code */
  unCode?: string;
  /** Packing group */
  packingGroup?: string;
  /** Packing instruction */
  packingInstruction?: string;
  /** Number of pieces */
  numberOfPieces?: number;
  /** Net weight */
  netWeight?: number;
  /** Net weight unit */
  netWeightUnit?: string;
  /** Gross weight */
  grossWeight?: number;
  /** Gross weight unit */
  grossWeightUnit?: string;
  /** Volume */
  volume?: number;
  /** Volume unit */
  volumeUnit?: string;
  /** Proper shipping name */
  properShippingName?: string;
  /** Technical name */
  technicalName?: string;
  /** Additional information */
  additionalInformation?: string[];
  /** Reportable quantity */
  reportableQuantity?: string;
  /** Marine pollutant */
  marinePollutant?: string;
  /** Radioactive material */
  radioactiveMaterial?: {
    /** Activity level */
    activityLevel?: string;
    /** Criticality safety index */
    criticalitySafetyIndex?: string;
    /** Dimensions */
    dimensions?: string;
    /** Fissile exception reference */
    fissileExceptionReference?: string;
    /** Identification */
    identification?: string;
    /** Labels */
    labels?: string[];
    /** Measurement */
    measurement?: string;
    /** Measurement unit */
    measurementUnit?: string;
    /** Overpack authorized */
    overpackAuthorized?: string;
    /** Overpack indicator */
    overpackIndicator?: string;
    /** Physical form */
    physicalForm?: string;
    /** Transport index */
    transportIndex?: string;
  };
}

/**
 * DHL Express Content
 */
export interface ExpressContent {
  /** Content packages */
  packages: ExpressPackage[];
  /** Content is customs declarable */
  isCustomsDeclarable: boolean;
  /** Content declared value */
  declaredValue?: number;
  /** Content declared value currency */
  declaredValueCurrency?: string;
  /** Content export declaration */
  exportDeclaration?: ExpressExportDeclaration[];
  /** Content description */
  description?: string;
  /** Content US filing type value */
  usFilingTypeValue?: string;
  /** Content customs value */
  customsValue?: number;
  /** Content insurance value */
  insuranceValue?: number;
  /** Content freight charge */
  freightCharge?: number;
  /** Content insurance charge */
  insuranceCharge?: number;
  /** Content other charge */
  otherCharge?: number;
  /** Content other charge description */
  otherChargeDescription?: string;
}

/**
 * DHL Express Package
 */
export interface ExpressPackage {
  /** Package type code */
  typeCode?: string;
  /** Package weight */
  weight: number;
  /** Package dimensions */
  dimensions: {
    /** Length */
    length: number;
    /** Width */
    width: number;
    /** Height */
    height: number;
  };
  /** Package customer references */
  customerReferences?: ExpressReference[];
  /** Package description */
  description?: string;
  /** Package value */
  value?: number;
  /** Package currency code */
  currencyCode?: string;
  /** Package UOM */
  uom?: string;
  /** Package weight unit */
  weightUnit?: string;
  /** Package dimensions unit */
  dimensionsUnit?: string;
  /** Package dangerous goods */
  dangerousGoods?: ExpressDangerousGoods[];
  /** Package identifiers */
  identifiers?: ExpressIdentifier[];
}

/**
 * DHL Express Identifier
 */
export interface ExpressIdentifier {
  /** Identifier type code */
  typeCode: string;
  /** Identifier value */
  value: string;
  /** Identifier data identifier */
  dataIdentifier?: string;
}

/**
 * DHL Express Tracking Response
 */
export interface ExpressTrackingResponse {
  /** Array of shipment tracking information */
  shipments: Array<{
    /** Shipment tracking number */
    shipmentTrackingNumber: string;
    /** Status of the tracking request */
    status: string;
    /** Shipment timestamp */
    shipmentTimestamp: string;
    /** DHL product code */
    productCode: string;
    /** Shipment description */
    description: string;
    /** Shipper details */
    shipperDetails: {
      /** Shipper name (may be empty due to GDPR) */
      name: string;
      /** Shipper postal address */
      postalAddress: {
        /** City name (may be empty due to GDPR) */
        cityName: string;
        /** County name (may be empty due to GDPR) */
        countyName: string;
        /** Postal code (may be empty due to GDPR) */
        postalCode: string;
        /** Province code (may be empty due to GDPR) */
        provinceCode: string;
        /** Country code */
        countryCode: string;
      };
      /** Service area information */
      serviceArea: Array<{
        /** Service area code */
        code: string;
        /** Service area description */
        description: string;
        /** Outbound sort code */
        outboundSortCode?: string;
      }>;
    };
    /** Receiver details */
    receiverDetails: {
      /** Receiver name (may be empty due to GDPR) */
      name: string;
      /** Receiver postal address */
      postalAddress: {
        /** City name (may be empty due to GDPR) */
        cityName: string;
        /** County name (may be empty due to GDPR) */
        countyName: string;
        /** Postal code (may be empty due to GDPR) */
        postalCode: string;
        /** Province code (may be empty due to GDPR) */
        provinceCode: string;
        /** Country code */
        countryCode: string;
      };
      /** Service area information */
      serviceArea: Array<{
        /** Service area code */
        code: string;
        /** Service area description */
        description: string;
        /** Facility code */
        facilityCode?: string;
        /** Inbound sort code */
        inboundSortCode?: string;
      }>;
    };
    /** Total weight of shipment */
    totalWeight: number;
    /** Unit of measurements */
    unitOfMeasurements: string;
    /** Shipper references */
    shipperReferences?: Array<{
      /** Reference value */
      value: string;
      /** Reference type code */
      typeCode?: string;
    }>;
    /** Tracking events */
    events: Array<{
      /** Event date */
      date: string;
      /** Event time */
      time: string;
      /** GMT offset */
      GMTOffset?: string;
      /** Event type code */
      typeCode: string;
      /** Event description */
      description: string;
      /** Service area information */
      serviceArea: Array<{
        /** Service area code */
        code: string;
        /** Service area description */
        description: string;
      }>;
      /** Signatory name (may be empty due to GDPR) */
      signedBy: string;
    }>;
    /** Number of pieces */
    numberOfPieces: number;
    /** Package details */
    pieces: Array<{
      /** Piece number */
      number: number;
      /** Piece type code */
      typeCode?: string;
      /** Shipment tracking number */
      shipmentTrackingNumber: string;
      /** Piece tracking number */
      trackingNumber: string;
      /** Piece description */
      description?: string;
      /** Piece weight */
      weight?: number;
      /** Dimensional weight */
      dimensionalWeight?: number;
      /** Actual weight */
      actualWeight?: number;
      /** Dimensions */
      dimensions?: {
        /** Length */
        length: number;
        /** Width */
        width: number;
        /** Height */
        height: number;
      };
      /** Actual dimensions */
      actualDimensions?: {
        /** Length */
        length: number;
        /** Width */
        width: number;
        /** Height */
        height: number;
      };
      /** Unit of measurements */
      unitOfMeasurements?: string;
      /** Shipper references */
      shipperReferences?: Array<{
        /** Reference value */
        value: string;
        /** Reference type code */
        typeCode?: string;
      }>;
      /** Piece events */
      events: Array<{
        /** Event date */
        date: string;
        /** GMT offset */
        GMTOffset?: string;
        /** Event time */
        time: string;
        /** Event type code */
        typeCode: string;
        /** Event description */
        description: string;
        /** Service area information */
        serviceArea: Array<{
          /** Service area code */
          code: string;
          /** Service area description */
          description: string;
        }>;
        /** Signatory name (may be empty due to GDPR) */
        signedBy: string;
      }>;
    }>;
    /** Estimated delivery date */
    estimatedDeliveryDate: string;
    /** Children shipment identification numbers */
    childrenShipmentIdentificationNumbers?: string[];
    /** Controlled access data codes */
    controlledAccessDataCodes?: string[];
  }>;
}

/**
 * DHL Express Products Request
 */
export interface ExpressProductsRequest {
  /** Customer account number */
  accountNumber?: string;
  /** Origin country code */
  originCountryCode: string;
  /** Origin postal code */
  originPostalCode: string;
  /** Origin city name */
  originCityName: string;
  /** Destination country code */
  destinationCountryCode: string;
  /** Destination postal code */
  destinationPostalCode: string;
  /** Destination city name */
  destinationCityName: string;
  /** Shipment weight */
  weight: number;
  /** Weight unit */
  weightUnit?: string;
  /** Package length */
  length?: number;
  /** Package width */
  width?: number;
  /** Package height */
  height?: number;
  /** Dimensions unit */
  dimensionsUnit?: string;
  /** Planned shipping date */
  plannedShippingDate?: string;
  /** Customs declarable flag */
  isCustomsDeclarable: boolean;
  /** Unit of measurement */
  unitOfMeasure?: string;
  /** Next business day flag */
  nextBusinessDay?: boolean;
  /** Strict validation flag */
  strictValidation?: boolean;
  /** Get all value added services flag */
  getAllValueAddedServices?: boolean;
  /** Request estimated delivery date flag */
  requestEstimatedDeliveryDate?: boolean;
  /** Estimated delivery date type */
  estimatedDeliveryDateType?: string;
}

/**
 * DHL Express Products Response
 */
export interface ExpressProductsResponse {
  /** Array of available products */
  products: Array<{
    /** DHL Express product - Global Product Name */
    productName: string;
    /** Global DHL Express product code */
    productCode: string;
    /** Local DHL Express product code */
    localProductCode: string;
    /** Country code for the local service */
    localProductCountryCode: string;
    /** Network type (DD: Day Definite, TD: Time Definite) */
    networkTypeCode: string;
    /** Indicator for customer agreement requirement */
    isCustomerAgreement: boolean;
    /** Weight information */
    weight: {
      /** Dimensional weight */
      volumetric: number;
      /** Quoted weight */
      provided: number;
      /** Unit of measurement */
      unitOfMeasurement: string;
    };
    /** Service breakdown details */
    breakdown?: Array<{
      /** Breakdown name */
      name: string;
      /** Special service code */
      serviceCode?: string;
      /** Local service code */
      localServiceCode?: string;
      /** Breakdown type code */
      typeCode?: string;
      /** Service type code */
      serviceTypeCode?: string;
      /** Customer agreement indicator */
      isCustomerAgreement?: boolean;
      /** Marketed service indicator */
      isMarketedService?: boolean;
      /** Billing service indicator */
      isBillingServiceIndicator?: boolean;
    }>;
    /** Mutually exclusive service groups */
    serviceCodeMutuallyExclusiveGroups?: Array<{
      /** Group name */
      serviceCodeRuleName: string;
      /** Group description */
      description: string;
      /** Service codes in the group */
      serviceCodes: Array<{
        /** Service code */
        serviceCode: string;
      }>;
    }>;
    /** Service code dependency rules */
    serviceCodeDependencyRuleGroups?: Array<{
      /** Dependency rule name */
      serviceCodeRuleName: string;
      /** Rule description */
      description: string;
      /** Dependent service codes */
      dependentServiceCodes: Array<{
        /** Service code */
        serviceCode: string;
        /** Dependency type */
        dependencyTypeCode: string;
      }>;
      /** Required service codes */
      requiredServiceCodes: Array<{
        /** Service code */
        serviceCode: string;
      }>;
    }>;
  }>;
}

/**
 * DHL Express Address Validation Request
 */
export interface ExpressAddressValidateRequest {
  /** Type of address validation */
  type?: string;
  /** Country code */
  countryCode: string;
  /** Postal code */
  postalCode: string;
  /** City name */
  cityName: string;
  /** County name */
  countyName?: string;
  /** Strict validation flag */
  strictValidation?: boolean;
}

/**
 * DHL Express Address Validation Response
 */
export interface ExpressAddressValidateResponse {
  /** Validation warnings */
  warnings?: string[];
  /** Validated addresses */
  address?: Array<{
    /** Country code */
    countryCode: string;
    /** Postal code */
    postalCode: string;
    /** City name */
    cityName: string;
    /** County name */
    countyName?: string;
    /** Service area information */
    serviceArea: {
      /** Service area code */
      code: string;
      /** Service area description */
      description: string;
      /** GMT offset */
      GMTOffset?: string;
    };
  }>;
}

/**
 * DHL Express Rates Request
 */
export interface ExpressRatesRequest {
  /** Customer account number */
  accountNumber?: string;
  /** Origin country code */
  originCountryCode: string;
  /** Origin postal code */
  originPostalCode: string;
  /** Origin city name */
  originCityName: string;
  /** Destination country code */
  destinationCountryCode: string;
  /** Destination postal code */
  destinationPostalCode: string;
  /** Destination city name */
  destinationCityName: string;
  /** Shipment weight */
  weight: number;
  /** Weight unit */
  weightUnit?: string;
  /** Package length */
  length?: number;
  /** Package width */
  width?: number;
  /** Package height */
  height?: number;
  /** Dimensions unit */
  dimensionsUnit?: string;
  /** Planned shipping date */
  plannedShippingDate?: string;
  /** Customs declarable flag */
  isCustomsDeclarable: boolean;
  /** Unit of measurement */
  unitOfMeasure?: string;
  /** Next business day flag */
  nextBusinessDay?: boolean;
  /** Strict validation flag */
  strictValidation?: boolean;
  /** Get all value added services flag */
  getAllValueAddedServices?: boolean;
  /** Request estimated delivery date flag */
  requestEstimatedDeliveryDate?: boolean;
  /** Estimated delivery date type */
  estimatedDeliveryDateType?: string;
  /** Packages for multi-piece shipments */
  packages?: Array<{
    /** Package weight */
    weight: number;
    /** Package dimensions */
    dimensions?: {
      length: number;
      width: number;
      height: number;
    };
  }>;
  /** Value added services */
  valueAddedServices?: ExpressValueAddedService[];
  /** Get quotation ID flag */
  getQuotationID?: boolean;
  /** Declared value */
  declaredValue?: number;
  /** Declared value currency */
  declaredValueCurrency?: string;
}

/**
 * DHL Express Rates Response
 */
export interface ExpressRatesResponse {
  /** Array of available products with rates */
  products: Array<{
    /** DHL Express product - Global Product Name */
    productName: string;
    /** Global DHL Express product code */
    productCode: string;
    /** Local DHL Express product code */
    localProductCode: string;
    /** Country code for the local service */
    localProductCountryCode: string;
    /** Network type (DD: Day Definite, TD: Time Definite) */
    networkTypeCode: string;
    /** Indicator for customer agreement requirement */
    isCustomerAgreement: boolean;
    /** Weight information */
    weight: {
      /** Dimensional weight */
      volumetric: number;
      /** Quoted weight */
      provided: number;
      /** Unit of measurement */
      unitOfMeasurement: string;
    };
    /** Total price information */
    totalPrice: Array<{
      /** Currency type */
      currencyType: string;
      /** Price currency */
      priceCurrency: string;
      /** Total price */
      price: number;
    }>;
    /** Total price breakdown */
    totalPriceBreakdown?: Array<{
      /** Currency type */
      currencyType: string;
      /** Price currency */
      priceCurrency: string;
      /** Price breakdown details */
      priceBreakdown: Array<{
        /** Breakdown type code */
        typeCode: string;
        /** Price amount */
        price: number;
      }>;
    }>;
    /** Detailed price breakdown */
    detailedPriceBreakdown?: Array<{
      /** Currency type */
      currencyType: string;
      /** Price currency */
      priceCurrency: string;
      /** Breakdown details */
      breakdown: Array<{
        /** Breakdown name */
        name: string;
        /** Service code */
        serviceCode?: string;
        /** Local service code */
        localServiceCode?: string;
        /** Type code */
        typeCode?: string;
        /** Service type code */
        serviceTypeCode?: string;
        /** Price */
        price?: number;
        /** Price currency */
        priceCurrency?: string;
        /** Customer agreement indicator */
        isCustomerAgreement?: boolean;
        /** Marketed service indicator */
        isMarketedService?: boolean;
        /** Billing service indicator */
        isBillingServiceIndicator?: boolean;
        /** Price breakdown details */
        priceBreakdown?: Array<{
          /** Price type */
          priceType: string;
          /** Type code */
          typeCode: string;
          /** Price amount */
          price: number;
          /** Rate percentage */
          rate?: number;
          /** Base price */
          basePrice?: number;
        }>;
        /** Tariff rate formula */
        tariffRateFormula?: string;
      }>;
    }>;
    /** Mutually exclusive service groups */
    serviceCodeMutuallyExclusiveGroups?: Array<{
      /** Group name */
      serviceCodeRuleName: string;
      /** Group description */
      description: string;
      /** Service codes in the group */
      serviceCodes: Array<{
        /** Service code */
        serviceCode: string;
      }>;
    }>;
    /** Service code dependency rules */
    serviceCodeDependencyRuleGroups?: Array<{
      /** Dependency rule name */
      serviceCodeRuleName: string;
      /** Rule description */
      description: string;
      /** Dependent service codes */
      dependentServiceCodes: Array<{
        /** Service code */
        serviceCode: string;
        /** Dependency type */
        dependencyTypeCode: string;
      }>;
      /** Required service codes */
      requiredServiceCodes: Array<{
        /** Service code */
        serviceCode: string;
      }>;
    }>;
  }>;
  /** Exchange rates */
  exchangeRates?: Array<{
    /** From currency */
    fromCurrency: string;
    /** To currency */
    toCurrency: string;
    /** Exchange rate */
    rate: number;
  }>;
}

/**
 * DHL Express Landed Cost Request
 */
export interface ExpressLandedCostRequest {
  /** Get quotation ID flag */
  getQuotationID?: boolean;
  /** Customer references */
  customerReferences?: ExpressReference[];
  /** Shipper details */
  shipper: {
    /** Postal address */
    postalAddress: ExpressAddress;
    /** Contact information */
    contactInformation: ExpressContact;
    /** Registration numbers */
    registrationNumbers?: ExpressRegistrationNumber[];
    /** Bank details */
    bankDetails?: ExpressBankDetails[];
    /** Business party type */
    typeCode?: 'business' | 'direct_consumer' | 'government' | 'other' | 'private' | 'reseller';
  };
  /** Receiver details */
  receiver: {
    /** Postal address */
    postalAddress: ExpressAddress;
    /** Contact information */
    contactInformation: ExpressContact;
    /** Registration numbers */
    registrationNumbers?: ExpressRegistrationNumber[];
    /** Bank details */
    bankDetails?: ExpressBankDetails[];
    /** Business party type */
    typeCode?: 'business' | 'direct_consumer' | 'government' | 'other' | 'private' | 'reseller';
  };
  /** Buyer details */
  buyer?: {
    /** Postal address */
    postalAddress: ExpressAddress;
    /** Contact information */
    contactInformation: ExpressContactBuyer;
    /** Registration numbers */
    registrationNumbers?: ExpressRegistrationNumber[];
    /** Bank details */
    bankDetails?: ExpressBankDetails[];
    /** Business party type */
    typeCode?: 'business' | 'direct_consumer' | 'government' | 'other' | 'private' | 'reseller';
  };
  /** Content details */
  content: ExpressContent;
  /** Declared value */
  declaredValue?: number;
  /** Declared value currency */
  declaredValueCurrency?: string;
  /** Accounts */
  accounts: ExpressAccount[];
  /** Value added services */
  valueAddedServices?: ExpressValueAddedService[];
  /** Request estimated delivery date flag */
  requestEstimatedDeliveryDate?: boolean;
  /** Estimated delivery date type */
  estimatedDeliveryDateType?: string;
  /** Get detailed breakdown flag */
  getDetailedBreakdown?: boolean;
  /** Get quotation ID flag */
  getQuotationId?: boolean;
}

/**
 * DHL Express Landed Cost Response
 */
export interface ExpressLandedCostResponse {
  /** Products with landed cost information */
  products: Array<{
    /** DHL Express product - Global Product Name */
    productName: string;
    /** Global DHL Express product code */
    productCode: string;
    /** Local DHL Express product code */
    localProductCode: string;
    /** Country code for the local service */
    localProductCountryCode: string;
    /** Network type (DD: Day Definite, TD: Time Definite) */
    networkTypeCode: string;
    /** Indicator for customer agreement requirement */
    isCustomerAgreement: boolean;
    /** Weight information */
    weight: {
      /** Dimensional weight */
      volumetric: number;
      /** Quoted weight */
      provided: number;
      /** Unit of measurement */
      unitOfMeasurement: string;
    };
    /** Total price information */
    totalPrice: Array<{
      /** Currency type */
      currencyType: string;
      /** Price currency */
      priceCurrency: string;
      /** Total price */
      price: number;
    }>;
    /** Total price breakdown */
    totalPriceBreakdown?: Array<{
      /** Currency type */
      currencyType: string;
      /** Price currency */
      priceCurrency: string;
      /** Price breakdown details */
      priceBreakdown: Array<{
        /** Breakdown type code */
        typeCode: string;
        /** Price amount */
        price: number;
      }>;
    }>;
    /** Detailed price breakdown */
    detailedPriceBreakdown?: Array<{
      /** Currency type */
      currencyType: string;
      /** Price currency */
      priceCurrency: string;
      /** Breakdown details */
      breakdown: Array<{
        /** Breakdown name */
        name: string;
        /** Service code */
        serviceCode?: string;
        /** Local service code */
        localServiceCode?: string;
        /** Type code */
        typeCode?: string;
        /** Service type code */
        serviceTypeCode?: string;
        /** Price */
        price?: number;
        /** Price currency */
        priceCurrency?: string;
        /** Customer agreement indicator */
        isCustomerAgreement?: boolean;
        /** Marketed service indicator */
        isMarketedService?: boolean;
        /** Billing service indicator */
        isBillingServiceIndicator?: boolean;
        /** Price breakdown details */
        priceBreakdown?: Array<{
          /** Price type */
          priceType: string;
          /** Type code */
          typeCode: string;
          /** Price amount */
          price: number;
          /** Rate percentage */
          rate?: number;
          /** Base price */
          basePrice?: number;
        }>;
        /** Tariff rate formula */
        tariffRateFormula?: string;
      }>;
    }>;
    /** Mutually exclusive service groups */
    serviceCodeMutuallyExclusiveGroups?: Array<{
      /** Group name */
      serviceCodeRuleName: string;
      /** Group description */
      description: string;
      /** Service codes in the group */
      serviceCodes: Array<{
        /** Service code */
        serviceCode: string;
      }>;
    }>;
    /** Service code dependency rules */
    serviceCodeDependencyRuleGroups?: Array<{
      /** Dependency rule name */
      serviceCodeRuleName: string;
      /** Rule description */
      description: string;
      /** Dependent service codes */
      dependentServiceCodes: Array<{
        /** Service code */
        serviceCode: string;
        /** Dependency type */
        dependencyTypeCode: string;
      }>;
      /** Required service codes */
      requiredServiceCodes: Array<{
        /** Service code */
        serviceCode: string;
      }>;
    }>;
  }>;
  /** Exchange rates */
  exchangeRates?: Array<{
    /** From currency */
    fromCurrency: string;
    /** To currency */
    toCurrency: string;
    /** Exchange rate */
    rate: number;
  }>;
}

/**
 * DHL Express Create Pickup Request
 */
export interface ExpressCreatePickupRequest {
  /** Planned pickup date and time */
  plannedPickupDateAndTime: string;
  /** Close time (HH:MM) */
  closeTime: string;
  /** Location description */
  location: string;
  /** Special pickup instructions */
  specialInstructions?: Array<{
    /** Instruction value */
    value: string;
    /** Instruction type code */
    typeCode?: string;
  }>;
  /** Shipper details */
  shipperDetails: {
    /** Postal address */
    postalAddress: ExpressAddress;
    /** Contact information */
    contactInformation: ExpressContact;
    /** Registration numbers */
    registrationNumbers?: ExpressRegistrationNumber[];
    /** Bank details */
    bankDetails?: ExpressBankDetails[];
    /** Business party type */
    typeCode?: 'business' | 'direct_consumer' | 'government' | 'other' | 'private' | 'reseller';
  };
  /** Accounts */
  accounts: ExpressAccount[];
  /** Requestor details */
  requestorDetails?: {
    /** Postal address */
    postalAddress: ExpressAddress;
    /** Contact information */
    contactInformation: ExpressContact;
    /** Registration numbers */
    registrationNumbers?: ExpressRegistrationNumber[];
    /** Bank details */
    bankDetails?: ExpressBankDetails[];
    /** Business party type */
    typeCode?: 'business' | 'direct_consumer' | 'government' | 'other' | 'private' | 'reseller';
  };
  /** Shipment details */
  shipmentDetails?: Array<{
    /** Product code */
    productCode: string;
    /** Local product code */
    localProductCode?: string;
    /** Accounts */
    accounts?: ExpressAccount[];
    /** Value added services */
    valueAddedServices?: ExpressValueAddedService[];
    /** Customer references */
    customerReferences?: ExpressReference[];
    /** Content */
    content?: ExpressContent;
    /** Shipper details */
    shipper?: {
      postalAddress?: ExpressAddress;
      contactInformation?: ExpressContact;
      registrationNumbers?: ExpressRegistrationNumber[];
      bankDetails?: ExpressBankDetails[];
      typeCode?: string;
    };
    /** Receiver details */
    receiver?: {
      postalAddress?: ExpressAddress;
      contactInformation?: ExpressContact;
      registrationNumbers?: ExpressRegistrationNumber[];
      bankDetails?: ExpressBankDetails[];
      typeCode?: string;
    };
    /** Pickup details */
    pickupDetails?: {
      postalAddress?: ExpressAddress;
      contactInformation?: ExpressContact;
      registrationNumbers?: ExpressRegistrationNumber[];
      bankDetails?: ExpressBankDetails[];
      typeCode?: string;
    };
  }>;
}

/**
 * DHL Express Create Pickup Response
 */
export interface ExpressCreatePickupResponse {
  /** Dispatch confirmation number */
  dispatchConfirmationNumber: string;
  /** Ready by time */
  readyByTime?: string;
  /** Next pickup date */
  nextPickupDate?: string;
  /** Warnings */
  warnings?: string[];
}

/**
 * DHL Express Update Pickup Request
 */
export interface ExpressUpdatePickupRequest {
  /** Original shipper account number */
  originalShipperAccountNumber: string;
  /** Planned pickup date and time */
  plannedPickupDateAndTime: string;
  /** Close time */
  closeTime: string;
  /** Location */
  location?: string;
  /** Special instructions */
  specialInstructions?: Array<{
    /** Instruction value */
    value: string;
    /** Instruction type code */
    typeCode?: string;
  }>;
  /** Shipper details */
  shipperDetails?: {
    /** Postal address */
    postalAddress: ExpressAddress;
    /** Contact information */
    contactInformation: ExpressContact;
    /** Registration numbers */
    registrationNumbers?: ExpressRegistrationNumber[];
    /** Bank details */
    bankDetails?: ExpressBankDetails[];
    /** Business party type */
    typeCode?: 'business' | 'direct_consumer' | 'government' | 'other' | 'private' | 'reseller';
  };
  /** Accounts */
  accounts?: ExpressAccount[];
  /** Requestor details */
  requestorDetails?: {
    /** Postal address */
    postalAddress: ExpressAddress;
    /** Contact information */
    contactInformation: ExpressContact;
    /** Registration numbers */
    registrationNumbers?: ExpressRegistrationNumber[];
    /** Bank details */
    bankDetails?: ExpressBankDetails[];
    /** Business party type */
    typeCode?: 'business' | 'direct_consumer' | 'government' | 'other' | 'private' | 'reseller';
  };
  /** Shipment details */
  shipmentDetails?: Array<{
    /** Product code */
    productCode: string;
    /** Local product code */
    localProductCode?: string;
    /** Accounts */
    accounts?: ExpressAccount[];
    /** Value added services */
    valueAddedServices?: ExpressValueAddedService[];
    /** Customer references */
    customerReferences?: ExpressReference[];
    /** Content */
    content?: ExpressContent;
    /** Shipper details */
    shipper?: {
      postalAddress?: ExpressAddress;
      contactInformation?: ExpressContact;
      registrationNumbers?: ExpressRegistrationNumber[];
      bankDetails?: ExpressBankDetails[];
      typeCode?: string;
    };
    /** Receiver details */
    receiver?: {
      postalAddress?: ExpressAddress;
      contactInformation?: ExpressContact;
      registrationNumbers?: ExpressRegistrationNumber[];
      bankDetails?: ExpressBankDetails[];
      typeCode?: string;
    };
    /** Pickup details */
    pickupDetails?: {
      postalAddress?: ExpressAddress;
      contactInformation?: ExpressContact;
      registrationNumbers?: ExpressRegistrationNumber[];
      bankDetails?: ExpressBankDetails[];
      typeCode?: string;
    };
  }>;
}

/**
 * DHL Express Update Pickup Response
 */
export interface ExpressUpdatePickupResponse {
  /** Dispatch confirmation number */
  dispatchConfirmationNumber: string;
  /** Ready by time */
  readyByTime?: string;
  /** Next pickup date */
  nextPickupDate?: string;
  /** Warnings */
  warnings?: string[];
}

/**
 * DHL Express Allocate Identifiers Request
 */
export interface ExpressAllocateIdentifiersRequest {
  /** Shipper account number */
  shipperAccountNumber: string;
  /** Number of identifiers to allocate */
  numberOfIdentifiers: number;
  /** Identifier type */
  identifierType?: 'tracking_number' | 'piece_id' | 'shipment_reference';
  /** Service type code */
  serviceTypeCode?: string;
  /** Origin country code */
  originCountryCode?: string;
  /** Destination country code */
  destinationCountryCode?: string;
}

/**
 * DHL Express Allocate Identifiers Response
 */
export interface ExpressAllocateIdentifiersResponse {
  /** Status */
  status: 'success' | 'error';
  /** Message */
  message?: string;
  /** Allocated identifiers */
  identifiers?: Array<{
    /** Identifier type */
    type: string;
    /** Identifier value */
    value: string;
    /** Expiration date */
    expirationDate?: string;
  }>;
  /** Warnings */
  warnings?: string[];
}

/**
 * DHL Express Upload Image Request
 */
export interface ExpressUploadImageRequest {
  /** Shipment tracking number */
  shipmentTrackingNumber: string;
  /** Shipper account number */
  shipperAccountNumber: string;
  /** Document images */
  documentImages: Array<{
    /** Document type */
    documentType: 'commercial_invoice' | 'packing_list' | 'certificate_of_origin' | 'other';
    /** Image format */
    imageFormat: 'PDF' | 'PNG' | 'JPG' | 'JPEG';
    /** Content type */
    contentType: string;
    /** Image data (base64 encoded) */
    image: string;
    /** File name */
    fileName?: string;
  }>;
}

/**
 * DHL Express Upload Image Response
 */
export interface ExpressUploadImageResponse {
  /** Status */
  status: 'success' | 'error';
  /** Message */
  message?: string;
  /** Document IDs */
  documentIds?: string[];
  /** Warnings */
  warnings?: string[];
}

/**
 * DHL Express Upload Invoice Data Request
 */
export interface ExpressUploadInvoiceDataRequest {
  /** Shipment tracking number */
  shipmentTrackingNumber: string;
  /** Shipper account number */
  shipperAccountNumber: string;
  /** Invoice data */
  invoice: {
    /** Invoice number */
    number: string;
    /** Invoice date */
    date: string;
    /** Invoice type */
    type?: 'commercial_invoice' | 'proforma_invoice' | 'customs_declaration';
    /** Currency code */
    currency?: string;
    /** Invoice amount */
    amount?: number;
    /** Shipper details */
    shipperDetails?: {
      /** Postal address */
      postalAddress: ExpressAddress;
      /** Contact information */
      contactInformation: ExpressContact;
      /** Registration numbers */
      registrationNumbers?: ExpressRegistrationNumber[];
      /** Bank details */
      bankDetails?: ExpressBankDetails[];
      /** Business party type */
      typeCode?: 'business' | 'direct_consumer' | 'government' | 'other' | 'private' | 'reseller';
    };
    /** Receiver details */
    receiverDetails?: {
      /** Postal address */
      postalAddress: ExpressAddress;
      /** Contact information */
      contactInformation: ExpressContact;
      /** Registration numbers */
      registrationNumbers?: ExpressRegistrationNumber[];
      /** Bank details */
      bankDetails?: ExpressBankDetails[];
      /** Business party type */
      typeCode?: 'business' | 'direct_consumer' | 'government' | 'other' | 'private' | 'reseller';
    };
    /** Invoice items */
    items?: Array<{
      /** Item number */
      number: number;
      /** Description */
      description: string;
      /** Quantity */
      quantity: number;
      /** Unit price */
      unitPrice: number;
      /** Total price */
      totalPrice: number;
      /** Weight */
      weight?: {
        /** Weight value */
        value: number;
        /** Weight unit */
        unit: 'KG' | 'LB';
      };
      /** HS code */
      hsCode?: string;
      /** Country of origin */
      countryOfOrigin?: string;
    }>;
  };
}

/**
 * DHL Express Upload Invoice Data Response
 */
export interface ExpressUploadInvoiceDataResponse {
  /** Status */
  status: 'success' | 'error';
  /** Message */
  message?: string;
  /** Invoice number */
  invoiceNumber?: string;
  /** Warnings */
  warnings?: string[];
}

/**
 * DHL Express Add Piece Request
 */
export interface ExpressAddPieceRequest {
  /** Shipment tracking number */
  shipmentTrackingNumber: string;
  /** Shipper account number */
  shipperAccountNumber: string;
  /** Piece details */
  pieceDetails: {
    /** Piece tracking number */
    trackingNumber?: string;
    /** Piece description */
    description?: string;
    /** Weight */
    weight: {
      /** Weight value */
      value: number;
      /** Weight unit */
      unit: 'KG' | 'LB';
    };
    /** Dimensions */
    dimensions?: {
      /** Length */
      length: number;
      /** Width */
      width: number;
      /** Height */
      height: number;
      /** Unit */
      unit: 'CM' | 'IN';
    };
    /** Piece ID */
    pieceID?: string;
    /** Package type code */
    packageTypeCode?: string;
    /** Dangerous goods */
    dangerousGoods?: ExpressDangerousGoods;
    /** References */
    references?: ExpressReference[];
  };
}

/**
 * DHL Express Add Piece Response
 */
export interface ExpressAddPieceResponse {
  /** Status */
  status: 'success' | 'error';
  /** Message */
  message?: string;
  /** Piece tracking number */
  pieceTrackingNumber?: string;
  /** Warnings */
  warnings?: string[];
}

/**
 * DHL Express Early Shipment Screening Request
 */
export interface ExpressEarlyShipmentScreeningRequest {
  /** Shipper account number */
  shipperAccountNumber: string;
  /** Origin country code */
  originCountryCode: string;
  /** Destination country code */
  destinationCountryCode: string;
  /** Shipment details */
  shipmentDetails: {
    /** Product code */
    productCode: string;
    /** Local product code */
    localProductCode?: string;
    /** Accounts */
    accounts?: ExpressAccount[];
    /** Value added services */
    valueAddedServices?: ExpressValueAddedService[];
    /** Customer references */
    customerReferences?: ExpressReference[];
    /** Content */
    content?: ExpressContent;
    /** Shipper details */
    shipper?: {
      postalAddress?: ExpressAddress;
      contactInformation?: ExpressContact;
      registrationNumbers?: ExpressRegistrationNumber[];
      bankDetails?: ExpressBankDetails[];
      typeCode?: string;
    };
    /** Receiver details */
    receiver?: {
      postalAddress?: ExpressAddress;
      contactInformation?: ExpressContact;
      registrationNumbers?: ExpressRegistrationNumber[];
      bankDetails?: ExpressBankDetails[];
      typeCode?: string;
    };
    /** Customs declaration */
    customsDeclaration?: ExpressCustomsDeclaration;
    /** Export declaration */
    exportDeclaration?: ExpressExportDeclaration;
    /** Dangerous goods */
    dangerousGoods?: ExpressDangerousGoods[];
  };
}

/**
 * DHL Express Early Shipment Screening Response
 */
export interface ExpressEarlyShipmentScreeningResponse {
  /** Status */
  status: 'success' | 'error';
  /** Message */
  message?: string;
  /** Screening results */
  screeningResults?: {
    /** Customs clearance required */
    customsClearanceRequired: boolean;
    /** Export license required */
    exportLicenseRequired: boolean;
    /** Import license required */
    importLicenseRequired: boolean;
    /** Prohibited items */
    prohibitedItems?: string[];
    /** Restricted items */
    restrictedItems?: string[];
    /** Additional requirements */
    additionalRequirements?: string[];
  };
  /** Warnings */
  warnings?: string[];
}

/**
 * DHL Express Tracking Options
 */
export interface ExpressTrackingOptions {
  /** Tracking view type */
  trackingView?: 'all_checkpoints' | 'last_checkpoint';
  /** Level of detail */
  levelOfDetail?: 'shipments' | 'pieces' | 'all';
  /** Shipper account number */
  shipperAccountNumber?: string;
}

/**
 * DHL Express Proof of Delivery Response
 */
export interface ExpressProofOfDeliveryResponse {
  /** Shipment tracking number */
  shipmentTrackingNumber: string;
  /** Status */
  status: 'success' | 'error';
  /** Message */
  message?: string;
  /** Proof of delivery details */
  proofOfDelivery?: {
    /** Delivery date */
    deliveryDate: string;
    /** Delivery time */
    deliveryTime?: string;
    /** Recipient name */
    recipientName?: string;
    /** Recipient signature */
    recipientSignature?: string;
    /** Service area */
    serviceArea?: {
      /** Service area code */
      code: string;
      /** Service area description */
      description: string;
    };
    /** Delivery location */
    deliveryLocation?: string;
    /** Delivery notes */
    deliveryNotes?: string[];
    /** Image available */
    imageAvailable: boolean;
  };
  /** Warnings */
  warnings?: string[];
}

/**
 * DHL Express Reference Data Response
 */
export interface ExpressReferenceDataResponse {
  /** Status */
  status: 'success' | 'error';
  /** Message */
  message?: string;
  /** Reference data */
  referenceData?: {
    /** Countries */
    countries?: Array<{
      /** Country code */
      code: string;
      /** Country name */
      name: string;
      /** Divisions */
      divisions?: Array<{
        /** Division code */
        code: string;
        /** Division name */
        name: string;
      }>;
    }>;
    /** Products */
    products?: Array<{
      /** Product code */
      code: string;
      /** Product name */
      name: string;
      /** Local product code */
      localProductCode?: string;
      /** Network type code */
      networkTypeCode?: string;
    }>;
    /** Service areas */
    serviceAreas?: Array<{
      /** Service area code */
      code: string;
      /** Service area description */
      description: string;
      /** Facility code */
      facilityCode?: string;
    }>;
    /** Package types */
    packageTypes?: Array<{
      /** Package type code */
      code: string;
      /** Package type name */
      name: string;
    }>;
    /** Value added services */
    valueAddedServices?: Array<{
      /** Service code */
      code: string;
      /** Service name */
      name: string;
      /** Service type code */
      serviceTypeCode?: string;
    }>;
  };
  /** Warnings */
  warnings?: string[];
}

/**
 * DHL Express Get Image Response
 */
export interface ExpressGetImageResponse {
  /** Shipment tracking number */
  shipmentTrackingNumber: string;
  /** Status */
  status: 'success' | 'error';
  /** Message */
  message?: string;
  /** Images */
  images?: Array<{
    /** Document type */
    documentType: string;
    /** Image format */
    imageFormat: 'PDF' | 'PNG' | 'JPG' | 'JPEG';
    /** Content type */
    contentType: string;
    /** Image data (base64 encoded) */
    image: string;
    /** File name */
    fileName?: string;
  }>;
  /** Warnings */
  warnings?: string[];
}

/**
 * Query parameters for MyDHL Express get image.
 */
export interface ExpressGetImageOptions {
  shipperAccountNumber?: string;
  typeCode?: string[];
  pickupYearAndMonth?: string;
  encodingFormat?: string;
  allInOnePDF?: boolean;
  compressedPackage?: boolean;
}

/**
 * Query parameters for MyDHL Express track multiple shipments.
 */
export interface ExpressTrackMultipleOptions {
  shipmentReference?: string;
  shipperAccountNumber?: string;
  dateRangeFrom?: string;
  dateRangeTo?: string;
  trackingView?: string;
  levelOfDetail?: string;
}

/**
 * DHL Express Proof of Delivery Response
 */
export interface ExpressProofOfDeliveryResponse {
  /** Shipment tracking number */
  shipmentTrackingNumber: string;
  /** Status */
  status: 'success' | 'error';
  /** Message */
  message?: string;
  /** Proof of delivery details */
  proofOfDelivery?: {
    /** Delivery date */
    deliveryDate: string;
    /** Delivery time */
    deliveryTime?: string;
    /** Recipient name */
    recipientName?: string;
    /** Recipient signature */
    recipientSignature?: string;
    /** Service area */
    serviceArea?: {
      /** Service area code */
      code: string;
      /** Service area description */
      description: string;
    };
    /** Delivery location */
    deliveryLocation?: string;
    /** Delivery notes */
    deliveryNotes?: string[];
    /** Image available */
    imageAvailable: boolean;
  };
  /** Warnings */
  warnings?: string[];
}
