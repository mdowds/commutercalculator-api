import Firestore = FirebaseFirestore.Firestore;
import {extractArray, makeStationResponse} from "./utils";
import {Journey, Station} from "./types";

export default async function journeysTo(db: Firestore, destination: string) {
    const destinationRef = db.collection('stations').doc(destination);
    const journeysRef = destinationRef.collection('journeys');

    return await Promise.all([destinationRef.get(), journeysRef.get()])
        .then(([destinationSnapshot, journeysSnapshot]) => {
            const destination = destinationSnapshot.data() as Station;
            const journeys = extractArray<Journey>(journeysSnapshot);

            const results = journeys.map(journey => ({
                directionsUrl: '',
                journeyTime: journey.time,
                origin: makeStationResponse(journey.origin)
            }));

            return {
                destination: makeStationResponse(destination),
                results
            };
        })
}