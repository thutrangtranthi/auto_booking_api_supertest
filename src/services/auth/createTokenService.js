import { createRequire } from "module";
const require = createRequire(import.meta.url);

const request = require("supertest");

class CreateTokenService {
    async getResponse(baseUrl, createTokenRequestBody) {
        const response = await request(baseUrl)
            .post("/auth")
            .send(createTokenRequestBody)
            .set("Accept", "application/json")
            .set("Content-Type", "application/json");

        return response;
    }

    async getResponseWithWrongMethod(baseUrl, createTokenRequestBody) {
        const response = await request(baseUrl)
            .get("/auth")
            .send(createTokenRequestBody)
            .set("Accept", "application/json")
            .set("Content-Type", "application/json");

        return response;
    }

    async getResponseWithWrongUrl(baseUrl, createTokenRequestBody) {
        const response = await request(baseUrl)
            .post("/auth12345")
            .send(createTokenRequestBody)
            .set("Accept", "application/json")
            .set("Content-Type", "application/json");

        return response;
    }

    async getToken(baseUrl, createTokenRequestBody) {
        return await Promise.resolve(
            (
                await this.getResponse(baseUrl, createTokenRequestBody)
            ).body.token
        );
    }
}

export default new CreateTokenService();
