import {describe, expect, it} from "@jest/globals";
import Download from "../../src/endpoints/Download";
import testCredentialManager from "../core/TestCredentialManager";
import NetworkRequestHandler from "../../src/core/NetworkRequestHandler";
import {Servers} from "../../src/constants/Servers";

describe("Download", () => {
    it("correctly queries requestDownload() endpoint", async() => {
        const sut = new Download(testCredentialManager, new NetworkRequestHandler(testCredentialManager, Servers.MOCK));

        const latestResponse = await sut.requestDownload({
            file_id: 123
        });
        expect(latestResponse.ok).toBeTruthy();
        expect(latestResponse.value).toHaveProperty("link");
        expect(latestResponse.value).toHaveProperty("file_name");
        expect(latestResponse.value).toHaveProperty("requests");
        expect(latestResponse.value).toHaveProperty("remaining");
        expect(latestResponse.value).toHaveProperty("message");
        expect(latestResponse.value).toHaveProperty("reset_time");
        expect(latestResponse.value).toHaveProperty("reset_time_utc");
        expect(latestResponse.value.file_name).toBe("castle.rock.s01e03.webrip.x264-tbs.ettv.-eng.ro.srt");
    });
});