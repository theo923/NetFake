import * as React from 'react';
import { Navigation } from './Navigation';
import { Banner } from './Banner';
import { RowList } from './RowList';
import { getNetflixOriginal, getPopular, getTrending, getUpcoming, getTopRated, getGenre ,getGenreList } from './apiFunction';
import './App.css';


const App = () : JSX.Element => {
  return (
    <div className='background'>
      <Navigation />
      <Banner fetchFunction={getTopRated} />
      <RowList name='Netflix Original' fetchFunction={getNetflixOriginal} />
      <RowList name='Popular on Hotflix' fetchFunction={getPopular} />
      <RowList name='Trending Now' fetchFunction={getTrending} />
      <RowList name='Upcoming' fetchFunction={getUpcoming} />
      <RowList name='Top Rated' fetchFunction={getTopRated} />
      <RowList name='genre' fetchFunction={getGenre} fetchGenre={getGenreList} />
      <RowList name='genre' fetchFunction={getGenre} fetchGenre={getGenreList} />
      <RowList name='genre' fetchFunction={getGenre} fetchGenre={getGenreList} />
    </div>
  );
}

export default App;