import React from 'react'
import { IoPlay } from 'react-icons/io5'
import {motion} from 'framer-motion'
import { useNavigate } from 'react-router'
import { ImovieData } from '../types/movieData.types'

const TrailerButton = ({size, data, type } : {size : string, data: ImovieData | null, type? : string}) => {
  const navigate = useNavigate()
  return (
<motion.button 
    initial={{opacity: "0"}} 
    animate={{opacity: "100"}} 
    transition={{duration: "200"}} 
    className={`bg-yellow-400 hover:scale-90 z-10 transition-all duration-1000 px-3 py-2 ${size === 'small' ? 'lg:py-2 px-4 text-sm text-gray-800' : "lg:py-4 lg:px-7 text-xl"} rounded-md text-black font-bold font-sans flex items-center gap-2`} 
    onClick={() => navigate(`/detail/${type}/${data?.id}`)}>
    <IoPlay />
    Watch Trailer
</motion.button>    
  
)
}

export default TrailerButton