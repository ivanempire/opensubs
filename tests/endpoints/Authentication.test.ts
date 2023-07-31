import {describe, expect, it} from "@jest/globals";
import testCredentialManager from "../core/TestCredentialManager";
import Authentication from "../../src/endpoints/Authentication";
import NetworkRequestHandler from "../../src/core/NetworkRequestHandler";
import {Servers} from "../../src/constants/Servers";

describe("Authentication", () => {

    it("initializes correctly", () => {
        const sut = new Authentication(testCredentialManager, new NetworkRequestHandler(testCredentialManager, Servers.MOCK));
        expect(sut).not.toBeNull();
    });

    it("performs login call correctly", async() => {
        const sut = new Authentication(testCredentialManager, new NetworkRequestHandler(testCredentialManager, Servers.MOCK));
        expect(testCredentialManager.getUserCredentials().jwt).toBeNull();
        const loginResponse = await sut.login();

        expect(loginResponse.ok).toBeTruthy();

        const loginResponseRawValue = loginResponse.value;
        expect(loginResponseRawValue.status).toBe(200);
        expect(loginResponseRawValue).toHaveProperty("user");
        expect(loginResponseRawValue).toHaveProperty("token");
        expect(testCredentialManager.getUserCredentials().jwt).toBeTruthy();
    });

    it("performs logout call correctly", async() => {
        const sut = new Authentication(testCredentialManager, new NetworkRequestHandler(testCredentialManager, Servers.MOCK));
        const logoutResponse = await sut.logout();

        expect(logoutResponse.ok).toBeTruthy();
        expect(logoutResponse.value.status).toBe(200);
        expect(logoutResponse.value.message).toBe("token successfully destroyed");
        expect(testCredentialManager.getUserCredentials().jwt).toBeNull();
    });
});