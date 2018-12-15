import {Firestore} from "@google-cloud/firestore";
import * as express from 'express';

const server = express();

const db = new Firestore({
    projectId: process.env.GCLOUD_PROJECT_ID,
    keyFilename: process.env.GCLOUD_KEY_FILE,
});
db.settings({timestampsInSnapshots: true});

server.get('/destinations', (req, res) => {
    console.log('Inbound GET', req.url);
    const stations = db.collection('stations');
    stations
        .where('zones', 'array-contains', 1)
        .get()
        .then(snapshot => {
            let stations = [];
            snapshot.forEach(station => {
                stations.push(station);
            });
            const output = stations
                .map(s => {
                    const station = s.data();
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
                })
                .sort((a, b) => {
                    if (a.name < b.name) {
                        return -1;
                    }
                    if (a.name > b.name) {
                        return 1;
                    }
                    return 0;
                });
            res.send(output)
        });
});

server.get('/journeys/to/:destination', (req, res) => {
    console.log('Inbound GET', req.url);
    const destination = db.collection('stations').doc(req.params.destination);
    const journeys = destination.collection('journeys');

    Promise.all([destination.get(), journeys.get()])
        .then(([destinationSnapshot, journeysSnapshot]) => {
            const destination = destinationSnapshot.data();
            let journeys = [];
            journeysSnapshot.forEach(journey => {
                console.log(journey.data());
                journeys.push(journey.data());
            });

            const results = journeys.map(journey => ({
                directionsUrl: '',
                journeyTime: journey.time,
                origin: {
                    id: journey.origin.sid,
                    name: journey.origin.name,
                    position: {
                        lat: journey.origin.location.latitude,
                        lng: journey.origin.location.longitude
                    },
                    postcode: journey.origin.postcode
                }
            }));

            const output = {
                destination: {
                    id: destination.sid,
                    name: destination.name,
                    postcode: destination.postcode,
                    position: {
                        lat: destination.location.latitude,
                        lng: destination.location.longitude
                    }
                },
                results
            };

            res.send(output);
        })
});

server.listen(5000, () => console.log('Server listening on port 5000'));
