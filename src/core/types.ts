/**
 * HTTP method constants to use for API calls.
 */
export enum HttpMethods {
    GET = "GET",
    POST = "POST",
    DELETE = "DELETE"
}

/**
 * Result type for making sure data passing is conformed in the library.
 * Taken from https://imhoff.blog/posts/using-results-in-typescript
 */
export type Result<T, E = Error> =
    | { ok: true; value: T }
    | { ok: false; error: E };

/**
 * Request parameters for requestDownload() call.
 */
export type RequestDownloadParams = {
    file_id: number
    sub_format?: string
    file_name?: string
    in_fps?: number
    out_fps?: number
    timeshift?: number
    force_download?: boolean
}

/**
 * Request parameters for findFeatures() call.
 */
export type FindFeaturesParams = {
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

/**
 * Request parameters for findSubtitles() call. There's some specific logic the OpenSubtitles API
 * uses, and the recommended guidelines may be found at:
 * https://opensubtitles.stoplight.io/docs/opensubtitles-api/a172317bd5ccc-search-for-subtitles
 */
export type FindSubtitlesParams = {
    // [include/exclude] Include AI translated subtitles or not (default is include)
    ai_translated?: string
    // Episode number to query for, in case of TV shows
    episode_number?: number
    // [include/exclude] Foreign parts of a subtitle (default is include)
    foreign_parts_only?: string
    // [include/exclude] Subtitles for the hearing impaired users (default is include)
    hearing_impaired?: string
    // ID of the movie or episode to look for
    id?: number
    // IMDB ID of the movie or episode to look for
    imdb_id?: number
    // Comma separated list of language code(s), sorted in alphabetical order (en, fr)
    languages?: string
    // [include/exclude] Include machine translated subtitles (default is exclude)
    machine_translated?: string
    // Moviehash of the movie file (match pattern ^[a-f0-9]{16}$)
    moviehash?: string
    // [include/exclude] Include by moviehash match (default is include)
    moviehash_match?: string
    // Order of the returned results - accepts any of the fields above
    order_by?: string
    // [asc/desc] Order direction of the returned results
    order_direction?: string
    // Results page to display
    page?: number
    // Parent feature ID - for TV shows
    parent_feature_id?: number
    // Parent IMDB ID - for TV shows
    parent_imdb_id?: number
    // Parent TMDB ID - for TV shows
    parent_tmdb_id?: number
    // File name or text to search
    query?: string
    // Season number, in case of TV shows
    season_number?: number
    // TMDB ID of the movie or episode
    tmdb_id?: number
    // [include/exclude] Include trusted sources (default is include)
    trusted_sources?: string
    // [movie/episode/all] Feature type (default is all)
    type?: string
    // ID for user upload listing - to be used along
    user_id?: number
    // Feature year
    year?: number
}