import { NetworkHeaders } from "../constants/NetworkHeaders";
import ACCEPT_JSON = NetworkHeaders.ACCEPT_JSON;
import NetworkRequestHandler from "../core/NetworkRequestHandler";
import {HttpMethods} from "../core/types";

class Utilities {

    private networkRequestHandler: NetworkRequestHandler;

    constructor(networkRequestHandler: NetworkRequestHandler) {
        this.networkRequestHandler = networkRequestHandler;
    }

    /**
     * Guess the feature based on the provided filename.
     * @param filename The filename to use during guessing.
     * @return {Result} wrapped response from guessIt endpoint.
     */
    guessIt = async(filename: string): Promise<any> => {
        return await this.networkRequestHandler.performNetworkCall(
            HttpMethods.GET,
            "/utilities/guessit?filename=" + encodeURIComponent(filename),
            true,
            {
                ...ACCEPT_JSON,
            }
        );
    }
}

export default Utilities;