const fetch = require('node-fetch');

let journeys;

describe('GET /journeys/to', () => {
    beforeAll(async () => {
        journeys = await fetch('http://localhost:5000/journeys/to/LBG').then(r => r.json());
    });

    it('should match snapshot', () => {
        expect(journeys).toMatchSnapshot();
    });
});