import GeoPoint = FirebaseFirestore.GeoPoint;

export interface Station {
    readonly sid: string
    readonly name: string
    readonly postcode: string
    readonly zones?: number[]
    readonly location: GeoPoint
}

export interface Journey {
    readonly origin: Station,
    time: number
}

export interface StationResponse {
    readonly id: string
    readonly name: string
    readonly postcode: string
    readonly zones?: number[]
    readonly position: {
        readonly lat: number,
        readonly lng: number
    }
}
