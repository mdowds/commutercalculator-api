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
                    return {
                        id: s.data().sid,
                        name: s.data().name,
                        postcode: s.data().postcode,
                        position: {
                            lat: s.data().location.latitude,
                            lng: s.data().location.longitude
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

server.listen(5000, () => console.log('Server listening on port 5000'));
