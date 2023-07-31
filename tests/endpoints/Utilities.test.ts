import Utilities from "../../src/endpoints/Utilities";
import { describe, expect, it } from "@jest/globals";
import NetworkRequestHandler from "../../src/core/NetworkRequestHandler";
import testCredentialManager from "../core/TestCredentialManager";
import {Servers} from "../../src/constants/Servers";

describe("Utilities", () => {

    it("handles mocked server response correctly", async() => {
        const sut = new Utilities(new NetworkRequestHandler(testCredentialManager, Servers.MOCK));
        const mockServerResponse = await sut.guessIt("CounterpartS01E08.wma");
        expect(mockServerResponse.ok).toBeTruthy();
        
        expect(mockServerResponse.value).toStrictEqual({
            title: "string",
            year: 0,
            language: "string",
            subtitle_language: "string",
            screen_size: "string",
            streaming_service: "string",
            source: "string",
            other: "string",
            audio_codec: "string",
            audio_channels: "string",
            video_codec: "string",
            release_group: "string",
            type: "string"
        });
    });

    it("handles primary server response correctly", async() => {
        const sut = new Utilities(new NetworkRequestHandler(testCredentialManager, Servers.PRIMARY));
        const primaryServerResponse = await sut.guessIt("CounterpartS01E08.wmv");
        expect(primaryServerResponse.value).toStrictEqual({
            title: "CounterpartS01E08",
            container: "wmv",
            mimetype: "video/x-ms-wmv",
            type: "movie"
        });
    });

    it("correctly encodes complicated filename requests", async() => {
        const sut = new Utilities(new NetworkRequestHandler(testCredentialManager, Servers.PRIMARY));
        const guessResponse1 = await sut.guessIt("Fantastic Beasts - The Secrets of Dumbledore (2022).mp4");
        expect(guessResponse1.value).toStrictEqual({
            title: "Fantastic Beasts",
            alternative_title: "The Secrets of Dumbledore",
            year: 2022,
            container: "mp4",
            mimetype: "video/mp4",
            type: "movie"
        });

        const guessResponse2 = await sut.guessIt("The Falcon and The Winter Soldier - S01E04 - The Whole World is Watching - (2160p).mov");
        expect(guessResponse2.value).toStrictEqual({
            title: "The Falcon and The Winter Soldier",
            season: 1,
            episode: 4,
            episode_title: "The Whole World is Watching",
            screen_size: "2160p",
            container: "mov",
            mimetype: "video/quicktime",
            type: "episode"
        });

        const guessResponse3 = await sut.guessIt("House of the Dragon S01E07 1080p WEB H264-CAKES.flv");
        expect(guessResponse3.value).toStrictEqual({
            title: "House of the Dragon",
            season: 1,
            episode: 7,
            screen_size: "1080p",
            source: "Web",
            video_codec: "H.264",
            release_group: "CAKES",
            container: "flv",
            mimetype: "video/x-flv",
            type: "episode"
        });

    });
});