import {Firestore} from "@google-cloud/firestore";
import * as express from 'express';
import destinations from "./src/destinations";
import journeysTo from "./src/journeys";

const server = express();

const db = new Firestore({
    projectId: process.env.GCLOUD_PROJECT_ID,
    keyFilename: process.env.GCLOUD_KEY_FILE,
});
db.settings({timestampsInSnapshots: true});

server.get('/destinations', (req, res) => {
    console.log('GET', req.url);
    destinations(db).then(output => res.send(output));
});

server.get('/journeys/to/:destination', (req, res) => {
    console.log('GET', req.url);
    journeysTo(db, req.params.destination).then(output => res.send(output));
});

server.listen(5000, () => console.log('Server listening on port 5000'));
