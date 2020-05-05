import axios from "axios";

const apiKey = process.env.REACT_APP_API_KEY;

const tmdbClient = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
});

tmdbClient.interceptors.request.use((config) => ({
    ...config,
    params: {
        api_key: apiKey,
        ...config.params
    }
}));

export default tmdbClient;