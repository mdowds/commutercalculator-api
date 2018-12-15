import QuerySnapshot = FirebaseFirestore.QuerySnapshot;
import {Station, StationResponse} from "./types";

export function extractArray<T>(snapshot: QuerySnapshot): T[] {
    let out: T[] = [];
    snapshot.forEach(x => {
        out.push(x.data() as T);
    });
    return out;
}

export function makeStationResponse(station: Station): StationResponse {
    return {
        id: station.sid,
        name: station.name,
        postcode: station.postcode,
        zones: station.zones,
        position: {
            lat: station.location.latitude,
            lng: station.location.longitude
        }
    }
}

export function sortByProperty<T>(getProperty: (T) => any, array: T[]): T[] {
    return array.sort((a, b) => {
        if (getProperty(a) < getProperty(b)) {
            return -1;
        }
        if (getProperty(a) > getProperty(b)) {
            return 1;
        }
        return 0;
    });
}
