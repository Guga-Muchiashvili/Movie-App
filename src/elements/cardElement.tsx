import React, { useState } from "react";
import imdb from "../public/photos/imdb.png";
import { IMovieDetails, ImovieData } from "../types/movieData.types";
import { IoPlay } from "react-icons/io5";
import TrailerButton from "./trailerButton";
import {motion} from 'framer-motion'
import { useParams } from "react-router";

interface ImovieCardProps {
  data: ImovieData ;
  i: number
}

const CardElement = ({ data, i }: ImovieCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const {type} = useParams()

  return (
    <motion.div
      key={i}
      initial = {{opacity : 0, translateY : -10, scale : 1.05 }}
      animate ={{opacity : 1, translateY : 0, scale : 1}}
      transition={{duration : .8, delay : 0.1 * i, ease : "easeInOut"}}
      className="w-full relative cursor-pointer transition-all duration-1000 sm:w-2/6 md:w-2/5 lg:w-[46%] xl:w-72 h-[400px] rounded-sm overflow-hidden text-white flex flex-col gap-1 font-oswalid text-2xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <div className="absolute top-0 left-0 h-full w-full  bg-opacity-50 transition-all duration-1000 z-10"></div>
      )}
      <div className="w-full h-full  ">
        <img
          className={`w-full h-full rounded-md transition-all duration-1000 object-cover ${
            isHovered && "scale-110"
          }`}
          src={data?.backdrop_path ? `https://image.tmdb.org/t/p/original${data?.backdrop_path}` : "https://www.shepherdsearchgroup.com/wp-content/themes/shepherd/images/no-image-found-360x250.png"}
          alt=""
        />
      </div>
      <div className="w-full flex flex-col items-center pt-2 gap-3 absolute z-30 h-full " >
        <h3
          className={`text-white font-oswalid text-lg transition-all duration-700 ${
            isHovered ? "text-[32px] text-center px-1 mt-6 z-20" : ""
          }`}
          style={{ textShadow: "1px 1px 1px black" }}
        >
          { data?.original_name}
        </h3>
        {isHovered !== true ? (
          <>
            <h3 className="text-lg absolute left-2 bottom-2 z-20  bg-opacity-60 px-4 rounded-lg py-[2px]">
              {data?.vote_average.toFixed(1)}
            </h3>
            <h3 className="ml-5 text-sm absolute z-20 right-2 bottom-2   bg-opacity-60 px-4 rounded-lg py-[4px]">
              ({data?.release_date?.split("-")[0]})
            </h3>
          </>
        ) : (
          <div className="w-full h-fit py-8 absolute bottom-0 flex flex-col items-center">
            <TrailerButton type={type !== 'genre' ? type : "movie"} data={data} size={'small'} />
          </div>
        )}{" "}
      </div>
    </motion.div>
  );
};

export default CardElement;
