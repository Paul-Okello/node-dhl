openapi: 3.0.1
info:
  title: DGF Shipment Tracking API v2.0
  description: >-
    Shipment Tracking API v2.0 allows developer to request for shipment's
    information.
  version: 1.0.2
servers:
  - url: https://api.dhl.com/dgff/transportation/v2
    description: Production server
  - url: https://api-sandbox.dhl.com/dgff/transportation/v2
    description: Test server
security:
  - apiKey: []
paths:
  /shipment-tracking:
    get:
      summary: >-
        GET shipment tracking details using customer reference, housebill, and
        shipmentID
      description: >-
        GET shipment tracking returns detailed shipment information, routing
        details and the history of timestamps, as well as masterbill and
        exception information for registered users.
      operationId: ShipmentTracking_GET
      parameters:
        - name: search-type
          in: query
          description: Specifiy one of the supported search-types
          required: true
          schema:
            type: string
            enum:
              - housebill
              - shipmentID
              - externalBookingID
              - shipperReference
              - consigneeReference
              - fileReference
              - masterbill
              - containerNumber
        - name: value
          in: query
          description: Search string
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Successful
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ShipmentTracking_GET_response'
        '401':
          description: Access Denied
          content: {}
        '404':
          description: Shipment Not Found
          content: {}
        '500':
          description: Internal Server Error
          content: {}
  /shipment-list:
    post:
      summary: >-
        POST shipment lists the existing shipments based on the filters
        shipmentID, housebill, customerReference, masterbill, and
        container-number.
      description: Shipment List returns a list of shipments and their references.
      operationId: ShipmentList_POST
      requestBody:
        content:
          'application/json':
            schema:
              $ref: '#/components/schemas/shipmentList'
        required: true
      responses:
        '200':
          description: OK
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ShipmentList_POST_response'
        '401':
          description: Access Denied
          content: {}
        '500':
          description: Internal Server Error
          content: {}
      x-codegen-request-body-name: shipmentList
components:
  schemas:
    masterbills:
      required:
        - masterbillNumber
      type: object
      properties:
        masterbillNumber:
          maxLength: 35
          type: string
          description: >-
            Masterbill Number


            [Available for Registered User only]

            Please reach out to DGF API Support (dgf.apisupport@dhl.com) to be a
            Registered User
          example: 235-16019592
        carrier:
          $ref: '#/components/schemas/carrier'
    origin:
      required:
        - locationCode
      type: object
      properties:
        airportCode:
          maxLength: 3
          type: string
          description: >-
            Origin location code in IATA or three-character DHL station code
            format.
          example: SIN
        locationCode:
          maxLength: 5
          type: string
          description: >-
            Origin location code in UNLOCODE or five-character DHL station code
            format.
          example: SGSIN
        locationName:
          maxLength: 50
          type: string
          description: Origin location name.
          example: Singapore
    portOfLoading:
      required:
        - locationCode
      type: object
      properties:
        airportCode:
          maxLength: 3
          type: string
          description: Port of loading code in IATA code format.
          example: SIN
        locationCode:
          maxLength: 5
          type: string
          description: Port of loading code in UNLOCODE code format.
          example: SGSIN
        locationName:
          maxLength: 50
          type: string
          description: Port of loading location name.
          example: Singapore
      description: This group is Applicable to OCEAN.
    PlaceOfAcceptance:
      required:
        - LocationCodeUN
        - LocationName
      type: object
      properties:
        LocationCode:
          maxLength: 3
          minLength: 3
          type: string
          description: Place of acceptance in IATA code format.
          example: SIN
        LocationCodeUN:
          maxLength: 5
          minLength: 5
          type: string
          description: Place of acceptance in UNLOCODE code format.
          example: SGSIN
        LocationName:
          maxLength: 50
          type: string
          description: Place of acceptance location name.
          example: Singapore
        CountryCode:
          type: string
          description: Place of acceptance ISO country code.
          example: SG
      description: This group is Applicable to OCEAN.
    ShipmentTracking:
      required:
        - shipment
      type: object
      properties:
        queryID:
          type: string
          description: Query ID
          example: Q317839
        queryIDType:
          type: string
          description: Query ID Type
          example: housebill
        shipment:
          $ref: '#/components/schemas/Shipment'
    transportLegs:
      type: object
      properties:
        vesselName:
          maxLength: 35
          type: string
          description: Vessel Name for Ocean. Applicable to OCEAN
          example: MAERSK SARAT
        vesselLloydsNumber:
          maxLength: 7
          type: string
          description: Lloyd's Register Number. Applicable to OCEAN
          example: '1112357'
        journeyID:
          maxLength: 10
          type: string
          description: Voyage number for Ocean. Flight Carrier and Number for Air
          example: KL 480
        modeOfTransport:
          type: string
          description: Transport mode.
          example: AIR
        legType(in testing):
          type: string
          description: 'Leg type.'
          example: MainCarriage
        portOfLoading:
          $ref: '#/components/schemas/portOfLoading'
        portOfUnloading:
          $ref: '#/components/schemas/portOfUnloading'
        estimatedDepartureDate:
          type: string
          description: Flight Estimated Date and Time of Departure.
          example: 2021-02-09T02:10:00.000Z
        estimatedArrivalDate:
          type: string
          description: Flight Estimated Date and Time of Arrival.
          example: 2021-02-09T08:30:00.000Z
        actualDepartureDate:
          type: string
          description: Flight Actual Date and Time of Departure.
          example: 2021-02-09T02:10:00.000Z
        actualArrivalDate:
          type: string
          description: Flight Actual Date and Time of Arrival.
          example: 2021-02-09T08:30:00.000Z
    transportUnits:
      required:
        - transportUnitID
      type: object
      description: This group is Applicable to OCEAN.
      properties:
        transportUnitID:
          maxLength: 20
          type: string
          description: Container ID. Only available for FCL shipments.
          example: MRKU2335007
        transportUnitType:
          maxLength: 4
          type: string
          description: >-
            Container Size/Type


            [Available for Registered User only]

            Please reach out to DGF API Support (dgf.apisupport@dhl.com) to be
            a Registered User
          example: 40GP
        sealNumbers:
          type: array
          description: >-
            Seal numbers
          
          
            [Available for Registered User only]
          
            Please reach out to DGF API Support (dgf.apisupport@dhl.com) to
            be a Registered User
          example: [40GP]
          items:
            type: object
        timestamps:
          type: array
          description: 'Container timestamp.\n\n[Available for Registered User only]\nPlease reach out to DGF API Support (dgf.apisupport@dhl.com) to be a Registered User'
          items:
            type: object
            properties:
              timestampCode:
                type: string
                description: >-
                  Status Code. 

                  Please refer to [Additional Information - Code
                  List](https://developer.dhl.com/api-reference/dgf-shipment-tracking#get-started-section/user-guide--additional-information)
                  for the Air, Ocean, Road, Rail timestamp codes
                example: EPD
              timestampDescription:
                type: string
                description: >-
                  Textual description of status. Returned from earliest to
                  latest.
                example: Estimated Delivery
              timestampDateTime:
                type: string
                description: Local Date Time.
                example: 2021-02-12T06:27:00.000Z
              locationCode:
                maxLength: 5
                type: string
                description: UNLOCODE.
                example: SGSIN
              locationName:
                maxLength: 50
                type: string
                description: Event location name.
                example: Singapore
    Shipment:
      required:
        - destination
        - housebillNumber
        - modeOfTransport
        - origin
        - phase
        - timestamps
        - totalVolume
        - totalVolumeUom
        - totalWeight
        - totalWeightUom
        - transportLegs
      type: object
      properties:
        housebillNumber:
          maxLength: 35
          type: string
          description: Housebill Number
          example: Q317839
        externalBookingID:
          maxLength: 35
          type: string
          description: >-
            Identification assigned by an external party for the booking made
            with DGF. It will only be visible when using the same reference
            number from the request parameter. The ExternalBookingID can be
            populated by mapping a reference number to the
            externalBookingID field in the shipment booking API.
          example: REF123
        phase:
          maxLength: 20
          type: string
          description: >-
            Transit Status with possible values of:
             - BookingCreated
             - Planned
             - InTransit
             - Completed
             - Cancelled

            [Available for Registered User only]

            Please reach out to DGF API Support (dgf.apisupport@dhl.com) to be a
            Registered User
          example: InTransit
        origin:
          $ref: '#/components/schemas/origin'
        destination:
          $ref: '#/components/schemas/destination'
        shipper:
          required:
            - name
          type: object
          description: "Shipper Details.\n\n[Available for Registered User only]\nPlease reach out to DGF API Support (dgf.apisupport@dhl.com) to be a Registered User"
          properties:
            accountNumber:
              type: string
              description: Shipper organization code'
              example: USGEE036
            name:
              type: string
              description: The company who is to sending the goods being transported
              example: INT'L INC
            address:
              required:
                - addressLine1
              type: object
              properties:
                addressLine1:
                  type: string
                  example: '321 Lane Street'
                addressLine2:
                  type: string
                  example: ''
                postalCode:
                  type: string
                  example: '33126'
                city:
                  type: string
                  example: MIAMI
                stateProvince:
                  type: string
                  example: FL
                countryCode:
                  type: string
                  description: >-
                    Use 'CountryCode' code list, see
                    https://api-sandbox.dhl.com/dgff/transportation/shipment-booking/codelist?codeListID=CountryCode
                  example: US
        consignee:
          required:
            - name
          type: object
          description: "Consignee Details.\n\n[Available for Registered User only]\nPlease reach out to DGF API Support (dgf.apisupport@dhl.com) to be a Registered User"
          properties:
            accountNumber:
              type: string
              description: 'Consignee organization code'
              example: USGEE036
            name:
              type: string
              description: The company who is to receive the goods being transported
              example: INT'L INC
            address:
              required:
                - addressLine1
              type: object
              properties:
                addressLine1:
                  type: string
                  example: '123 Lane Street'
                addressLine2:
                  type: string
                  example: ''
                postalCode:
                  type: string
                  example: '33126'
                city:
                  type: string
                  example: MIAMI
                stateProvince:
                  type: string
                  example: FL
                countryCode:
                  type: string
                  description: Country code.
                  example: US
        modeOfTransport:
          maxLength: 3
          type: string
          description: Transport mode.
          example: AIR
        totalPackages:
          type: string
          description: Total number of packages.
          example: '1'
        totalWeight:
          type: string
          description: Total Shipment Weight.
          example: '1'
        totalWeightUom:
          maxLength: 3
          minLength: 0
          type: string
          description: Total Shipment weight uom - default to KGM (kilograms).
          example: KGM
        totalVolume:
          type: number
          description: Total Shipment volume.
          format: double
          example: 10.5
        totalVolumeUom:
          maxLength: 3
          minLength: 0
          type: string
          description: Total Shipment volume uom - default to MTQ (cubic meters).
          example: MTQ
        totalChargeable:
          type: number
          description: >-
            Chargeable Weight.


            [Available for Registered User only]

            Please reach out to DGF API Support (dgf.apisupport@dhl.com) to be a
            Registered User
          example: 0.337
        totalChargeableUom:
          maxLength: 3
          minLength: 0
          type: string
          description: >-
            Chargeable Weight uom - default to MTQ (cubic meters).


            [Available for Registered User only]

            Please reach out to DGF API Support (dgf.apisupport@dhl.com) to be a
            Registered User
          example: MTQ
        serviceCode:
          maxLength: 50
          type: string
          description: Service code.
          example: AA3
        serviceProduct:
          maxLength: 50
          type: string
          description: Service/Product name.
          example: Full Container Load
        paymentTerms:
          type: string
          description: Payment Terms.
          example: Collect
        expressBOLFlag:
          type: boolean
          description: |-
            Applicable to Ocean

            Possible values:
            true - Express BOL
            false - Standard BOL.
          example: true
        warehouseUpdateFlag:
          type: boolean
          description: '[For future use] Warehouse update flag'
          example: false
        incoterms:
          maxLength: 3
          type: string
          description: >-
            Maintained by the International Chamber of Commerce (ICC), this
            codification of terms is used in foreign trade contracts to define
            which parties incur the costs and at what specific point the costs
            are incurred.


            [Available for Registered User only]

            Please reach out to DGF API Support (dgf.apisupport@dhl.com) to be a
            Registered User
          example: EXW
        goodsDescription:
          maxLength: 40
          type: string
          description: Description of goods.\n\n[Available for Registered User only]\nPlease reach out to DGF API Support (dgf.apisupport@dhl.com) to be a Registered User
          example: Professional Broadcast Equ
        status:
          maxLength: 20
          type: string
          description: >-
            Delayed/On Time Status with possible values of:
             - Delayed
             - OnTime

            [Available for Registered User only]

            Please reach out to DGF API Support (dgf.apisupport@dhl.com) to be a
            Registered User
          example: Delayed
        lastEvent:
          $ref: '#/components/schemas/lastEvent'
        timestamps:
          $ref: '#/components/schemas/timestamps'
        masterbills:
          type: array
          description: Masterbill details.\n\n[Available for Registered User only]\nPlease reach out to DGF API Support (dgf.apisupport@dhl.com) to be a Registered User
          items:
            $ref: '#/components/schemas/masterbills'
        transportUnits:
          type: array
          items:
            $ref: '#/components/schemas/transportUnits'
        transportLegs:
          type: array
          items:
            $ref: '#/components/schemas/transportLegs'
        exceptions:
          type: array
          items:
            $ref: '#/components/schemas/exceptions'
        references:
          type: array
          items:
            $ref: '#/components/schemas/references'
        emissions:
          $ref: '#/components/schemas/emissions'
    timestamps:
      type: array
      items:
        type: object
        properties:
          timestampCode:
            type: string
            description: >-
              Status Code. 

              Please refer to [Additional Information - Code
              List](https://developer.dhl.com/api-reference/dgf-shipment-tracking#get-started-section/user-guide--additional-information)
              for the Air, Ocean, Road, Rail timestamp codes
            example: EPD
          timestampDescription:
            type: string
            description: Textual description of status. Returned from earliest to latest.
            example: Estimated Delivery
          timestampDateTime:
            type: string
            description: Local Date Time.
            example: 2021-02-12T06:27:00.000Z
          locationCode:
            maxLength: 5
            type: string
            description: UNLOCODE.
            example: SGSIN
          locationName:
            maxLength: 50
            type: string
            description: Event location name.
            example: Singapore
          journeyID:
            maxLength: 10
            type: string
            description: |-
              Flight Carrier and Number.
              Applicable to AIR
              \n\n[Available for Registered User only]\nPlease reach out to DGF API Support (dgf.apisupport@dhl.com) to be a Registered User
            example: SG439
          signatory:
            maxLength: 50
            type: string
            description: |-
              Signatory name for POD / A32.
              \n\n[Available for Registered User only]\nPlease reach out to DGF API Support (dgf.apisupport@dhl.com) to be a Registered User
            example: HEBERT
          remarks:
            type: string
            description: Remarks
            example: test
    emissions:
      type: object
      properties:
        distance:
          required:
            - totalDistance
            - uom
          type: object
          properties:
            uom:
              type: string
              description: KMT = Kilometer
              example: KMT
            pickup:
              type: string
              example: '1791.1034353000000000000000000000000000'
            mainHaul:
              type: string
              example: '1791.1034353000000000000000000000000000'
            delivery:
              type: string
              example: '1791.1034353000000000000000000000000000'
            totalDistance:
              type: string
              example: '1791.1034353000000000000000000000000000'
          description: Distance
        primaryEnergy:
          required:
            - totalWellToWheel
            - uom
          type: object
          properties:
            uom:
              type: string
              description: 3B = Megajoule
              example: 3B
            totalTankToWheel:
              type: string
              example: '1.2424318200000000000000000000000000'
            totalWellToWheel:
              type: string
              example: '22235.3010454000000000000000000000000000'
          description: Energy Consumption
        carbonDioxideEquivalents:
          required:
            - totalTankToWheel
            - totalWellToWheel
            - uom
          type: object
          properties:
            uom:
              type: string
              description: TNE = Metric ton
              example: TNE
            pickupTankToWheel:
              type: string
              example: '1.2424318200000000000000000000000000'
            pickupWellToWheel:
              type: string
              example: '1.2424318200000000000000000000000000'
            mainHaulTankToWheel:
              type: string
              example: '1.2424304900000000000000000000000000'
            mainHaulWellToWheel:
              type: string
              example: '1.4630474000000000000000000000000000'
            deliveryTankToWheel:
              type: string
              example: '1.2424318200000000000000000000000000'
            deliveryWellToWheel:
              type: string
              example: '1.2424318200000000000000000000000000'
            stationHandlingTankToWheel:
              type: string
              example: '0.0000013300000000000000000000000000'
            stationHandlingWellToWheel:
              type: string
              example: '0.0000015600000000000000000000000000'
            totalTankToWheel:
              type: string
              example: '1.2424318200000000000000000000000000'
            totalWellToWheel:
              type: string
              example: '1.4630489600000000000000000000000000'
          description: Greenhouse Gases
        nitrogenOxides:
          required:
            - totalWellToWheel
            - uom
          type: object
          properties:
            uom:
              type: string
              description: KGM = Kilogram
              example: KGM
            totalTankToWheel:
              type: string
              example: '1.2424318200000000000000000000000000'
            totalWellToWheel:
              type: string
              example: '14.2912173100000000000000000000000000'
          description: Pollutants - Nitrogen Oxides
        sulfurDioxides:
          required:
            - totalWellToWheel
            - uom
          type: object
          properties:
            uom:
              type: string
              description: KGM = Kilogram
              example: KGM
            totalTankToWheel:
              type: string
              example: '1.2424318200000000000000000000000000'
            totalWellToWheel:
              type: string
              example: '5.4648157400000000000000000000000000'
          description: Pollutants - Sulphur Dioxide
        nonMethaneHydrocarbons:
          required:
            - totalWellToWheel
            - uom
          type: object
          properties:
            uom:
              type: string
              description: KGM = Kilogram
              example: KGM
            totalTankToWheel:
              type: string
              example: '1.2424318200000000000000000000000000'
            totalWellToWheel:
              type: string
              example: '0.8331592700000000000000000000000000'
          description: Pollutants - Non-methane Hydrocarbons
        particles:
          required:
            - totalWellToWheel
            - uom
          type: object
          properties:
            uom:
              type: string
              description: KGM = Kilogram
              example: KGM
            totalTankToWheel:
              type: string
              example: '1.2424318200000000000000000000000000'
            totalWellToWheel:
              type: string
              example: '0.3119766900000000000000000000000000'
          description: Pollutants - Particulate Matter
    PlaceOfDelivery:
      required:
        - LocationCodeUN
        - LocationName
      type: object
      properties:
        LocationCode:
          maxLength: 3
          minLength: 3
          type: string
          description: Place of delivery in IATA code format.
          example: LAX
        LocationCodeUN:
          maxLength: 5
          minLength: 5
          type: string
          description: Place of delivery in UNLOCODE code format.
          example: USLAX
        LocationName:
          maxLength: 50
          type: string
          description: Place of delivery location name.
          example: Los Angeles
        CountryCode:
          type: string
          description: Place of delivery ISO country code.
          example: US
      description: This group is Applicable to OCEAN.
    lastEvent:
      type: object
      properties:
        timestampCode:
          type: string
          description: >-
            Status Code. 

            Please refer to [Additional Information - Code
            List](https://developer.dhl.com/api-reference/dgf-shipment-tracking#get-started-section/user-guide--additional-information)
            for the Air, Ocean, Road, Rail timestamp codes. If milestones are
            not included in the code list, then the TimestampCode will not be
            available.
          example: DEP
        timestampDescription:
          type: string
          description: Last Known Event Description.
          example: Departure
        timestampDateTime:
          type: string
          description: Last Known Event Date/Time.
          example: 2021-02-10T17:32+08:00
        locationCode:
          maxLength: 60
          minLength: 5
          type: string
          description: Last Known Event Location Code.
          example: Singapore
        locationName:
          maxLength: 50
          type: string
          description: Last Known Event Location name.
          example: Singapore
    exceptions:
      type: object
      properties:
        exceptionCode:
          type: string
          description: >-
            Exception type.


            [Available for Registered User only]

            Please reach out to DGF API Support (dgf.apisupport@dhl.com) to be a
            Registered User
          example: DLD
        exceptionDescription:
          type: string
          description: >-
            Exception type.


            [Available for Registered User only]

            Please reach out to DGF API Support (dgf.apisupport@dhl.com) to be a
            Registered User
          example: 03-Delivery Delay
        exceptionType:
          type: string
          description: >-
            Exception type.


            [Available for Registered User only]

            Please reach out to DGF API Support (dgf.apisupport@dhl.com) to be a
            Registered User
          example: Transport Deviation
        exceptionDateTime:
          type: string
          description: >-
            Exception timestamp.


            [Available for Registered User only]

            Please reach out to DGF API Support (dgf.apisupport@dhl.com) to be a
            Registered User
          example: 2023-06-01T22:51:00.000Z
        closureDateTime:
          type: string
          description: >-
            Exception closure timestamp.


            [Available for Registered User only]

            Please reach out to DGF API Support (dgf.apisupport@dhl.com) to be a
            Registered User
          example: 2023-06-02T20:00:00.000Z
        remarks:
          type: string
          description: >-
            Exception remarks.


            [Available for Registered User only]

            Please reach out to DGF API Support (dgf.apisupport@dhl.com) to be a
            Registered User
          example: NOT MOVED AS BOOKED
        responsibleParty:
          type: string
          description: >-
            Responsible Party for this exception.


            [Available for Registered User only]

            Please reach out to DGF API Support (dgf.apisupport@dhl.com) to be a
            Registered User
          example: Due Airline
    references:
      required:
        - number
        - type
      type: object
      properties:
        type:
          type: string
          description: >-
            Reference type.


            [Available for Registered User only]

            Please reach out to DGF API Support (dgf.apisupport@dhl.com) to be a
            Registered User
          example: SRN
        number:
          type: string
          description: >-
            Reference number.


            [Available for Registered User only]

            Please reach out to DGF API Support (dgf.apisupport@dhl.com) to be a
            Registered User
          example: Test123
    portOfUnloading:
      required:
        - locationCode
      type: object
      properties:
        airportCode:
          maxLength: 3
          minLength: 3
          type: string
          description: Port of unloading in IATA code format.
          example: LAX
        locationCode:
          maxLength: 5
          minLength: 5
          type: string
          description: Port of unloading in UNLOCODE code format.
          example: USLAX
        locationName:
          maxLength: 50
          type: string
          description: Port of unloading location name.
          example: Los Angeles
      description: This group is Applicable to OCEAN.
    ShipmentTracking_GET_response:
      required:
        - shipmentTracking
      type: object
      properties:
        shipmentTracking:
          $ref: '#/components/schemas/ShipmentTracking'
    destination:
      required:
        - locationCode
      type: object
      properties:
        airportCode:
          maxLength: 3
          type: string
          description: >-
            Destination location code in IATA or three-character DHL station
            code format.
          example: LAX
        locationCode:
          maxLength: 5
          type: string
          description: >-
            Destination location code in UNLOCODE or five-character DHL station
            code format.
          example: USLAX
        locationName:
          maxLength: 50
          type: string
          description: Destination location name.
          example: Los Angeles
    carrier:
      required:
        - name
      type: object
      properties:
        name:
          maxLength: 200
          type: string
          description: >-
            Name of firm that provides transportation services.


            [Available for Registered User only]

            Please reach out to DGF API Support (dgf.apisupport@dhl.com) to be a
            Registered User
          example: ATLANTIC CONTAINER LINE
        standardCarrierCode:
          maxLength: 4
          type: string
          description: >-
            Carrier SCAC code.


            [Available for Registered User only]

            Please reach out to DGF API Support (dgf.apisupport@dhl.com) to be a
            Registered User
          example: ACLU
        bookingReference:
          maxLength: 20
          type: string
          description: >-
            Carrier booking reference.


            [Available for Registered User only]

            Please reach out to DGF API Support (dgf.apisupport@dhl.com) to be a
            Registered User
          example: BBB-VAA 08JAN202
    shipmentList:
      type: object
      properties:
        shipmentID:
          type: object
          properties:
            operator:
              type: string
              description: ''
              example: OR
            values:
              type: array
              description: Textual description of status. Returned from earliest to latest.
              example:
                - string
              items:
                type: string
        housebill:
          type: object
          properties:
            operator:
              type: string
              description: ''
              example: OR
            values:
              type: array
              description: Textual description of status. Returned from earliest to latest.
              example:
                - string
              items:
                type: string
        externalBookingID:
          type: object
          properties:
            operator:
              type: string
              description: ''
              example: OR
            values:
              type: array
              description: Textual description of status. Returned from earliest to latest.
              example:
                - string
              items:
                type: string
        shipperReference:
          type: object
          properties:
            operator:
              type: string
              description: ''
              example: OR
            values:
              type: array
              description: Textual description of status. Returned from earliest to latest.
              example:
                - string
              items:
                type: string
        consigneeReference:
          type: object
          properties:
            operator:
              type: string
              description: ''
              example: OR
            values:
              type: array
              description: Textual description of status. Returned from earliest to latest.
              example:
                - string
              items:
                type: string
        fileReference:
          type: object
          properties:
            operator:
              type: string
              description: ''
              example: OR
            values:
              type: array
              description: Textual description of status. Returned from earliest to latest.
              example:
                - string
              items:
                type: string
        masterbill:
          type: object
          properties:
            operator:
              type: string
              description: ''
              example: OR
            values:
              type: array
              description: Textual description of status. Returned from earliest to latest.
              example:
                - string
              items:
                type: string
        container-number:
          type: object
          properties:
            operator:
              type: string
              description: ''
              example: OR
            values:
              type: array
              description: Textual description of status. Returned from earliest to latest.
              example:
                - string
              items:
                type: string
        lastUpdateFrom:
          type: string
          description: Last Update From Date Time. This is a mandatory for public users.
          example: 2024-07-30T07:49:35.551Z
        lastUpdateTo:
          type: string
          description: Last Update To Date Time. This is a mandatory for public users.
          example: 2024-08-05T07:49:35.551Z
        size:
          type: number
          description: Size
          example: 10
        skipResults:
          type: number
          description: Skip results
          example: 0
    ShipmentList_POST_response:
      type: object
      properties:
        shipments:
          type: array
          items:
            type: object
            properties:
              shipmentID:
                type: string
                example: S2400127053
              housebill:
                type: string
                example: X00016084
              phase:
                type: string
                example: Planned
              shipmentTrackingURL:
                type: string
                example: >-
                  https://api-uat.dhl.com/dgff/transportation/v2/shipment-tracking?shipmentID=S2400127053
    ShipmentStatus_GET_response:
      required:
        - ShipmentStatus
      type: object
      properties:
        ShipmentStatus:
          required:
            - MessageHeader
            - Shipment
          type: object
          properties:
            MessageHeader:
              required:
                - CreationDateTime
                - MessageID
                - Version
              type: object
              properties:
                ReceiverID:
                  type: string
                CreationDateTime:
                  type: string
                Version:
                  type: string
                SenderID:
                  type: string
                MessageID:
                  type: string
            Shipment:
              required:
                - Destination
                - HousebillNumber
                - Origin
                - ProductType
                - Timestamp
              type: object
              properties:
                Origin:
                  $ref: '#/components/schemas/Origin'
                Destination:
                  $ref: '#/components/schemas/Destination'
                TotalWeight:
                  $ref: '#/components/schemas/TotalWeight'
                TotalPackages:
                  type: string
                  description: Total number of packages.
                  example: '1'
                HousebillNumber:
                  maxLength: 35
                  type: string
                  description: Housebill Number
                  example: Q317839
                HouseFileNumber:
                  maxLength: 35
                  type: string
                  description: >-
                    Internal Housebill Number. Applicable to Air where
                    HousebillNumber format is XXX-XX-9999999.
                  example: Z997710
                ProductType:
                  maxLength: 10
                  type: string
                  description: |-
                    Product Type with possible values of:
                     - AIR
                     - OCEAN (includes ROAD)
                     - USDOMESTIC
                  example: AIR
                TotalVolume:
                  $ref: '#/components/schemas/TotalVolume'
                Timestamp:
                  $ref: '#/components/schemas/Timestamp'
    Origin:
      type: object
      properties:
        airportCode:
          maxLength: 3
          type: string
          description: Airport Code
          example: SIN
        locationCode:
          maxLength: 5
          type: string
          description: >-
            Origin location code in IATA or three-character DHL station code
            format.
          example: SIN
        locationName:
          maxLength: 50
          type: string
          description: Origin location name.
          example: Singapore
    TotalVolume:
      required:
        - '@uom'
      type: object
      properties:
        '*body':
          type: string
          description: Total Shipment volume.
          example: '0.337'
        '@uom':
          maxLength: 3
          minLength: 1
          type: string
          description: Total Shipment volume uom - default to MTQ (cubic meters).
          example: MTQ
    Timestamp:
      required:
        - TimestampDateTime
        - TimestampDescription
      type: object
      properties:
        TimestampCode:
          type: string
        TimestampDateTime:
          type: string
        TimestampText:
          type: string
        TimestampDescription:
          type: string
    TotalWeight:
      required:
        - '@uom'
      type: object
      properties:
        '*body':
          type: string
          description: Total Shipment weight.
          example: '85.0'
        '@uom':
          maxLength: 3
          minLength: 1
          type: string
          description: Total Shipment weight uom - default to KGM (kilograms).
          example: KGM
    Destination:
      type: object
      properties:
        LocationCode:
          maxLength: 3
          minLength: 3
          type: string
          description: >-
            Destination location code in IATA or three-character DHL station
            code format.
          example: LAX
        LocationCodeUN:
          maxLength: 5
          minLength: 5
          type: string
          description: >-
            Destination location code in UNLOCODE or five-character DHL station
            code format.
          example: USLAX
        LocationName:
          maxLength: 50
          type: string
          description: Destination location name.
          example: Los Angeles
        CountryCode:
          type: string
          description: Destination ISO country code.
          example: US
  securitySchemes:
    apiKey:
      type: apiKey
      name: DHL-API-Key
      in: header
x-original-swagger-version: '2.0'