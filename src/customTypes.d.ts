type ApiResponse<K extends string, T> = { [key in K]: T };

type Result = {
    id: number;
    adult: boolean;
    popularity: number;
    media_type: "movie" | "tv" | "person";
};

type MovieResult = Result & {
    backdrop_path: string;
    title: string;
    original_language: string;
    original_title: string;
    overview: string;
    poster_path: string;
    media_type: "movie";
    genre_ids: number[];
    release_date: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
};

type TVResult = Result & {
    backdrop_path: string;
    name: string;
    original_language: string;
    original_name: string;
    overview: string;
    poster_path: string;
    media_type: "tv";
    genre_ids: number[];
    first_air_date: string;
    vote_average: number;
    vote_count: number;
    origin_country: number[];
};

type PersonResult = Result & {
    gender: number;
    known_for_department: string;
    name: string;
    original_name: string;
    profile_path: string;
    known_for: (MovieResult | TVResult)[];
    media_type: "person";
    popularity: number;
};

type ResultItem = MovieResult | TVResult | PersonResult;

type FilterCategory = "all" | "movie" | "tv" | "person";

type ApiConfiguration = {
    base_url: string;
    secure_base_url: string;
};

type ResultVideoResponse = {
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    key: string;
    site: string;
    size: number;
    type: "Trailer" | "Teaser";
    official: boolean;
    published_at: string;
    id: string;
};

type PersonDetails = {
    adult: boolean;
    also_known_as: string[],
    biography: string;
    birthday: string | null;
    deathday: string | null;
    gender: number;
    homepage: string;
    id: number;
    imdb_id: string;
    known_for_department: string;
    name: string;
    place_of_birth: string | null;
    popularity: number
    profile_path: string;
}
