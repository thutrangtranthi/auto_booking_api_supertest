import { createRequire } from "module";
const require = createRequire(import.meta.url);

const request = require("supertest");

class UpdateBookingService {
    async getResponse(baseUrl, token, bookingId, updateBookingRequestBody) {
        const response = await request(baseUrl)
            .put(`/booking/${bookingId}`)
            .send(updateBookingRequestBody)
            .set("Accept", "application/json")
            .set("Content-Type", "application/json")
            .set("Cookie", `token=${token}`);

        return response;
    }

    async getResponseWithWrongUrl(
        baseUrl,
        token,
        bookingId,
        updateBookingRequestBody
    ) {
        const response = await request(baseUrl)
            .put(`/booking/${bookingId}/abcd`)
            .send(updateBookingRequestBody)
            .set("Accept", "application/json")
            .set("Content-Type", "application/json")
            .set("Cookie", `token=${token}`);

        return response;
    }

    async getResponseWithWrongToken(
        baseUrl,
        token,
        bookingId,
        updateBookingRequestBody
    ) {
        const response = await request(baseUrl)
            .put(`/booking/${bookingId}`)
            .send(updateBookingRequestBody)
            .set("Accept", "application/json")
            .set("Content-Type", "application/json")
            .set("Cookie", `token=${token}abcdef`);

        return response;
    }
}

export default new UpdateBookingService();
