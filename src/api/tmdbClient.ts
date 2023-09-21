import axios from "axios";

// retrieve the api key from the env variables
const apiKey = process.env.REACT_APP_API_KEY;

// Instantiate an axios request with the reusable portion of the api url
const tmdbClient = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    headers: { Accept: "application/json" }
});

// Use an interceptor to set the api key as a parameter on every request
tmdbClient.interceptors.request.use((config) => ({
    ...config,
    params: {
        api_key: apiKey,
        ...config.params
    }
}));

export default tmdbClient;
