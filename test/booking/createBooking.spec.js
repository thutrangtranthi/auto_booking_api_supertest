import { createRequire } from "module";
const require = createRequire(import.meta.url);

import {
    BASE_URL,
    LIST_FIRST_NAME_CREATE,
    LIST_LAST_NAME_CREATE,
} from "../../src/constants.js";
import commonUtilities from "../../src/commonUtilities.js";
import createBookingService from "../../src/services/booking/createBookingService.js";

const expect = require("chai").expect;

describe("Create booking test cases", () => {
    const createBookingRequestBody = {
        firstname: `${
            LIST_FIRST_NAME_CREATE[
                Math.floor(Math.random() * LIST_FIRST_NAME_CREATE.length)
            ]
        }`,
        lastname: `${
            LIST_LAST_NAME_CREATE[
                Math.floor(Math.random() * LIST_LAST_NAME_CREATE.length)
            ]
        }`,
        totalprice: parseInt(`${Math.floor(Math.random() * 9999999)}`),
        depositpaid: true,
        bookingdates: {
            checkin: `${commonUtilities.getDateTime(0)}`,
            checkout: `${commonUtilities.getDateTime(5)}`,
        },
        additionalneeds: "Breakfast",
    };

    it("Should create booking successfully", (done) => {

        console.log("createBookingRequestBody: ", createBookingRequestBody);

        createBookingService
            .getResponse(BASE_URL, createBookingRequestBody)
            .then((response) => {
                console.log("Booking response body: ", response.body);
                expect(response.statusCode).to.be.equal(200);
                expect(
                    commonUtilities.compareObjects(
                        response.body.booking,
                        createBookingRequestBody
                    )
                ).to.be.true;
                done();
            })
            .catch((err) => {
                done(err);
            });
    }).timeout(10000);

    it("Should response status code 404 when create booking with wrong url", (done) => {
        createBookingService
            .getResponseWithWrongUrl(BASE_URL, createBookingRequestBody)
            .then((res) => {
                expect(res.statusCode).to.be.equal(404);
                done();
            })
            .catch((err) => {
                done(err);
            });
    }).timeout(10000);

    it("Should response status code 400 when create booking with wrong body", (done) => {
        const wrongCreateBookingRequestBody = {
            firstname: `${
                LIST_FIRST_NAME_CREATE[
                    Math.floor(Math.random() * LIST_FIRST_NAME_CREATE.length)
                ]
            }`,
            lastname: `${
                LIST_LAST_NAME_CREATE[
                    Math.floor(Math.random() * LIST_LAST_NAME_CREATE.length)
                ]
            }`,
            abcd: parseInt(`${Math.floor(Math.random() * 9999999)}`),
        };

        createBookingService
            .getResponse(BASE_URL, wrongCreateBookingRequestBody)
            .then((res) => {
                expect(res.statusCode).to.be.equal(400);
                done();
            })
            .catch((err) => {
                done(err);
            });
    }).timeout(10000);
});
