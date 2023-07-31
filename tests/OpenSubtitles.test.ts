import {describe, expect, it} from "@jest/globals";
import {OpenSubtitles} from "../src";


describe("OpenSubtitles", () => {

    it("correctly queries Authentication.login() endpoint", async() => {
        const sut = setupClient();

        const { value } = await sut.auth.login();
        expect(value.status).toBe(200);
        expect(value).toHaveProperty("user");
        expect(value).toHaveProperty("token");
    });

    it("correctly queries Authentication.logout() endpoint", async() => {
        const sut = setupClient();
        await sut.auth.login();

        const { value } = await sut.auth.logout();
        expect(value).toHaveProperty("status");
        expect(value.status).toBe(200);
        expect(value).toHaveProperty("message");
        expect(value.message).toBe("token successfully destroyed");
    });

    it("correctly queries Discover.getPopularFeatures() endpoint", async() => {
        const sut = setupClient();
        const { value } = await sut.discover.getPopularFeatures("es", "tvshow");
        expect(value).toHaveProperty("data");
        expect(value.data).toBeInstanceOf(Array);
        expect(value.data[0].type).toBe("tvshow");
        expect(value.data[0]).toHaveProperty("id");
        expect(value.data[0]).toHaveProperty("attributes");
    });

    it("correctly queries Discover.getLatestSubtitles() endpoint", async() => {
        const sut = setupClient();
        const { value } = await sut.discover.getLatestSubtitles("bs", "movie");
        expect(value).toHaveProperty("data");
        expect(value.data).toBeInstanceOf(Array);
        expect(value.data[0].type).toBe("subtitle");
        expect(value.data[0]).toHaveProperty("id");
        expect(value.data[0]).toHaveProperty("attributes");
    });

    it("correctly queries Discover.getMostDownloaded() endpoint", async() => {
        const sut = setupClient();

        const { value } = await sut.discover.getMostDownloaded("fi", "tvshow");
        expect(value).toHaveProperty("data");
        expect(value.data).toBeInstanceOf(Array);
        expect(value.data[0].type).toBe("subtitle");
        expect(value.data[0]).toHaveProperty("id");
        expect(value.data[0]).toHaveProperty("attributes");
    });

    it("correctly queries Information.getSubtitleFormats() endpoint", async() => {
        const sut = setupClient();

        const { value } = await sut.info.getSubtitleFormats();
        expect(value).toHaveProperty("data");
        expect(value.data).toHaveProperty("output_formats");
        expect(value.data.output_formats).toBeInstanceOf(Array);
        expect(value.data.output_formats.length).toBe(6);
    }, 10000);

    it("correctly queries Information.getLanguages() endpoint", async() => {
        const sut = setupClient();

        const { value } = await sut.info.getLanguages();
        expect(value).toHaveProperty("data");
        expect(value.data).toBeInstanceOf(Array);
        expect(value.data.length).toBe(76);
    }, 10000);

    it("correctly queries Information.getUserInformation() endpoint", async() => {
        const sut = setupClient();

        const { value } = await sut.info.getUserInformation();
        console.log(value);
        // expect(value).toHaveProperty("data");
        // expect(value.data).toBeInstanceOf(Array);
        // expect(value.data.length).toBe(76);
    }, 10000);

    it("correctly queries Utilities.guessIt endpoint", async() => {
        const sut = setupClient();

        const { value } = await sut.utilities.guessIt("Thor - The Dark World (2013).avi");

        expect(value).toHaveProperty("year");
        expect(value).toHaveProperty("type");
        expect(value).toHaveProperty("title");
        expect(value).toHaveProperty("mimetype");
        expect(value).toHaveProperty("container");
        expect(value).toHaveProperty("alternative_title");
    }, 10000);

    function setupClient() {
        return new OpenSubtitles(process.env.OPENSUBS_USERNAME ?? "",
            process.env.OPENSUBS_PASSWORD ?? "",
            process.env.OPENSUBS_APIKEY ?? "");
    }
});