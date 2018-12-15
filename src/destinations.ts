import Firestore = FirebaseFirestore.Firestore;
import {extractArray, makeStationResponse, sortByProperty} from "./utils";
import {Station, StationResponse} from "./types";

export default async function destinations(db: Firestore) {
    const stationsRef = db.collection('stations');
    return await stationsRef
        .where('zones', 'array-contains', 1)
        .get()
        .then(snapshot => {
            const stationResponses = extractArray<Station>(snapshot)
                .map(makeStationResponse);

            return sortByProperty<StationResponse>(s => s.name, stationResponses)
        });
}