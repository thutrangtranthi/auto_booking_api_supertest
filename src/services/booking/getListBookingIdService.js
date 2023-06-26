import { createRequire } from "module";
const require = createRequire(import.meta.url);

const request = require("supertest");

class GetListBookingIdService {
    async getResponse(baseUrl) {
        const response = await request(baseUrl)
            .get("/booking")
            .set("Accept", "application/json")
            .set("Content-Type", "application/json");

        return response;
    }

    async getBookingId(baseUrl, bookingIdIndex) {
        return await Promise.resolve(
            (
                await this.getResponse(baseUrl)
            ).body[bookingIdIndex].bookingid
        );
    }

    async getResponseWithWrongUrl(baseUrl) {
        const response = await request(baseUrl)
            .get("/booking//")
            .set("Accept", "application/json")
            .set("Content-Type", "application/json");

        return response;
    }
}

export default new GetListBookingIdService();
