const fetch = require('node-fetch')

let destinations;

describe('GET /destinations', () => {
    beforeAll(async () => {
        destinations = await fetch('http://localhost:5000/destinations').then(r => r.json());
    });

    it('should return at least one destination', () => {
        expect(destinations.length).toBeGreaterThan(1);
    });

    it('should just return zone 1 stations', () => {
        destinations.forEach(destination => {
            expect(destination.zones).toContain(1);
        })
    });

    it('should match snapshot', () => {
        expect(destinations).toMatchSnapshot();
    });
});