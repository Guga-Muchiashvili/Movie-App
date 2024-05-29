import React, { useRef, useState } from 'react';
import { IoArrowBackCircleOutline, IoArrowForwardCircleOutline } from 'react-icons/io5';
import { ImovieData } from '../types/movieData.types';

interface SliderElementProps {
  data: ImovieData[] | undefined;
  listNumber: number;
  setListNumber: React.Dispatch<React.SetStateAction<number>>;
  ispopular? :boolean
}

const SliderElement: React.FC<SliderElementProps> = ({ data, listNumber, setListNumber, ispopular }) => {
  const listRef = useRef<HTMLDivElement>(null);
  const [transformX, setTransformX] = useState<number>(0);

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
    setTransformX(prev => Math.max(prev - (itemWidth + 300), 0));
  };

  console.log(data)

  return (
    <div className="flex flex-col w-full h-full px-0 md:px-10 justify-end items-start gap-3 absolute bottom-1 z-0">
      <div className={`w-40 absolute hidden lg:flex ${ispopular ? "py-10 absolute right-10 top-0" : "releative left-5 top-[-20px]"}`}>
        <IoArrowBackCircleOutline className={` absolute top-1/2 translate-y-[-50%] text-white text-5xl left-3 cursor-pointer ${ispopular ? "left-0" : "right-0" }`} onClick={handlePrevClick} />
        <IoArrowForwardCircleOutline className={`absolute top-1/2 translate-y-[-50%] text-white text-5xl right-3 cursor-pointer ${ispopular ? "right-0" : "right-0" }`} onClick={handleNextClick} />
      </div>
      <div className={`flex gap-5 w-fit overflow-x-auto lg:overflow-hidden h-3/3 justify-between px-5 items-center ${ispopular ? "pt-20 pb-1" : "" }`} ref={listRef}>
        {data?.map((item: any, i: number) => (
          <div className="transition-all duration-1000 w-1/8 h-5/6 flex-shrink-0 relative rounded-md hover:scale-125 " style={{ transform: `translateX(-${transformX}px)` }} key={i}>
            <div className={`w-full h-full cursor-pointer ${i !== listNumber ? "bg-black bg-opacity-40" : "hidden"} absolute top-0 left-0 rounded-md`} onClick={() => setListNumber(i)}></div>
            <img className={`w-full h-full transition-all rounded-lg ${i === listNumber ? "scale-110" : ""}`} src={`https://image.tmdb.org/t/p/original${item?.poster_path}`} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SliderElement;