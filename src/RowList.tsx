import * as React from 'react';
import { cardScene, cardPoster } from './apiImage';
import { fetchTV, fetchMovie } from './apiFunction';
import axios from 'axios';
import './App.css';
import Youtube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import youtubeSearch from "youtube-search";

type Props = {
  name: string;
  fetchFunction: string;
  fetchGenre?: string;
}

export const RowList = ({name, fetchFunction, fetchGenre} : Props) : JSX.Element => {
  const [list, setList] = React.useState<string[]>([])
  const [genreName, setGenreName] = React.useState<string>('')
  const [showContext, setShowContext] = React.useState<boolean>(false);
  const [serieTrailer, setSerieTrailer] = React.useState<any>({name: '', link:''});
  const [selectSerie, setSelectSerie] = React.useState<string>('');
  const [selectDetail, setSelectDetail] = React.useState<any>({});

  React.useEffect(() => {
    if(name === 'genre') {
      axios.get(fetchGenre || '')
        .then(res =>  {
          const data = res.data
          const selectGenre = Math.floor(Math.random() * data.genres.length) + 1;
          setGenreName(data.genres[selectGenre]?.name);
          return `&sort_by=popularity.desc&with_genres=${data.genres[selectGenre]?.id}&with_watch_monetization_types=flatrate`

        }).then((genreString : string) =>
          axios.get( (name !== 'genre') ? fetchFunction : (fetchFunction + genreString))
            .then(res => setList(res.data.results))
        )
    }
    else{
      axios.get(fetchFunction)
        .then(res => setList(res.data.results))
    }
  }, [])

  const handleClick = (serie: any) : void =>  {
    (serie.title) ? axios.get(fetchMovie(serie.id)).then(res => setSelectDetail(res.data)) : axios.get(fetchTV(serie.id)).then(res => setSelectDetail(res.data));
    movieTrailer( (serie.name || serie.title) , {id: true} )
      .then((res : string) => {
        (selectSerie  === serie.id) ? setSelectSerie('undo') : setSelectSerie(serie.id);
        res ? setSerieTrailer({name: (serie.name || serie.title), link: res}) : (selectSerie !== serie.id) ? youtubeSearch((serie.name || serie.title) + ' official trailer', ytSearchOpts, (err: any, results: any) => setSerieTrailer({name: (serie.name || serie.title), link: (results ? results[0].id : '')})) : setSerieTrailer({name: '', link: ''});
        setShowContext((prevState : boolean) => {
          return (selectSerie === 'undo' || serieTrailer.name === serie.name || serieTrailer.name === serie.title || prevState === false) ? !prevState : prevState
        });
    });
  }

  const ytSearchOpts: youtubeSearch.YouTubeSearchOptions = {
    maxResults: 1,
    key: process.env.REACT_APP_YT_API
  };

  const ytOpts : object = {
    height: '390',
    width: '100%',
  }

  return (
    <div>
      <div data-test="component-app-showHeader" className='mx-8 font-sans font-black text-2xl text-white'>{name !== 'genre' ? name : genreName}</div>
      <div data-test="component-app-showList" className='flex p-4 px-8 cardList'>
          {list?.map((series: any) => {
            if(name ==='Netflix Original') return cardPoster(series, handleClick, selectSerie)
            else return cardScene(series, handleClick, selectSerie)
          })}
      </div>
      {showContext ? 
      <div data-test="component-app-showContext" className='grid grid-cols-1 lg:grid-cols-2 bg-black'>
        <div className='lg:col-span-2' style={{backgroundImage: 'linear-gradient(360deg, transparent, rgba(37, 37, 37, 0.61), #111)', height: '100px'}}></div>
        <div className='font-sans font-black text-white m-6 lg:ml-10 '>
            <div className='flex-grow'></div>
            <h1 className='m-2 text-4xl lg:text-5xl '>{selectDetail.title || selectDetail.name}</h1>
            <div className='m-2'>{`100% Match ${selectDetail.release_date || selectDetail.first_air_date + ' - ' + selectDetail?.last_air_date} ${selectDetail.name ? ' TV-MA ' + selectDetail.seasons.length + ' Season' : ''}`}</div>
            
            <h1 className='m-2 w-96 lg:w-full xl:w-3/4 text-xs lg:text-sm '>{selectDetail.overview}</h1>
            <div className='flex m-2'>
              <button className='flex justify-center items-center button playButton mr-4 hover:bg-gray-600'><img className='mr-2' src='/image/play.png' height='17px' width='17px' />PLAY</button>
              <button className='flex justify-center items-center button mr-4 border-solid border-gray-600 border-2 hover:bg-gray-600'><img className='mr-2' src='/image/plus.png' height='20px' width='20px' />MY LIST</button>
            </div> 
            <div className='m-2'>{`Genres: ${selectDetail.genres.map((genre: any) => ' ' + genre.name)}`}</div>
            <div className='m-2'>This show is: Exciting</div>
        </div>
        <div className='my-10 ml-4 mr-10'><Youtube videoId={serieTrailer.link} opts={ytOpts} /></div>
        <div className='lg:col-span-2' style={{backgroundImage: 'linear-gradient(180deg, transparent, rgba(37, 37, 37, 0.61), #111)', height: '100px'}}></div>
      </div>
      : null}
      <div className={`${showContext? 'p-12' : 'p-6'}`} />
    </div>
  );
}