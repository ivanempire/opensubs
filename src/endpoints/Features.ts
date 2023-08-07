import NetworkRequestHandler from "../core/NetworkRequestHandler";
import {HttpMethods} from "../core/types";
import {NetworkHeaders} from "../constants/NetworkHeaders";
import { encodeObject } from "../core/utils";
import {FindFeaturesParams} from "../core/types";
import ACCEPT_JSON = NetworkHeaders.ACCEPT_JSON;

class Features {

    private networkRequestHandler: NetworkRequestHandler;

    constructor(networkRequestHandler: NetworkRequestHandler) {
        this.networkRequestHandler = networkRequestHandler;
    }

    /**
     * Search for a feature from a given text input.
     * @param requestParams {FindFeaturesParams} to use for the find features request.
     * @return {Result} wrapped response from findFeatures endpoint.
     */
    findFeatures = async(requestParams: FindFeaturesParams): Promise<any> => {
        return await this.networkRequestHandler.performNetworkCall(
            HttpMethods.GET,
            "/features?" + encodeObject(requestParams),
            true,
            ACCEPT_JSON
        );
    }
}

export default Features;