import { createRequire } from "module";
const require = createRequire(import.meta.url);

const request = require("supertest");

class CreateBookingService {
    async getResponse(baseUrl, createBookingRequestBody) {
        const response = await request(baseUrl)
            .post("/booking")
            .send(createBookingRequestBody)
            .set("Accept", "application/json")
            .set("Content-Type", "application/json");

        return response;
    }

    async getBookingId(baseUrl, createBookingRequestBody) {
        return await Promise.resolve(
            (
                await this.getResponse(baseUrl, createBookingRequestBody)
            ).body.bookingid
        );
    }

    async getResponseWithWrongUrl(baseUrl, createBookingRequestBody) {
        const response = await request(baseUrl)
            .post("/booking123")
            .send(createBookingRequestBody)
            .set("Accept", "application/json")
            .set("Content-Type", "application/json");

        return response;
    }
}

export default new CreateBookingService();
