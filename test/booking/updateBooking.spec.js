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
import updateBookingService from "../../src/services/booking/updateBookingService.js";

const expect = require("chai").expect;
const createTokenRequestBody = require("../../testdata/auth/createTokenBody.json");

describe("Update booking test cases", () => {
    const updateBookingRequestBody = {
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
        totalprice: parseInt(`${Math.floor(Math.random() * 99999999)}`),
        depositpaid: true,
        bookingdates: {
            checkin: `${commonUtilities.getDateTime(1)}`,
            checkout: `${commonUtilities.getDateTime(7)}`,
        },
        additionalneeds: "Booking",
    };

    it("Should update booking successfully", (done) => {
        console.log("updateBookingRequestBody: ", updateBookingRequestBody);

        createTokenService
            .getToken(BASE_URL, createTokenRequestBody)
            .then((token) => {
                console.log("Token: ", token);
                getListBookingIdService
                    .getBookingId(BASE_URL, 0)
                    .then((bookingId) => {
                        console.log("Booking Id: ", bookingId);
                        updateBookingService
                            .getResponse(
                                BASE_URL,
                                token,
                                bookingId,
                                updateBookingRequestBody
                            )
                            .then((response) => {
                                console.log("Response body: ", response.body);
                                expect(response.statusCode).to.be.equal(200);
                                expect(
                                    commonUtilities.compareObjects(
                                        response.body,
                                        updateBookingRequestBody
                                    )
                                ).to.be.true;
                                done();
                            })
                            .catch((err) => {
                                done(err);
                            });
                    });
            });
    }).timeout(15000);

    it("Should response status code 404 when update booking with wrong url", (done) => {
        console.log("updateBookingRequestBody: ", updateBookingRequestBody);

        createTokenService
            .getToken(BASE_URL, createTokenRequestBody)
            .then((token) => {
                console.log("Token: ", token);
                getListBookingIdService
                    .getBookingId(BASE_URL, 0)
                    .then((bookingId) => {
                        console.log("Booking Id: ", bookingId);
                        updateBookingService
                            .getResponseWithWrongUrl(
                                BASE_URL,
                                token,
                                bookingId,
                                updateBookingRequestBody
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

    it("Should response status code 403 when update booking with wrong token", (done) => {
        console.log("updateBookingRequestBody: ", updateBookingRequestBody);

        createTokenService
            .getToken(BASE_URL, createTokenRequestBody)
            .then((token) => {
                console.log("Token: ", token);
                getListBookingIdService
                    .getBookingId(BASE_URL, 0)
                    .then((bookingId) => {
                        console.log("Booking Id: ", bookingId);
                        updateBookingService
                            .getResponseWithWrongToken(
                                BASE_URL,
                                token,
                                bookingId,
                                updateBookingRequestBody
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

    it("Should response status code 400 when update booking with wrong body", (done) => {
        const wrongUpdateBookingRequestBody = {
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
            abcd: 100,
        };

        console.log(
            "wrongUpdateBookingRequestBody: ",
            wrongUpdateBookingRequestBody
        );

        createTokenService
            .getToken(BASE_URL, createTokenRequestBody)
            .then((token) => {
                console.log("Token: ", token);
                getListBookingIdService
                    .getBookingId(BASE_URL, 0)
                    .then((bookingId) => {
                        console.log("Booking Id: ", bookingId);
                        updateBookingService
                            .getResponse(
                                BASE_URL,
                                token,
                                bookingId,
                                wrongUpdateBookingRequestBody
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
});
