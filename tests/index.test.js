const request = require("supertest");
const server = require("../src/server");
var mongoose = require('mongoose');



describe("Test root path", () => {
    test("It should response the GET method", () => {
        return request(server)
            .get("/")
            .then((response) => {
                expect(response.status).toBe(200);
            });
    });
});
