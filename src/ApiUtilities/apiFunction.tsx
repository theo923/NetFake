export const getNetflixOriginal: string = `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_TMDB_API}&sort_by=popularity.desc&page=1&with_networks=213&with_watch_monetization_types=flatrate`;
export const getPopular: string = `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.REACT_APP_TMDB_API}`;
export const getTopRated: string = `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_TMDB_API}`;
export const getUpcoming: string = `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_TMDB_API}`;
export const getTrending: string = `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_TMDB_API}`;
export const getGenre: string = `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_TMDB_API}`;
export const getGenreList: string = `https://api.themoviedb.org/3/genre/tv/list?api_key=${process.env.REACT_APP_TMDB_API}`;

export const fetchMovie = (id: string): string => {
    return `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_API}`;
};
export const fetchTV = (id: string): string => {
    return `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.REACT_APP_TMDB_API}`;
};
