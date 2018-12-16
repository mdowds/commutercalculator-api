import {Firestore} from "@google-cloud/firestore";
import * as express from 'express';
import destinations from "./src/destinations";
import journeysTo from "./src/journeys";

const server = express();
const port = process.env.PORT || 5000;

const db = new Firestore({
    projectId: process.env.GCLOUD_PROJECT_ID,
    timestampsInSnapshots: true
});
if (process.env.GCLOUD_KEY_FILE) db.settings({keyFilename: process.env.GCLOUD_KEY_FILE});
if (process.env.GCLOUD_PROJECT_ID && process.env.GCLOUD_SA_KEY) db.settings({
    credentials: {
        client_email: process.env.GCLOUD_CLIENT_EMAIL,
        private_key: JSON.parse(`"${process.env.GCLOUD_SA_KEY}"`)
    }
});

server.get('/destinations', (req, res) => {
    console.log('GET', req.url);
    destinations(db).then(output => res.send(output));
});

server.get('/journeys/to/:destination', (req, res) => {
    console.log('GET', req.url);
    journeysTo(db, req.params.destination).then(output => res.send(output));
});

server.listen(port, () => console.log(`Server listening on port ${port}`));
