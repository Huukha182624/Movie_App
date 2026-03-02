import axios from "axios";

const api = axios.create({
    baseURL: process.env.EXPO_PUBLIC_TMDB_URL,
    params: {
        api_key: process.env.EXPO_PUBLIC_TMDB_KEY,
    },
});

export const getTrending = () =>
    api.get("/trending/movie/day");

export const searchMovie = (keyword: string) =>
    api.get("/search/movie", {
        params: { query: keyword },
    });

export const getMovieDetail = (id: string) =>
    api.get(`/movie/${id}`);

export const getMovieTrailer = (id: string) =>
    api.get(`/movie/${id}/videos`);

