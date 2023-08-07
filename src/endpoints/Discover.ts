import {HttpMethods} from "../core/types";
import {NetworkHeaders} from "../constants/NetworkHeaders";
import ACCEPT_JSON = NetworkHeaders.ACCEPT_JSON;
import NetworkRequestHandler from "../core/NetworkRequestHandler";

class Discover {

    private networkRequestHandler: NetworkRequestHandler;

    constructor(networkRequestHandler: NetworkRequestHandler) {
        this.networkRequestHandler = networkRequestHandler;
    }

    /**
     * Get the most popular features for the given languages and type.
     *
     * @param languages A list of language codes, like "en,es" - can verify with info.getLanguages() first.
     * @param type What kind of popular features to look for.
     * @return {Result} wrapped response from getPopularFeatures endpoint.
     */
    getPopularFeatures = async(languages: string, type: string): Promise<any> => {
        return await this.networkRequestHandler.performNetworkCall(
            HttpMethods.GET,
            "/discover/popular?" + `languages=${encodeURIComponent(languages)}&type=${type}`,
            true,
            {...ACCEPT_JSON}
        );
    }

    /**
     * Get a list of the latest subtitles for the given string of languages and feature type.
     *
     * @param languages A list of language codes, like "en,es" - can verify with info.getLanguages() first.
     * @param type What kind of feature the subtitles are for - movie or tvshow.
     * @return {Result} wrapped response from getLatestSubtitles endpoint.
     */
    getLatestSubtitles = async(languages: string, type: string): Promise<any> => {
        return await this.networkRequestHandler.performNetworkCall(
            HttpMethods.GET,
            "/discover/latest?" + `languages=${encodeURIComponent(languages)}&type=${type}`,
            true,
            {...ACCEPT_JSON}
        );
    }

    /**
     * Get a list of the most downloaded subtitles for the given string of languages and feature type.
     * @param languages A list of language codes, like "en,es" - can verify with info.getLanguages() first.
     * @param type What kind of feature the subtitles are for - movie or tvshow.
     * @return {Result} wrapped response from getMostDownloaded endpoint.
     */
    getMostDownloaded = async(languages: string, type: string): Promise<any> => {
        return await this.networkRequestHandler.performNetworkCall(
            HttpMethods.GET,
            "/discover/most_downloaded?" + `languages=${encodeURIComponent(languages)}&type=${type}`,
            true,
            {...ACCEPT_JSON}
        );
    }
}

export default Discover;