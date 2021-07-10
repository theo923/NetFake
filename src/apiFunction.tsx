import * as React from 'react';

export const getNetflixOriginal = `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_TMDB_API}&sort_by=popularity.desc&page=1&with_networks=213&with_watch_monetization_types=flatrate`
export const getPopular = `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.REACT_APP_TMDB_API}`
export const getTopRated = `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_TMDB_API}`
export const getUpcoming = `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_TMDB_API}`
export const getTrending = `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_TMDB_API}`
export const getGenre = `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_TMDB_API}`
export const getGenreList = `https://api.themoviedb.org/3/genre/tv/list?api_key=${process.env.REACT_APP_TMDB_API}`
