import tmdbClient from "./api/tmdbClient";
export const getTrending = async (
    timePeriod: "week" | "day" = "week"
): Promise<ApiResponse<"results", ResultItem[]>> =>
    (await tmdbClient.get(`/trending/all/${timePeriod}`)).data;

export const searchMulti = async (
    query: string,
    page: number
): Promise<{ results: ResultItem[]; total_results: number }> =>
    (
        await tmdbClient.get(
            `/search/multi?language=en-US&query=${query}&page=${page}&include_adult=false`
        )
    ).data;

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
