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