import Firestore = FirebaseFirestore.Firestore;
import {extractArray, makeStationResponse, sortByProperty} from "./utils";
import {Station, StationResponse} from "./types";

export default async function destinations(db: Firestore) {
    const stationsRef = db.collection('destinations');
    return await stationsRef.get()
        .then(snapshot => {
            const stationResponses = extractArray<Station>(snapshot)
                .map(makeStationResponse);

            return sortByProperty<StationResponse>(s => s.name, stationResponses)
        });
}