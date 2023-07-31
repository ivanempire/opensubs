import Discover from "../../src/endpoints/Discover";
import { describe, expect, it } from "@jest/globals";
import NetworkRequestHandler from "../../src/core/NetworkRequestHandler";
import testCredentialManager from "../core/TestCredentialManager";
import {Servers} from "../../src/constants/Servers";

describe("Discover", () => {

    it("correctly queries popular features from mock server", async() => {
        const sut = new Discover(new NetworkRequestHandler(testCredentialManager, Servers.MOCK));

        const popularResponse = await sut.getPopularFeatures("en", "movie");
        expect(popularResponse.ok).toBeTruthy();
        expect(popularResponse.value).toHaveProperty("id");
        expect(popularResponse.value).toHaveProperty("type");
        expect(popularResponse.value).toHaveProperty("attributes");
    });

    it("correctly queries popular features from primary server", async() => {
        const sut = new Discover(new NetworkRequestHandler(testCredentialManager, Servers.PRIMARY));

        const popularResponse1 = await sut.getPopularFeatures("en", "tvshow");
        expect(popularResponse1.ok).toBeTruthy();
        expect(popularResponse1.value.data).toBeInstanceOf(Array);
        expect(popularResponse1.value.data[0].type).toBe("tvshow");
        expect(popularResponse1.value.data[0].attributes).toBeInstanceOf(Object);
        expect(popularResponse1.value.data[0]).toHaveProperty("id");
        expect(popularResponse1.value.data[0]).toHaveProperty("type");
        expect(popularResponse1.value.data[0]).toHaveProperty("attributes");
    });

    it("correctly queries popular features for multiple languages", async() => {
        const sut = new Discover(new NetworkRequestHandler(testCredentialManager, Servers.PRIMARY));

        const popularResponse2 = await sut.getPopularFeatures("en,ru", "movie");
        expect(popularResponse2.ok).toBeTruthy();
        expect(popularResponse2.value.data).toBeInstanceOf(Array);
        expect(popularResponse2.value.data[0].type).toBe("movie");
        expect(popularResponse2.value.data[0].attributes).toBeInstanceOf(Object);
        expect(popularResponse2.value.data[0]).toHaveProperty("id");
        expect(popularResponse2.value.data[0]).toHaveProperty("type");
        expect(popularResponse2.value.data[0]).toHaveProperty("attributes");

        const popularResponse3 = await sut.getPopularFeatures("en, fr, es", "movie");
        expect(popularResponse3.ok).toBeTruthy();
        expect(popularResponse3.value.data).toBeInstanceOf(Array);
        expect(popularResponse3.value.data[0].type).toBe("movie");
        expect(popularResponse3.value.data[0].attributes).toBeInstanceOf(Object);
        expect(popularResponse3.value.data[0]).toHaveProperty("id");
        expect(popularResponse3.value.data[0]).toHaveProperty("type");
        expect(popularResponse3.value.data[0]).toHaveProperty("attributes");
    });

    it("correctly queries latest subtitles from mock server", async() => {
        const sut = new Discover(new NetworkRequestHandler(testCredentialManager, Servers.MOCK));

        const latestResponse = await sut.getLatestSubtitles("en,ru", "movie");
        expect(latestResponse.ok).toBeTruthy();
        expect(latestResponse.value).toHaveProperty("total_pages");
        expect(latestResponse.value).toHaveProperty("total_count");
        expect(latestResponse.value).toHaveProperty("page");
        expect(latestResponse.value).toHaveProperty("data");
    });

    it("correctly queries latest subtitles from primary server", async() => {
        const sut = new Discover(new NetworkRequestHandler(testCredentialManager, Servers.PRIMARY));

        const latestResponse = await sut.getLatestSubtitles("en, ru, jp", "tvshow");
        expect(latestResponse.ok).toBeTruthy();
        expect(latestResponse.value).toHaveProperty("total_pages");
        expect(latestResponse.value).toHaveProperty("total_count");
        expect(latestResponse.value).toHaveProperty("page");
        expect(latestResponse.value).toHaveProperty("data");
    });

    it("correctly queries most downloaded subtitles from mock server", async() => {
        const sut = new Discover(new NetworkRequestHandler(testCredentialManager, Servers.MOCK));

        const latestResponse = await sut.getMostDownloaded("en", "tvshow");
        expect(latestResponse.ok).toBeTruthy();
        expect(latestResponse.value).toHaveProperty("total_pages");
        expect(latestResponse.value).toHaveProperty("total_count");
        expect(latestResponse.value).toHaveProperty("page");
        expect(latestResponse.value).toHaveProperty("data");
        expect(latestResponse.value.data).toBeInstanceOf(Array);
    });

    it("correctly queries most downloaded subtitles from primary server", async() => {
        const sut = new Discover(new NetworkRequestHandler(testCredentialManager, Servers.PRIMARY));

        const latestResponse = await sut.getMostDownloaded("ru", "movie");
        expect(latestResponse.ok).toBeTruthy();
        expect(latestResponse.value).toHaveProperty("total_pages");
        expect(latestResponse.value).toHaveProperty("total_count");
        expect(latestResponse.value).toHaveProperty("page");
        expect(latestResponse.value).toHaveProperty("data");
        expect(latestResponse.value.data).toBeInstanceOf(Array);
    });
});