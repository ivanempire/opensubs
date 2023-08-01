import NetworkRequestHandler from "../core/NetworkRequestHandler";
import {HttpMethod} from "../core/HttpMethod";
import {NetworkHeaders} from "../constants/NetworkHeaders";
import { encodeObject } from "../core/utils";
import {FindFeaturesParams} from "../core/types";
import ACCEPT_JSON = NetworkHeaders.ACCEPT_JSON;

class Features {

    private networkRequestHandler: NetworkRequestHandler;

    constructor(networkRequestHandler: NetworkRequestHandler) {
        this.networkRequestHandler = networkRequestHandler;
    }

    findFeatures = async(params: FindFeaturesParams): Promise<any> => {
        return await this.networkRequestHandler.performNetworkCall(
            HttpMethod.GET,
            "/features?" + encodeObject(params),
            true,
            ACCEPT_JSON
        );
    }
}

export default Features;