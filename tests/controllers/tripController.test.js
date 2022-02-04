const request = require("supertest");
const server = require("../../src/server");
const mockedData = require('../seeds/mockedData');

describe("Test tripController GET method", () => {
    test("Test GET method /api/trips/v1 when response with 200 ", () => {
        return request(server)
        .get('/api/trips/v1')
        .then((response)=>{
            expect(response.status).toBe(200);
        });
    });
});

describe("Test tripController POST method", () => {

    test("Test POST method /api/trips/v1 when response with 400 because there are 4 readings  ", () => {
        return request(server)
        .post('/api/trips/v1')
        .send(mockedData.queryParams4Readings)
        .then((response)=>{
            expect(response.status).toBe(400);
            expect(response.body.message).toBe('At least 5 readings are required.');
        });
    });
    
    test("Test POST method /api/trips/v1 when response with 400 because not have correct format  ", () => {
        return request(server)
        .post('/api/trips/v1')
        .send({readings: "hola"})
        .then((response)=>{
            expect(response.status).toBe(400);
            expect(response.body.message).toBe('Readings is not have de format correct.');
        });
    });

    test("Test POST method /api/trips/v1 when response with 400 because not have property time ", () => {
        return request(server)
        .post('/api/trips/v1')
        .send(mockedData.queryParamsReadingsWithoutTimeParameter)
        .then((response)=>{
            expect(response.status).toBe(400);
            expect(response.body.message).toBe('All readings must have the time property.');
        });
    });

    test("Test POST method /api/trips/v1 when response with 400 because do not have query params ", () => {
        return request(server)
        .post('/api/trips/v1')
        .send({})
        .then((response)=>{
            expect(response.status).toBe(400);
            expect(response.body.message).toBe('Readings is required.');
        });
    });
});