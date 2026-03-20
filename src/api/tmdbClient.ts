import axios from "axios";

const tmdbClient = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    headers: { Accept: "application/json" },
});

tmdbClient.interceptors.request.use((config) => ({
    ...config,
    params: {
        api_key: import.meta.env.VITE_TMDB_API_KEY,
        ...config.params,
    },
}));

export default tmdbClient;
