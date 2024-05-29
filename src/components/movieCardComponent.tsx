import React from 'react'
import { ImovieData } from '../types/movieData.types'
import imdb from "../public/photos/imdb.png";
import TrailerButton from '../elements/trailerButton';
import { IoPlay } from 'react-icons/io5';

interface ImovieCardProps {
    data : ImovieData
}
const MovieCardElement = ({data} : ImovieCardProps) => {
    console.log(data)
  return (
    <div className='w-full sm:w-5/6 md:1/3 lg:w-[46%] xl:w-[30%] h-[370px] rounded-sm overflow-hidden text-white flex flex-col gap-1 font-oswalid text-2xl'>
        <div className='w-full h-[80%] overflow-hidden'>
        <img className='w-full h-full rounded-md hover:scale-110 transition-all duration-1000' src={`https://image.tmdb.org/t/p/original${data?.backdrop_path}`} alt="" />
        </div>
        <div className='w-full flex items-center pt-2 gap-3'>
        <h3 className='text-white font-oswalid text-2xl '
            style={{ textShadow: "1px 1px 1px black" }}
        >{data.title}</h3>
        <img className='w-10 h-4' src={imdb} alt="" />
        <h3 className='text-xl'>{data.vote_average.toFixed(1)}</h3>
        <h3 className='ml-5'>({data.original_language})</h3>
        </div>
        <button className="bg-yellow-400 px-1 py-2 lg:py-3 lg:px-4 rounded-md w-fit text-black text-sm font-bold font-sans flex items-center gap-2">
        <IoPlay />
            Watch Trailer
        </button>
        
    </div>
  )
}

export default MovieCardElement