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

    it("correctly queries Download.requestDownload() endpoint", async() => {
        const sut = setupClient();
        await sut.auth.login();

        const { value } = await sut.download.requestDownload({
            file_id: 250
        });

        expect(value).toHaveProperty("link");
        expect(value).toHaveProperty("file_name");
        expect(value).toHaveProperty("requests");
        expect(value).toHaveProperty("remaining");
        expect(value).toHaveProperty("message");
        expect(value).toHaveProperty("reset_time");
        expect(value).toHaveProperty("reset_time_utc");
        expect(value).toHaveProperty("uk");
        expect(value).toHaveProperty("uid");
        expect(value).toHaveProperty("ts");
        expect(value.file_name).toBe("Castle.Rock.S01E08.Past Perfect.WEBRip.x264-TBS.srt");
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
    });

    it("correctly queries Information.getLanguages() endpoint", async() => {
        const sut = setupClient();

        const { value } = await sut.info.getLanguages();
        expect(value).toHaveProperty("data");
        expect(value.data).toBeInstanceOf(Array);
        expect(value.data.length).toBe(76);
    });

    it("correctly queries Information.getUserInformation() endpoint", async() => {
        const sut = setupClient();
        await sut.auth.login();

        const { value } = await sut.info.getUserInformation();
        expect(value).toHaveProperty("data");

        const responseData = value.data;
        expect(responseData).toHaveProperty("vip");
        expect(responseData).toHaveProperty("level");
        expect(responseData).toHaveProperty("user_id");
        expect(responseData).toHaveProperty("username");
        expect(responseData).toHaveProperty("ext_installed");
        expect(responseData).toHaveProperty("downloads_count");
        expect(responseData).toHaveProperty("allowed_downloads");
        expect(responseData).toHaveProperty("remaining_downloads");
        expect(responseData).toHaveProperty("allowed_translations");
    });

    it("correctly queries Utilities.guessIt endpoint", async() => {
        const sut = setupClient();

        const { value } = await sut.utilities.guessIt("Thor - The Dark World (2013).avi");

        expect(value).toHaveProperty("year");
        expect(value).toHaveProperty("type");
        expect(value).toHaveProperty("title");
        expect(value).toHaveProperty("mimetype");
        expect(value).toHaveProperty("container");
        expect(value).toHaveProperty("alternative_title");
    });

    function setupClient() {
        return new OpenSubtitles(process.env.OPENSUBS_USERNAME ?? "",
            process.env.OPENSUBS_PASSWORD ?? "",
            process.env.OPENSUBS_APIKEY ?? "");
    }
});