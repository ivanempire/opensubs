import {HttpMethod} from "../core/HttpMethod";
import { NetworkHeaders } from "../constants/NetworkHeaders";
import ACCEPT_JSON = NetworkHeaders.ACCEPT_JSON;
import ACCEPT_JSON_EXAMPLE = NetworkHeaders.ACCEPT_JSON_EXAMPLE;
import NetworkRequestHandler from "../core/NetworkRequestHandler";

class Information {

    private networkRequestHandler: NetworkRequestHandler;

    constructor(networkRequestHandler: NetworkRequestHandler) {
        this.networkRequestHandler = networkRequestHandler;
    }

    getSubtitleFormats = async(): Promise<any> => {
        return await this.networkRequestHandler.performNetworkCall(
            HttpMethod.GET,
            "/infos/formats",
            true,
            ACCEPT_JSON_EXAMPLE
        );
    }

    getLanguages = async(): Promise<any> => {
        return await this.networkRequestHandler.performNetworkCall(
            HttpMethod.GET,
            "/infos/languages",
            true,
            ACCEPT_JSON_EXAMPLE
        );
    }

    getUserInformation = async(): Promise<any> => {
        return await this.networkRequestHandler.performNetworkCall(
            HttpMethod.GET,
            "/infos/user",
            true,
            ACCEPT_JSON
        );
    }
}

export default Information;