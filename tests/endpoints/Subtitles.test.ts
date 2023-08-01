import {describe, expect, it} from "@jest/globals";
import testCredentialManager from "../core/TestCredentialManager";
import NetworkRequestHandler from "../../src/core/NetworkRequestHandler";
import {Servers} from "../../src/constants/Servers";
import Subtitles from "../../src/endpoints/Subtitles";

describe("Subtitles", () => {
    it("correctly queries findSubtitles() endpoint", async() => {
        const sut = new Subtitles(new NetworkRequestHandler(testCredentialManager, Servers.MOCK));

        const latestResponse = await sut.findSubtitles({
            id: 450
        });
        expect(latestResponse.ok).toBeTruthy();
    });
});