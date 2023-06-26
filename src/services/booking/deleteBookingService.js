import { createRequire } from "module";
const require = createRequire(import.meta.url);

const request = require("supertest");

class DeleteBookingService {
    async getResponse(baseUrl, token, bookingId) {
        const response = await request(baseUrl)
            .delete(`/booking/${bookingId}`)
            .set("Cookie", `token=${token}`);

        return response;
    }

    async getResponseWithWrongUrl(baseUrl, token, bookingId) {
        const response = await request(baseUrl)
            .delete(`/booking///${bookingId}`)
            .set("Cookie", `token=${token}`);

        return response;
    }
}

export default new DeleteBookingService();
