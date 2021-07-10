import * as React from 'react';
import { card } from './apiImage';
import axios from 'axios';
import './App.css';

type Props = {
  name: string;
  fetchFunction: string;
  fetchGenre?: string;
}


export const RowList = ({name, fetchFunction, fetchGenre} : Props) : JSX.Element => {
  const [list, setList] = React.useState<any[]>([])
  const [genreName, setGenreName] = React.useState<string>('')

  React.useEffect(() => {
    let genreString;

    if(name === 'genre') {
      axios.get(fetchGenre || '')
        .then(res =>  {
          const data = res.data
          const selectGenre = Math.floor(Math.random() * data.genres.length) + 1;
          setGenreName(data.genres[selectGenre].name);
          genreString = `&sort_by=popularity.desc&with_genres=${data.genres[selectGenre].id}&with_watch_monetization_types=flatrate`

          axios.get( (name !== 'genre') ? fetchFunction : (fetchFunction + genreString))
            .then(res => setList(res.data.results))
        })
    }
    else{
      axios.get( (name !== 'genre') ? fetchFunction : (fetchFunction + genreString))
        .then(res => setList(res.data.results))
    }
  }, [])

  return (
    <div>
      <div data-test="component-app-showHeader" className='m-4 text-4xl'>{name !== 'genre' ? name : genreName}</div>
      <div data-test="component-app-showList" className='flex p-4 cardList'>
          {list?.map(series => {
            if(name ==='Netflix Original') return card(series.poster_path, 'w300', series.id)
            else return card(series.backdrop_path, 'w300', series.id)
          })}
      </div>
    </div>
  );
}