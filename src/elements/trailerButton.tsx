import React from 'react'
import { IoPlay } from 'react-icons/io5'

const TrailerButton = () => {
  return (
    <button className="bg-yellow-400 px-3 py-2 lg:py-4 lg:px-7 rounded-md text-black font-bold font-sans flex items-center gap-2">
    <IoPlay />
    Watch Trailer
  </button>
  
)
}

export default TrailerButton