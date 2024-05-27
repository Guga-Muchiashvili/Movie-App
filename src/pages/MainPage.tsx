import { useRef, useState } from "react";
import NavBar from "../components/navBar";
import { IoArrowBackCircleOutline, IoPlay } from "react-icons/io5";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import useTrendingListQuery from "../queries/trendingMoviesQuery";
import imdb from "../public/photos/imdb.png";

const MainPage = () => {
  const { data, isLoading } = useTrendingListQuery();
  const [listNumber, setListNumber] = useState<number>(1);
  const [transformX, setTransformX] = useState<number>(0)
  const listRef = useRef<HTMLDivElement>(null);

  const handleNextClick = () => {
    if (listRef.current) {
      const containerWidth = listRef.current.offsetWidth;
    const firstItemWidth = (listRef.current.children[0] as HTMLElement | undefined)?.offsetWidth; // Use type assertion or optional chaining
    if (!firstItemWidth) return; // Check if firstItemWidth is undefined
    const visibleItems = Math.floor(containerWidth / firstItemWidth);
    const maxTransform = Math.max(0, (data?.results.length - visibleItems) * firstItemWidth) + 300
    setTransformX(prev => Math.min(prev + containerWidth, maxTransform)); // Increase
    }
  };

  const handlePrevClick = () => {
    if(listRef.current){
      const containerWidth = listRef.current.offsetWidth;
      const itemWidth = containerWidth / data?.results.length;
      setTransformX(prev => Math.max(prev - (itemWidth + 300), 0));
    };
    }



  return (
    <div className="h-[400vh] overflow-hidden">
      <NavBar />
      <div className="w-screen h-screen bg-cover flex overflow-hidden justify-start relative">
        <div
          className="w-full h-full object-cover bg-cover overflow-hidden flex flex-col gap-10 justify-between py-20 relative"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${data?.results[listNumber]?.backdrop_path})`,
            backgroundAttachment: "fixed",
          }}
        >
          <div className="w-6/7 md:w-5/7 lg:w-4/7 xl:w-2/3 px-20 flex flex-col gap-6 lg:px-20 items-start">
            <h1 className="text-9xl font-oswalid  text-white">
              {data?.results[listNumber]?.title
                ? data?.results[listNumber]?.title
                : data?.results[listNumber]?.original_name}
            </h1>
            <div className="flex gap-2 items-end">
              <img className="w-12 h-6 text-gray-600" src={imdb} alt="" />
              <h2 className="text-white font-oswalid font-normal text-2xl">
                {data?.results[listNumber]?.vote_average.toFixed(1)}
              </h2>
              <p className="font-bold text-gray-300">
                ({data?.results[listNumber]?.vote_count})
              </p>
            </div>
            <h3 className="text-white font-ineter">
              {data?.results[listNumber]?.overview}
            </h3>
            <button className="bg-yellow-400 px-8 py-4 rounded-md text-black font-bold font-sans flex items-center gap-2">
              <IoPlay />
              Watch Trailer
            </button>
          </div>
          <div className="flex flex-col w-full h-2/6 px-10 justify-end items-start gap-3 absolute bottom-1">
            <div className="w-40 relative hidden lg:flex">
              <IoArrowBackCircleOutline className="absolute top-1/2 translate-y-[-50%] text-white text-5xl left-3 cursor-pointer"  onClick={() => handlePrevClick()}/>
              <IoArrowForwardCircleOutline className="absolute top-1/2 translate-y-[-50%]  text-white text-5xl right-3 cursor-pointer" onClick={() => handleNextClick() }/>
            </div>
            <div className={`flex gap-5 w-fit overflow-x-auto lg:overflow-hidden h-3/3 justify-between items-center`} ref={listRef}>
              {data?.results.map((item: any, i: number) => (
                <div className="transition-all duration-1000 w-1/8 h-5/6 flex-shrink-0 relative rounded-md " style={{ transform: `translateX(-${transformX}px)` }}>
                  <div
                    className={`w-full h-full cursor-pointer ${i !== listNumber ? "bg-black bg-opacity-40" : "hidden"} absolute top-0 left-0 rounded-md`}
                    onClick={() => setListNumber(i)}
                  ></div>
                  <img
                    className={`w-full h-full transition-all rounded-lg ${i === listNumber ? "scale-110" : ""}`}
                    src={`https://image.tmdb.org/t/p/original${item?.poster_path}`}
                    alt=""
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
