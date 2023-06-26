import { createRequire } from "module";
const require = createRequire(import.meta.url);

import { BASE_URL } from "../../src/constants.js";
import createTokenService from "../../src/services/auth/createTokenService.js";

const expect = require("chai").expect;
const createTokenRequestBody = require("../../testdata/auth/createTokenBody.json");

describe("Create token test cases", () => {
    it("Should create token successfully", (done) => {
        createTokenService
            .getResponse(BASE_URL, createTokenRequestBody)
            .then((res) => {
                console.log("body: ", res.body);
                expect(res.statusCode).to.be.equal(200);
                done();
            })
            .catch((err) => {
                done(err);
            });
    }).timeout(10000);

    it("Should response status code 404 when create token with wrong url", (done) => {
        createTokenService
            .getResponseWithWrongUrl(BASE_URL, createTokenRequestBody)
            .then((res) => {
                expect(res.statusCode).to.be.equal(404);
                done();
            })
            .catch((err) => {
                done(err);
            });
    }).timeout(10000);

    it("Should response status code 401 when create token with wrong auth body data", (done) => {
        const wrongRequestBody = {
            username: "i",
            password: "password123",
        };
        createTokenService
            .getResponse(BASE_URL, wrongRequestBody)
            .then((res) => {
                expect(res.statusCode).to.be.equal(401);
                done();
            })
            .catch((err) => {
                done(err);
            });
    }).timeout(10000);

    it("Should response status code 405 when create token with wrong method", (done) => {
        createTokenService
            .getResponseWithWrongMethod(BASE_URL, createTokenRequestBody)
            .then((res) => {
                expect(res.statusCode).to.be.equal(405);
                done();
            })
            .catch((err) => {
                done(err);
            });
    }).timeout(10000);
});
