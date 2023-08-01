import {HttpMethod} from "../core/HttpMethod";
import NetworkRequestHandler from "../core/NetworkRequestHandler";
import {FindSubtitlesParams} from "../core/types";
import {encodeObject} from "../core/utils";

class Subtitles {

    private networkRequestHandler: NetworkRequestHandler;

    constructor(networkRequestHandler: NetworkRequestHandler) {
        this.networkRequestHandler = networkRequestHandler;
    }

    findSubtitles = async(params: FindSubtitlesParams): Promise<any> => {
        return await this.networkRequestHandler.performNetworkCall(
            HttpMethod.GET,
            "/subtitles?" + encodeObject(params),
            true,
            {}
        );
    }
}

export default Subtitles;