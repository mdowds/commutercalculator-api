import {Firestore} from "@google-cloud/firestore";
import * as express from 'express';
import destinations from "./src/destinations";
import journeysTo from "./src/journeys";

const server = express();

const firestoreKey = JSON.parse(`"${process.env.GCLOUD_SA_KEY}"`);

const db = new Firestore({
    projectId: process.env.GCLOUD_PROJECT_ID,
    credentials: {
        client_email: process.env.GCLOUD_CLIENT_EMAIL,
        private_key: firestoreKey
    },
    timestampsInSnapshots: true
});
if (process.env.GCLOUD_KEY_FILE) db.settings({keyFilename: process.env.GCLOUD_KEY_FILE});

server.get('/destinations', (req, res) => {
    console.log('GET', req.url);
    destinations(db).then(output => res.send(output));
});

server.get('/journeys/to/:destination', (req, res) => {
    console.log('GET', req.url);
    journeysTo(db, req.params.destination).then(output => res.send(output));
});

server.listen(5000, () => console.log('Server listening on port 5000'));
