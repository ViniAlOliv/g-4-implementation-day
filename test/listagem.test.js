const request = require('supertest');
const expect = require('chai').expect;

const SERVER_URL = 'http://localhost:3000';

describe('Login endpoint', function () {
    before(function () {
        
    })

    it('ID1 - Filtrar eventos por intervalos de data antes do período', async function () {
        const res = await request(SERVER_URL)
            .get('/events')
            .send({ startDate: '2025-08-10', endDate: '2025-08-15' });
        expect(res.status).to.equal(200);
        //expect(res.body).to.equals.should.be.an('array').that.is.empty;
    });
})