import * as React from 'react';
import { cardScene, cardPoster } from './apiImage';
import axios from 'axios';
import './App.css';
import Youtube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import youtubeSearch from "youtube-search";
import * as usetube from 'usetube';

type Props = {
  name: string;
  fetchFunction: string;
  fetchGenre?: string;
}


export const RowList = ({name, fetchFunction, fetchGenre} : Props) : JSX.Element => {
  const [list, setList] = React.useState<any[]>([])
  const [genreName, setGenreName] = React.useState<string>('')
  const [showTrailer, setShowTrailer] = React.useState(false);
  const [serieTrailer, setSerieTrailer] = React.useState({name: '', link:''});
  const [selectSerie, setSelectSerie] = React.useState('');

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
    setSelectSerie(serie.id)
    movieTrailer( null , {id: true, tmdbId: serie.id} )
      .then( (res : string) => {
        res ? setSerieTrailer({name: (serie.name || serie.title), link: res}) : setSerieTrailer({name: (serie.name || serie.title), link: usetube.searchVideo('gg').id})
        setShowTrailer(prevState => {
          console.log('showTrailer', showTrailer, 'prevState', prevState, 'serie', serie.name, serie.title, 'serieTrailer.name', serieTrailer.name);
          return (serieTrailer.name === serie.name || serieTrailer.name === serie.title || prevState === false) ? !prevState : prevState
        })
      })
    console.log('loading...')

  }
  
  // youtubeSearch((serie.name || serie.title) + ' official trailer', ytopts, (err: any, results: any) => {console.log('results', results); setSerieTrailer({name: (serie.name || serie.title), link: (results ? results[0].id : '')})})

  const ytopts: youtubeSearch.YouTubeSearchOptions = {
    maxResults: 1,
    key: 'AIzaSyB7UB3WWmq51MnnLDrRlYhzs3zwGfVFXLQ'
  };

  

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
            if(name ==='Netflix Original') return cardPoster(series, handleClick, selectSerie)
            else return cardScene(series, handleClick, selectSerie)
          })}
      </div>
      {showTrailer ? <Youtube videoId={serieTrailer.link} opts={opts} /> : null}
      <div className={`${showTrailer? 'p-12' : 'p-6'}`} />
    </div>
  );
}