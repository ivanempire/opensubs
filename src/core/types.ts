export type UserCredentials = {
    username: string,
    password: string,
    apiKey: string,
    jwt: string|null
}

/**
 * Request parameters for Features.findFeatures() method.
 *
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

export type FindSubtitlesParams = {
    ai_translated?: string
    episode_number?: number
    foreign_parts_only?: string
    hearing_impaired?: string
    id?: number
    imdb_id?: number
    languages?: string
    machine_translated?: string
    moviehash?: string
    moviehash_match?: string
    order_by?: string
    order_direction?: string
    page?: number
    parent_feature_id?: number
    parent_imdb_id?: number
    parent_tmdb_id?: number
    query?: string
    season_number?: number
    tmdb_id?: number
    trusted_sources?: string
    type?: string
    user_id?: number
    year?: number
}