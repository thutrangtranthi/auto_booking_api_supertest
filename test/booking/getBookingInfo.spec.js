import { createRequire } from "module";
const require = createRequire(import.meta.url);

import { BASE_URL } from "../../src/constants.js";
import getListBookingIdService from "../../src/services/booking/getListBookingIdService.js";
import getBookingInfoService from "../../src/services/booking/getBookingInfoService.js";

const expect = require("chai").expect;

describe("Get booking info test cases", () => {
    it("Should get booking info successfully", (done) => {
        getListBookingIdService.getBookingId(BASE_URL, 0).then((bookingId) => {
            console.log("Booking id: ", bookingId);
            getBookingInfoService
                .getResponse(BASE_URL, bookingId)
                .then((bookingInfoRes) => {
                    console.log("Booking info: ", bookingInfoRes.body);
                    expect(bookingInfoRes.statusCode).to.be.equal(200);
                    done();
                })
                .catch((err) => {
                    done(err);
                });
        });
    }).timeout(10000);

    it("Should response status code 404 when get booking info with wrong url", (done) => {
        getListBookingIdService.getBookingId(BASE_URL, 0).then((bookingId) => {
            console.log("Booking id: ", bookingId);
            getBookingInfoService
                .getResponseWithWrongUrl(BASE_URL, bookingId)
                .then((bookingInfoRes) => {
                    expect(bookingInfoRes.statusCode).to.be.equal(404);
                    done();
                })
                .catch((err) => {
                    done(err);
                });
        });
    }).timeout(10000);
});
