import CredentialManager from "../../src/core/CredentialManager";
import { describe, expect, it } from "@jest/globals";

describe("CredentialManager", () => {

    it("initializes correctly", () => {
        const sut = new CredentialManager("username", "password", "apiKey");
        expect(sut).not.toBeNull();
    });

    it("returns UserCredentials correctly", () => {
        const sut = new CredentialManager("username_1", "password_2", "apiKey_3");

        const credentials1 = sut.getUserCredentials();

        expect(credentials1).toEqual({
            username: "username_1",
            password: "password_2",
            apiKey: "apiKey_3",
            jwt: null
        });

        sut.updateToken("someNewToken");
        const credentials2 = sut.getUserCredentials();

        expect(credentials2).toEqual({
            username: "username_1",
            password: "password_2",
            apiKey: "apiKey_3",
            jwt: "someNewToken"
        });
    });
});