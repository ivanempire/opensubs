import {describe, expect, it} from "@jest/globals";
import {OpenSubtitles} from "../src";


describe("OpenSubtitles", () => {

    it("correctly queries Information.getSubtitleFormats() endpoint", async() => {
        const sut = new OpenSubtitles(process.env.OPENSUBS_USERNAME ?? "",
            process.env.OPENSUBS_PASSWORD ?? "",
            process.env.OPENSUBS_APIKEY ?? "");

        const { value } = await sut.info.getSubtitleFormats();
        expect(value).toHaveProperty("data");
        expect(value.data).toHaveProperty("output_formats");
        expect(value.data.output_formats).toBeInstanceOf(Array);
        expect(value.data.output_formats.length).toBe(6);
    }, 10000);

    it("correctly queries Information.getLanguages() endpoint", async() => {
        const sut = new OpenSubtitles(process.env.OPENSUBS_USERNAME ?? "",
            process.env.OPENSUBS_PASSWORD ?? "",
            process.env.OPENSUBS_APIKEY ?? "");

        const { value } = await sut.info.getLanguages();
        expect(value).toHaveProperty("data");
        expect(value.data).toBeInstanceOf(Array);
        expect(value.data.length).toBe(76);
    }, 10000);

    it("correctly queries Information.getUserInformation() endpoint", async() => {
        const sut = new OpenSubtitles(process.env.OPENSUBS_USERNAME ?? "",
            process.env.OPENSUBS_PASSWORD ?? "",
            process.env.OPENSUBS_APIKEY ?? "");

        const { value } = await sut.info.getUserInformation();
        console.log(value);
        // expect(value).toHaveProperty("data");
        // expect(value.data).toBeInstanceOf(Array);
        // expect(value.data.length).toBe(76);
    }, 10000);

    it("correctly queries Utilities.guessIt endpoint", async() => {
        const sut = new OpenSubtitles(process.env.OPENSUBS_USERNAME ?? "",
            process.env.OPENSUBS_PASSWORD ?? "",
            process.env.OPENSUBS_APIKEY ?? "");

        const { value } = await sut.utilities.guessIt("Thor - The Dark World (2013).avi");

        expect(value).toHaveProperty("year");
        expect(value).toHaveProperty("type");
        expect(value).toHaveProperty("title");
        expect(value).toHaveProperty("mimetype");
        expect(value).toHaveProperty("container");
        expect(value).toHaveProperty("alternative_title");
    }, 10000);
});