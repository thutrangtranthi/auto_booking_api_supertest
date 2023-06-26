import { createRequire } from "module";
const require = createRequire(import.meta.url);

import {
    BASE_URL,
    LIST_FIRST_NAME_UPDATE,
    LIST_LAST_NAME_UPDATE,
} from "../../src/constants.js";
import commonUtilities from "../../src/commonUtilities.js";
import createTokenService from "../../src/services/auth/createTokenService.js";
import getListBookingIdService from "../../src/services/booking/getListBookingIdService.js";
import updatePartialBookingService from "../../src/services/booking/updatePartialBookingService.js";

const expect = require("chai").expect;
const createTokenRequestBody = require("../../testdata/auth/createTokenBody.json");

describe("Update partial booking test cases", () => {
    const updatePartialBookingRequestBody = {
        firstname: `${
            LIST_FIRST_NAME_UPDATE[
                Math.floor(Math.random() * LIST_FIRST_NAME_UPDATE.length)
            ]
        }`,
        lastname: `${
            LIST_LAST_NAME_UPDATE[
                Math.floor(Math.random() * LIST_LAST_NAME_UPDATE.length)
            ]
        }`,
    };

    it("Should update partial booking successfully", (done) => {
        console.log(
            "updatePartialBookingRequestBody: ",
            updatePartialBookingRequestBody
        );

        createTokenService
            .getToken(BASE_URL, createTokenRequestBody)
            .then((token) => {
                console.log("Token: ", token);
                getListBookingIdService
                    .getBookingId(BASE_URL, 1)
                    .then((bookingId) => {
                        console.log("Booking Id: ", bookingId);
                        updatePartialBookingService
                            .getResponse(
                                BASE_URL,
                                token,
                                bookingId,
                                updatePartialBookingRequestBody
                            )
                            .then((response) => {
                                console.log("Response body: ", response.body);
                                expect(response.statusCode).to.be.equal(200);

                                expect(response.body).to.include(
                                    updatePartialBookingRequestBody
                                );
                                done();
                            })
                            .catch((err) => {
                                done(err);
                            });
                    });
            });
    }).timeout(15000);

    it("Should response status code 400 when partial update booking with wrong body", (done) => {
        const wrongUpdatePartialBookingRequestBody = {
            high: "180cm",
            weight: "100kg",
        };

        console.log(
            "wrongUpdatePartialBookingRequestBody: ",
            wrongUpdatePartialBookingRequestBody
        );

        createTokenService
            .getToken(BASE_URL, createTokenRequestBody)
            .then((token) => {
                console.log("Token: ", token);
                getListBookingIdService
                    .getBookingId(BASE_URL, 1)
                    .then((bookingId) => {
                        console.log("Booking Id: ", bookingId);
                        updatePartialBookingService
                            .getResponse(
                                BASE_URL,
                                token,
                                bookingId,
                                wrongUpdatePartialBookingRequestBody
                            )
                            .then((response) => {
                                expect(response.statusCode).to.be.equal(400);
                                done();
                            })
                            .catch((err) => {
                                done(err);
                            });
                    });
            });
    }).timeout(15000);

    it("Should response status code 403 when partial update booking with wrong token", (done) => {
        console.log(
            "updatePartialBookingRequestBody: ",
            updatePartialBookingRequestBody
        );

        createTokenService
            .getToken(BASE_URL, createTokenRequestBody)
            .then((token) => {
                console.log("Token: ", token);
                getListBookingIdService
                    .getBookingId(BASE_URL, 1)
                    .then((bookingId) => {
                        console.log("Booking Id: ", bookingId);
                        updatePartialBookingService
                            .getResponse(
                                BASE_URL,
                                token + "abcdef",
                                bookingId,
                                updatePartialBookingRequestBody
                            )
                            .then((response) => {
                                expect(response.statusCode).to.be.equal(403);
                                done();
                            })
                            .catch((err) => {
                                done(err);
                            });
                    });
            });
    }).timeout(15000);

    it("Should response status code 404 when partial update booking with wrong url", (done) => {
        console.log(
            "updatePartialBookingRequestBody: ",
            updatePartialBookingRequestBody
        );

        createTokenService
            .getToken(BASE_URL, createTokenRequestBody)
            .then((token) => {
                console.log("Token: ", token);
                getListBookingIdService
                    .getBookingId(BASE_URL, 1)
                    .then((bookingId) => {
                        console.log("Booking Id: ", bookingId);
                        updatePartialBookingService
                            .getResponseWithWrongUrl(
                                BASE_URL,
                                token + "abcdef",
                                bookingId,
                                updatePartialBookingRequestBody
                            )
                            .then((response) => {
                                expect(response.statusCode).to.be.equal(404);
                                done();
                            })
                            .catch((err) => {
                                done(err);
                            });
                    });
            });
    }).timeout(15000);
});
