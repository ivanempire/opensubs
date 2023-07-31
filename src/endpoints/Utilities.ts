import { HttpMethod } from "../core/HttpMethod";
import { NetworkHeaders } from "../constants/NetworkHeaders";
import ACCEPT_JSON = NetworkHeaders.ACCEPT_JSON;
import NetworkRequestHandler from "../core/NetworkRequestHandler";

class Utilities {

    private networkRequestHandler: NetworkRequestHandler;

    constructor(networkRequestHandler: NetworkRequestHandler) {
        this.networkRequestHandler = networkRequestHandler;
    }

    guessIt = async(filename: string): Promise<any> => {
        return await this.networkRequestHandler.performNetworkCall(
            HttpMethod.GET,
            "/utilities/guessit?filename=" + encodeURIComponent(filename),
            true,
            {
                ...ACCEPT_JSON,
            }
        );
    }
}

export default Utilities;