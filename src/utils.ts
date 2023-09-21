export const isPersonResult = (
    result: PersonResult | MovieResult | TVResult
): result is PersonResult => result.media_type === "person";
export const isMovieResult = (
    result: PersonResult | MovieResult | TVResult
): result is PersonResult => result.media_type === "movie";
export const isTVResult = (
    result: PersonResult | MovieResult | TVResult
): result is TVResult => result.media_type === "tv";
