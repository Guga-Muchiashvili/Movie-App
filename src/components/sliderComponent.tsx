import React, { useRef, useState } from 'react';
import { IoArrowBackCircleOutline, IoArrowForwardCircleOutline } from 'react-icons/io5';
import { ICast, ICredits, ImovieData } from '../types/movieData.types';
import {motion} from 'framer-motion'
import TrailerButton from '../elements/trailerButton';
import { useNavigate } from 'react-router'

interface SliderElementProps {
  data: ImovieData[] | ICast[] ;
  listNumber?: number;
  setListNumber?: React.Dispatch<React.SetStateAction<number>>;
  ispopular? :boolean,
  type : string,
  isDetail?: boolean,
  isCast? : boolean
}


const SliderElement: React.FC<SliderElementProps> = ({ data, listNumber, setListNumber, ispopular, type, isDetail, isCast }) => {
  const listRef = useRef<HTMLDivElement>(null);
  const [transformX, setTransformX] = useState<number>(0);
  const navigate = useNavigate()
  const [isclicked, setclicked] = useState<{clicked : boolean, itemInfo : ImovieData | []}>({
    clicked : false,
    itemInfo : []
  })
  
  console.log(data)

  const handleNextClick = () => {
    if (!listRef.current || !data) return;
    const containerWidth = listRef.current.offsetWidth;
    const firstItemWidth = (listRef.current.children[0] as HTMLElement | undefined)?.offsetWidth;
    if (!firstItemWidth) return;
    const visibleItems = Math.floor(containerWidth / firstItemWidth);
    const maxTransform = Math.max(0, ((data?.length ?? 0) - visibleItems) * firstItemWidth) + 300;
    setTransformX(prev => Math.min(prev + containerWidth, maxTransform));
  };

  const handlePrevClick = () => {
    if (!listRef.current || !data) return;
    const containerWidth = listRef.current.offsetWidth;
    const itemWidth = data?.length ? containerWidth / data.length : 0;
    setTransformX(prev => Math.max(prev - (itemWidth + 700), 0));
  };

  
  return (
    <div className="flex flex-col w-full h-full px-0 md:px-10 justify-end items-start gap-3 absolute bottom-1 z-0 ">
            {!isclicked.clicked ? (
              <>
              <div className={`w-40 absolute hidden  h-20 z-40 lg:flex ${ispopular ? "py-10 absolute right-10 top-0" : "releative left-5 top-[-60px]"}`}>
        <IoArrowBackCircleOutline className={` absolute top-1/2 translate-y-[-50%] text-white text-5xl left-3 cursor-pointer ${ispopular ? "left-0" : "right-0" }`} onClick={handlePrevClick} />
        <IoArrowForwardCircleOutline className={`absolute top-1/2 translate-y-[-50%] text-white text-5xl right-3 cursor-pointer ${ispopular ? "right-0" : "right-0" }`} onClick={handleNextClick} />
      </div>
        <motion.div id='scrollbar' key={''} initial={{opacity : 0}} animate={{opacity : 1}} transition={{duration : .8}} className={`flex gap-5 w-fit overflow-x-auto lg:${isDetail ? "overflow-x-auto" : "overflow-hidden"} h-3/3 justify-between px-5 items-center ${ispopular ? "pt-20 pb-1" : "" }`} ref={listRef}>
        {data?.map((item, i: number) => (
          <div className="transition-all duration-1000 w-1/8 h-5/6 flex-shrink-0 relative rounded-md hover:scale-125 " style={{ transform: `translateX(-${transformX}px)` }} key={i} onClick={() => ispopular ? setclicked({clicked : true, itemInfo : item}) : isDetail ? navigate(`/detail/${type}/${item.id}}`) : isCast ?  navigate(`/person/${item.id}}`) : "" }>
            <div className={`w-full h-full cursor-pointer ${i !== listNumber ? "bg-black bg-opacity-40" : "hidden"} absolute top-0 left-0 rounded-md`} onClick={() => setListNumber && setListNumber(i)}></div>
            <img loading='lazy' className={`w-full h-full transition-all rounded-lg ${i === listNumber ? "scale-110" : ""}`}   src={`${item.poster_path ? `https://image.tmdb.org/t/p/original${item.poster_path}` : item.profile_path  ? `https://image.tmdb.org/t/p/original${item.profile_path}` : "https://static.vecteezy.com/system/resources/thumbnails/022/014/063/small_2x/missing-picture-page-for-website-design-or-mobile-app-design-no-image-available-icon-vector.jpg"}`}
              alt="" />
          </div>
        ))}
      </motion.div>
      </>
          ) : (
            <motion.div className='w-full h-[120%] bg-black gap-5 bg-opacity-60 top-0 absolute left-0 rounded-md flex flex-col items-center justify-center'>
              <motion.h1 initial={{opacity : 0, translateY : -10}} animate={{opacity : 1, translateY : 0}} transition={{duration : .5}} className='text-white font-roboto text-2xl text-center md:text-4xl xl:text-8xl font-extrabold'>
              {isclicked?.itemInfo && ('original_name' in isclicked.itemInfo) ? isclicked.itemInfo.original_name : ''}
              </motion.h1>
              <TrailerButton  type={type} data={data[listNumber || 0] || null} size={'normal'}/>
              <motion.h1 key={'back'} initial={{opacity : 0, }} animate={{opacity : 1,}} transition={{duration : 1.5}} className='text-white cursor-pointer font-oswalid text-2xl' onClick={() => setclicked({clicked : false, itemInfo : []})}>
              back 
              </motion.h1>
              
            </motion.div>
          ) }
      
    </div>
  );
};

export default SliderElement;