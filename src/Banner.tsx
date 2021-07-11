import React from 'react';
import axios from 'axios';


export const Banner = ({ fetchFunction } : any ) => {
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
            <div className='flex flex-col items-left justify-center w-full bg-center bg-cover' style={{backgroundImage: `url("https://image.tmdb.org/t/p/original/${serie.backdrop_path}")`, height:'448px'}}>
                <div className='flex-grow'></div>
                <h1 className='font-sans font-black m-2 text-4xl lg:ml-10 lg:text-5xl text-white'>{serie.title}</h1>
                <div className='font-sans font-black m-2 lg:ml-10 text-white'>
                    <button className='button mr-4 hover:bg-gray-600'>Play</button>
                    <button className='button hover:bg-gray-600'>My List</button>
                </div>
                <h1 className='font-sans font-black m-2 w-96 lg:ml-10 lg:w-1/2 text-xs lg:text-sm text-white'>{serie.overview}</h1>
                <div className='relative flex-grow' style={{backgroundImage: 'linear-gradient(180deg, transparent, rgba(37, 37, 37, 0.61), #111)'}}></div>
            </div>
            
        </header>
    )
}