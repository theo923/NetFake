import * as React from 'react';

export const cardScene = (serie: any, handleClick: any, selected: string) : JSX.Element => { return (serie.backdrop_path) ? <img data-test="img" key={serie.id} onClick={() => handleClick(serie)} className={`${selected === serie.id ? 'border-white border-4' : null} card`} src={`https://image.tmdb.org/t/p/w300/${serie.backdrop_path}`} alt='scene'></img> : <div/> }
export const cardPoster = (serie: any, handleClick: any, selected: string) : JSX.Element => { return (serie.poster_path) ? <img data-test="img" key={serie.id} onClick={() => handleClick(serie)} className={`${selected === serie.id ? 'border-white border-4 ' : null} card`} src={`https://image.tmdb.org/t/p/w185/${serie.poster_path}`} alt='poster'></img> : <div/> }