import { createRequire } from "module";
const require = createRequire(import.meta.url);

import { BASE_URL } from "../../src/constants.js";
import getListBookingIdService from "../../src/services/booking/getListBookingIdService.js";

const expect = require("chai").expect;

describe("Get list booking id test cases", () => {
    it("Should get list booking id succssfully", (done) => {
        getListBookingIdService
            .getResponse(BASE_URL)
            .then((response) => {
                console.log("First booking id: ", response.body[0]);
                console.log("The number of booking id: ", response.body.length);
                expect(response.statusCode).to.be.equal(200);
                done();
            })
            .catch((err) => {
                done(err);
            });
    }).timeout(10000);

    it("Should response status code 404 when get list booking id with wrong url", (done) => {
        getListBookingIdService
            .getResponseWithWrongUrl(BASE_URL)
            .then((response) => {
                expect(response.statusCode).to.be.equal(404);
                done();
            })
            .catch((err) => {
                done(err);
            });
    }).timeout(10000);
});
