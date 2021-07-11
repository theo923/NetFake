import * as React from 'react';

export const cardScene = (serie: any, handleClick: any) => { return <img key={serie.id} onClick={() => handleClick(serie)} className='card' src={`https://image.tmdb.org/t/p/w300/${serie.backdrop_path}`} alt='scene'></img> }
export const cardPoster = (serie: any, handleClick: any) => { return <img key={serie.id} onClick={() => handleClick(serie)} className='card' src={`https://image.tmdb.org/t/p/w185/${serie.poster_path}`} alt='poster'></img> }