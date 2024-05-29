import React from 'react'
import imdb from "../public/photos/imdb.png";
import { ImovieData } from '../types/movieData.types'
import { IoPlay } from 'react-icons/io5'

interface ImovieCardProps {
    data : ImovieData
}

const CardElement = ({data} : ImovieCardProps) => {
    return (
        <div className='w-full sm:w-5/6 md:1/3 lg:w-[46%] xl:w-80 h-[470px] rounded-sm overflow-hidden bg-black text-white flex flex-col gap-1 font-oswalid text-2xl'>
            <div className='w-full h-[70%] overflow-hidden'>
            <img className='w-full h-full rounded-md hover:scale-110 transition-all duration-1000' src={`https://image.tmdb.org/t/p/original${data?.backdrop_path}`} alt="" />
            </div>
            <div className='w-full flex items-center pt-2 gap-3'>
            <h3 className='text-white font-oswalid text-lg '
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

export default CardElement