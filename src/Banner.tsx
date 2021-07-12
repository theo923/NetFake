import React from 'react';
import axios from 'axios';


export const Banner = ({ fetchFunction } : any ) : JSX.Element => {
    const [serie, setSerie] = React.useState<any>({});

    React.useEffect(() => {
        axios.get(fetchFunction)
            .then(res => {
                const data = res.data.results;
                const setdata = Math.floor(Math.random() * data.length) + 1;
                setSerie({...data[setdata]});
            })
    }, [])

    return (
        <header data-test="component-banner">
            <div className='flex flex-col items-left justify-center w-full bg-center bg-cover font-black text-white' style={{backgroundImage: `url("https://image.tmdb.org/t/p/original/${serie.backdrop_path}")`, height:'448px'}}>
                <div className='flex-grow'></div>
                <div className='flex font-sans m-2 text-4xl ml-6 lg:ml-10 lg:text-5xl'>{serie.title}</div>
                <div className='flex font-sans m-2 ml-6 lg:ml-10'>
                    <button className='flex justify-center items-center button playButton mr-4 hover:bg-gray-600'><img className='mr-2' src='/image/play.png' height='17px' width='17px' />PLAY</button>
                    <button className='flex justify-center items-center button mr-4 border-solid border-gray-600 border-2 hover:bg-gray-600'><img className='mr-2' src='/image/plus.png' height='20px' width='20px' />MY LIST</button>
                </div>
                <div className='font-sans m-2 w-96 ml-6 lg:ml-10 lg:w-1/2 text-xs lg:text-sm'>{serie.overview}</div>
                <div className='relative flex-grow' style={{backgroundImage: 'linear-gradient(180deg, transparent, rgba(37, 37, 37, 0.61), #111)'}}></div>
            </div>
        </header>
    )
}