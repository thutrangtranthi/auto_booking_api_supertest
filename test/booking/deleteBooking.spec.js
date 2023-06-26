import { createRequire } from "module";
const require = createRequire(import.meta.url);

import {
    BASE_URL,
    LIST_FIRST_NAME_UPDATE,
    LIST_LAST_NAME_UPDATE,
} from "../../src/constants.js";
import createTokenService from "../../src/services/auth/createTokenService.js";
import getListBookingIdService from "../../src/services/booking/getListBookingIdService.js";
import deleteBookingService from "../../src/services/booking/deleteBookingService.js";

const expect = require("chai").expect;
const createTokenRequestBody = require("../../testdata/auth/createTokenBody.json");

describe("Delete booking test cases", () => {
    it("Should delete booking successfully", (done) => {
        createTokenService
            .getToken(BASE_URL, createTokenRequestBody)
            .then((token) => {
                console.log("Token: ", token);
                getListBookingIdService
                    .getBookingId(BASE_URL, 5)
                    .then((bookingId) => {
                        console.log("Booking Id: ", bookingId);
                        deleteBookingService
                            .getResponse(BASE_URL, token, bookingId)
                            .then((response) => {
                                expect(response.statusCode).to.be.equal(200);
                                done();
                            })
                            .catch((err) => {
                                done(err);
                            });
                    });
            });
    }).timeout(20000);

    it("Should response status code 404 when delete booking with wrong url", (done) => {
        createTokenService
            .getToken(BASE_URL, createTokenRequestBody)
            .then((token) => {
                console.log("Token: ", token);
                getListBookingIdService
                    .getBookingId(BASE_URL, 5)
                    .then((bookingId) => {
                        console.log("Booking Id: ", bookingId);
                        deleteBookingService
                            .getResponseWithWrongUrl(BASE_URL, token, bookingId)
                            .then((response) => {
                                expect(response.statusCode).to.be.equal(404);
                                done();
                            })
                            .catch((err) => {
                                done(err);
                            });
                    });
            });
    }).timeout(20000);

    it("Should response status code 403 when delete booking with wrong token", (done) => {
        createTokenService
            .getToken(BASE_URL, createTokenRequestBody)
            .then((token) => {
                console.log("Token: ", token);
                getListBookingIdService
                    .getBookingId(BASE_URL, 5)
                    .then((bookingId) => {
                        console.log("Booking Id: ", bookingId);
                        deleteBookingService
                            .getResponse(BASE_URL, token + "abcdef", bookingId)
                            .then((response) => {
                                expect(response.statusCode).to.be.equal(403);
                                done();
                            })
                            .catch((err) => {
                                done(err);
                            });
                    });
            });
    }).timeout(20000);
});
