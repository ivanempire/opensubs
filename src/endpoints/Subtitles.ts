import {HttpMethod} from "../core/HttpMethod";
import NetworkRequestHandler from "../core/NetworkRequestHandler";

class Subtitles {

    private networkRequestHandler: NetworkRequestHandler;

    constructor(networkRequestHandler: NetworkRequestHandler) {
        this.networkRequestHandler = networkRequestHandler;
    }

//     ai_translated
//     string
//     exclude, include (default: include)
//
//     episode_number
//     integer
//     For Tvshows
//
//     foreign_parts_only
//     string
//     exclude, include, only (default: include)
//
//     hearing_impaired
//     string
//     include, exclude, only. (default: include)
//
//     id
//     integer
//     ID of the movie or episode
//
//     imdb_id
//     integer
//     IMDB ID of the movie or episode
//
//     languages
//     string
//     Language code(s), coma separated (en,fr)
//
//     machine_translated
//     string
//     exclude, include (default: exclude)
//
//     moviehash
//     string
//     Moviehash of the movie
//
// >= 16 characters
// <= 16 characters
//     Match pattern:
// ^[a-f0-9]{16}$
// moviehash_match
// string
// include, only (default: include)
//
// order_by
// string
// Order of the returned results, accept any of above fields
//
// order_direction
// string
// Order direction of the returned results (asc,desc)
//
// page
// integer
// Results page to display
//
// parent_feature_id
// integer
// For Tvshows
//
// parent_imdb_id
// integer
// For Tvshows
//
// parent_tmdb_id
// integer
// For Tvshows
//
// query
// string
// file name or text search
//
// season_number
// integer
// For Tvshows
//
// tmdb_id
// integer
// TMDB ID of the movie or episode
//
// trusted_sources
// string
// include, only (default: include)
//
// type
//     string
// movie, episode or all, (default: all)
//
// user_id
// integer
// To be used alone - for user uploads listing
//
// year
// integer
// Filter by movie/episode year

    findSubtitles = async(includeAiTranslated: boolean, includeEpisodeNumber: boolean, includeOnlyForeignParts: boolean, includeHearingImpaired: boolean): Promise<any> => {
        return await this.networkRequestHandler.performNetworkCall(
            HttpMethod.GET,
            "/subtitles" + `ai_translated=${includeAiTranslated ? "include" : "exclude"}
            &episode_number=${includeEpisodeNumber ? "include" : "exclude"}
            &foreign_parts_only=${includeOnlyForeignParts ? "include" : "exclude"}
            &hearing_impaired=${includeHearingImpaired ? "include" : "exclude"}`,
            true,
            {},
            {}
        );
    }
}

export default Subtitles;