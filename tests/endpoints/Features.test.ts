import {describe, expect, it} from "@jest/globals";
import Features from "../../src/endpoints/Features";
import testCredentialManager from "../core/TestCredentialManager";
import NetworkRequestHandler from "../../src/core/NetworkRequestHandler";
import {Servers} from "../../src/constants/Servers";

describe("Features", () => {
    it("correctly queries requestDownload() endpoint", async() => {
        const sut = new Features(new NetworkRequestHandler(testCredentialManager, Servers.MOCK));

        const latestResponse = await sut.findFeatures({
            feature_id: 9000
        });
        expect(latestResponse.ok).toBeTruthy();
        expect(latestResponse.value).toBeTruthy();
        expect(latestResponse.value.data).toBeInstanceOf(Array);
        expect(latestResponse.value.value).toBe("this is test  how it is rendered");
    });
});