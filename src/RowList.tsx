import * as React from 'react';
import { cardScene, cardPoster } from './apiImage';
import axios from 'axios';
import './App.css';
import Youtube from 'react-youtube';

type Props = {
  name: string;
  fetchFunction: string;
  fetchGenre?: string;
}


export const RowList = ({name, fetchFunction, fetchGenre} : Props) : JSX.Element => {
  const [list, setList] = React.useState<any[]>([])
  const [genreName, setGenreName] = React.useState<string>('')
  const [showTrailer, setShowTrailer] = React.useState(false);
  const [serieTrailer, setSerieTrailer] = React.useState('');

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

  const handleClick = (serie: any) => {
    setSerieTrailer(serie)
    setShowTrailer(prevState => {
      console.log('showTrailer', showTrailer, 'prevState', prevState, 'serie', serie.name);
      return (serieTrailer === serie || serieTrailer === '' || prevState === false)? !prevState : prevState
    })

  }

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      // autoplay: 1
    }
  }

  return (
    <div>
      <div data-test="component-app-showHeader" className='mx-4 font-sans font-black text-2xl text-white'>{name !== 'genre' ? name : genreName}</div>
      <div data-test="component-app-showList" className='flex p-4 px-8 cardList'>
          {list?.map(series => {
            if(name ==='Netflix Original') return cardPoster(series, handleClick)
            else return cardScene(series, handleClick)
          })}
      </div>
      {showTrailer ? <Youtube videoId='pbbVusP6i7w' opts={opts} /> : null}
      <div className={`${showTrailer? 'p-12' : 'p-6'}`} />
    </div>
  );
}