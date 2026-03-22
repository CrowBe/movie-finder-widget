import tmdbClient from "./api/tmdbClient";

type SearchResponse = {
    results: ResultItem[];
    total_results: number;
    total_pages: number;
};

export const getTrending = async (
    timePeriod: "week" | "day" = "week"
): Promise<ApiResponse<"results", ResultItem[]>> =>
    (await tmdbClient.get(`/trending/all/${timePeriod}`)).data;

export const searchByFilter = async (
    query: string,
    page: number,
    filter: FilterCategory
): Promise<SearchResponse> => {
    if (filter === "all") {
        return (
            await tmdbClient.get(
                `/search/multi?language=en-US&query=${encodeURIComponent(query)}&page=${page}&include_adult=false`
            )
        ).data;
    }
    const data = (
        await tmdbClient.get(
            `/search/${filter}?language=en-US&query=${encodeURIComponent(query)}&page=${page}&include_adult=false`
        )
    ).data;
    // Type-specific endpoints omit media_type, so inject it
    return {
        ...data,
        results: (data.results as ResultItem[]).map((item) => ({
            ...item,
            media_type: filter,
        })),
    };
};

export const getApiConfiguration = async (): Promise<
    ApiResponse<"images", ApiConfiguration>
> => (await tmdbClient.get("/configuration")).data;

export const getResultVideos = async (
    mediaType: "movie" | "tv",
    id: number
): Promise<ApiResponse<"results", ResultVideoResponse[]>> =>
    (await tmdbClient.get(`/${mediaType}/${id}/videos`)).data;

export const getPersonDetails = async (id: number): Promise<PersonDetails> =>
    (await tmdbClient.get(`/person/${id}`)).data;
