import { createRequire } from "module";
const require = createRequire(import.meta.url);

const request = require("supertest");

class GetBookingInfoService {
    async getResponse(baseUrl, bookingId) {
        const response = await request(baseUrl)
            .get(`/booking/${bookingId}`)
            .set("Accept", "application/json")
            .set("Content-Type", "application/json");

        return response;
    }

    async getResponseWithWrongUrl(baseUrl, bookingId) {
        const response = await request(baseUrl)
            .get(`/booking/${bookingId}/abcd`)
            .set("Accept", "application/json")
            .set("Content-Type", "application/json");

        return response;
    }
}

export default new GetBookingInfoService();
