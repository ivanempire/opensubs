import NetworkRequestHandler from "../core/NetworkRequestHandler";
import {HttpMethod} from "../core/HttpMethod";
import {NetworkHeaders} from "../constants/NetworkHeaders";
import ACCEPT_JSON_EXAMPLE = NetworkHeaders.ACCEPT_JSON_EXAMPLE;
import { encodeObject } from "../core/utils";

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
            ACCEPT_JSON_EXAMPLE
        );
    }
}

type FindFeaturesParams = {
    // OpenSubtitles feature_id
    feature_id?: number
    // IMDB ID (delete leading zeroes)
    imdb_id?: string
    // Query to search - release/filename accepted
    query?: string
    // TheMovieDB ID - combine with type to avoid errors
    tmdb_id?: string
    // Empty to list all, otherwise movie, tvshow, or episode
    type?: string
    // Filter by year - can only be used in combination with a query
    year?: number
}

export default Features;