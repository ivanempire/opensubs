import {HttpMethods} from "../core/types";
import NetworkRequestHandler from "../core/NetworkRequestHandler";
import {FindSubtitlesParams} from "../core/types";
import {encodeObject} from "../core/utils";

class Subtitles {

    private networkRequestHandler: NetworkRequestHandler;

    constructor(networkRequestHandler: NetworkRequestHandler) {
        this.networkRequestHandler = networkRequestHandler;
    }

    /**
     * Find subtitles for a given video file, following logic exposed through the input parameter type.
     * @param requestParams {FindSubtitlesParams} to use for the find subtitles request.
     * @return {Result} wrapped response from findSubtitles endpoint.
     */
    findSubtitles = async(requestParams: FindSubtitlesParams): Promise<any> => {
        return await this.networkRequestHandler.performNetworkCall(
            HttpMethods.GET,
            "/subtitles?" + encodeObject(requestParams),
            true,
            {}
        );
    }
}

export default Subtitles;