import { createRequire } from "module";
const require = createRequire(import.meta.url);

const request = require("supertest");

class UpdatePartialBookingService {
    async getResponse(
        baseUrl,
        token,
        bookingId,
        updatePartialBookingRequestBody
    ) {
        const response = await request(baseUrl)
            .patch(`/booking/${bookingId}`)
            .send(updatePartialBookingRequestBody)
            .set("Accept", "application/json")
            .set("Content-Type", "application/json")
            .set("Cookie", `token=${token}`);

        return response;
    }

    async getResponseWithWrongUrl(
        baseUrl,
        token,
        bookingId,
        updatePartialBookingRequestBody
    ) {
        const response = await request(baseUrl)
            .patch(`/booking///${bookingId}`)
            .send(updatePartialBookingRequestBody)
            .set("Accept", "application/json")
            .set("Content-Type", "application/json")
            .set("Cookie", `token=${token}`);

        return response;
    }
}

export default new UpdatePartialBookingService();
