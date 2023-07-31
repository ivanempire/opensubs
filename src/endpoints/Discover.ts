import {HttpMethod} from "../core/HttpMethod";
import {NetworkHeaders} from "../constants/NetworkHeaders";
import ACCEPT_JSON_EXAMPLE = NetworkHeaders.ACCEPT_JSON_EXAMPLE;
import ACCEPT_JSON = NetworkHeaders.ACCEPT_JSON;
import NetworkRequestHandler from "../core/NetworkRequestHandler";

class Discover {

    private networkRequestHandler: NetworkRequestHandler;

    constructor(networkRequestHandler: NetworkRequestHandler) {
        this.networkRequestHandler = networkRequestHandler;
    }

    getPopularFeatures = async(languages: string, type: string): Promise<any> => {
        return await this.networkRequestHandler.performNetworkCall(
            HttpMethod.GET,
            "/discover/popular?" + `languages=${encodeURIComponent(languages)}&type=${type}`,
            true,
            {...ACCEPT_JSON}
        );
    }

    getLatestSubtitles = async(languages: string, type: string): Promise<any> => {
        return await this.networkRequestHandler.performNetworkCall(
            HttpMethod.GET,
            "/discover/latest?" + `languages=${encodeURIComponent(languages)}&type=${type}`,
            true,
            {...ACCEPT_JSON}
        );
    }

    getMostDownloaded = async(languages: string, type: string): Promise<any> => {
        return await this.networkRequestHandler.performNetworkCall(
            HttpMethod.GET,
            "/discover/most_downloaded?" + `languages=${encodeURIComponent(languages)}&type=${type}`,
            true,
            {...ACCEPT_JSON}
        );
    }
}

export default Discover;