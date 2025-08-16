const request = require('supertest');
const expect = require('chai').expect;

const SERVER_URL = 'http://localhost:3000';

describe('Login endpoint', function () {
    before(async function () {
        const res = await request(SERVER_URL)
            .post('/events')
            .send({
                name: "Shift",
                startDate: "2025-08-16",
                endDate: "2025-08-17",
                tag: "racing"
            })
        expect(res.status).to.equal(201);
        console.log(`Log: ${res.body}`);
    })

    it('ID1 - Filtrar eventos por intervalos de data antes do período', async function () {
        const res = await request(SERVER_URL)
            .get('/events')
            .query({ startDate: '2025-08-10', endDate: '2025-08-15' });
        expect(res.status).to.equal(200);
        expect(res.body).to.eql([]);
        //console.log(`Log: ${res.body}`);
    });

    it('ID2 - Filtrar eventos por intervalos de data durante período', async function () {
        const res = await request(SERVER_URL)
            .get('/events')
            .query({ startDate: '2025-08-15', endDate: '2025-08-18' });
        expect(res.status).to.equal(200);
        expect(res.body).to.not.be.eql([]);
        //console.log(`Log: ${res.body}`);
    });

    it('ID3 - Filtrar eventos por intervalos de data após período', async function () {
        const res = await request(SERVER_URL)
            .get('/events')
            .query({ startDate: '2025-08-18', endDate: '2025-08-20' });
        expect(res.status).to.equal(200);
        expect(res.body).to.eql([]);
        //console.log(`Log: ${res.body}`);
    });
})