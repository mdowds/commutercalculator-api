import GeoPoint = FirebaseFirestore.GeoPoint;

export interface Station {
    readonly sid: string
    readonly name: string
    readonly postcode: string
    readonly zones: number[]
    readonly location: GeoPoint
}

export interface Travelcard {
    readonly minZone: number
    readonly maxZone: number
    readonly price: number
}

export interface Journey {
    readonly origin: Station
    readonly time: number
    readonly travelcard?: Travelcard
}

export interface StationResponse {
    readonly id: string
    readonly name: string
    readonly postcode: string
    readonly zones: number[]
    readonly position: {
        readonly lat: number
        readonly lng: number
    }
}
