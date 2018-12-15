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
                directionsUrl: makeDirectionsUrl(journey.origin.name, destination.name),
                journeyTime: journey.time,
                origin: makeStationResponse(journey.origin),
                seasonTickets: {
                    travelcard: (journey.travelcard || undefined)
                }
            }));

            return {
                destination: makeStationResponse(destination),
                results
            };
        })
}

function makeDirectionsUrl(origin: string, destination: string): string {
    const baseUrl = 'https://www.google.com/maps/dir/?api=1';
    const encodedOrigin = encodeURI(origin.replace(' ', '+'));
    const encodedDestination = encodeURI(destination.replace(' ', '+'));
    return `${baseUrl}&origin=${encodedOrigin}+Station,London&destination=${encodedDestination}+Station,London&travelmode=transit`
}
