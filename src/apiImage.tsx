import * as React from 'react';

export const card = (link : string, size: string, idx: number) => { return <img key={idx} className='card' src={`https://image.tmdb.org/t/p/${size}/${link}`} alt='poster'></img> }