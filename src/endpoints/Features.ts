import NetworkRequestHandler from "../core/NetworkRequestHandler";
import {HttpMethod} from "../core/HttpMethod";
import {NetworkHeaders} from "../constants/NetworkHeaders";
import ACCEPT_JSON_EXAMPLE = NetworkHeaders.ACCEPT_JSON_EXAMPLE;

class Features {

    private networkRequestHandler: NetworkRequestHandler;

    constructor(networkRequestHandler: NetworkRequestHandler) {
        this.networkRequestHandler = networkRequestHandler;
    }


    findFeatures = async(params: FindFeaturesParams): Promise<any> => {
        return await this.networkRequestHandler.performNetworkCall(
            HttpMethod.GET,
            "/features?" + this.toUrlEncodedParams(params),
            true,
            ACCEPT_JSON_EXAMPLE
        );
    }

    toUrlEncodedParams = (data: FindFeaturesParams): string => {
        const params: string[] = [];
        for (const key in data) {
            if (data.hasOwnProperty(key) && data[key] !== null && data[key] !== undefined) {
                params.push(`${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`);
            }
        }
        return params.join("&");
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