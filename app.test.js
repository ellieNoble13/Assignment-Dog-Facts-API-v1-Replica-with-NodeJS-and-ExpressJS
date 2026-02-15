const BASE_URL = 'http://localhost:3000/facts';

describe('Dog Facts API - Requirement Verification', () => {

    test('Returns all facts when no number is provided', async () => {
        const response = await fetch(BASE_URL);
        const data = await response.json();
        expect(response.status).toBe(200);
        expect(Array.isArray(data)).toBe(true);
    });

    test('Returns 2 facts when number is 2', async () => {
        const response = await fetch(`${BASE_URL}?number=2`);
        const data = await response.json();
        expect(data.length).toBe(2);
    });

      test('Should return string of facts', async () => {
        const response = await fetch(`${BASE_URL}?number=1`);
        const data = await response.json();
        expect(typeof data[0]).toBe('string');
    });


    test('returns 400 when non number is provided', async () => {
        const response = await fetch(`${BASE_URL}?number=banana`);
        expect(response.status).toBe(400);
    });


    test('return 400 when negitive number is provided', async () => {
        const response = await fetch(`${BASE_URL}?number=-1`);
        expect(response.status).toBe(400);
    });


    test('gracefully handle larger number of facts then availible', async () => {
        const response = await fetch(`${BASE_URL}?number=999`);
        const data = await response.json();
        expect(response.status).toBe(200);
        expect(data.length).toBeLessThan(999);
    });
});