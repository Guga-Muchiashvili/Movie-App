import React, { useState } from "react";
import NavBar from "../components/navBarComponent";
import SliderElement from "../components/sliderComponent";
import imdb from "../public/photos/imdb.png";
import useTrendingListQuery from "../queries/trendingMoviesQuery";
import { fetchPopularMovies } from "../api/apiCalls";
import usePopularMoviesQuery from "../queries/popularMoviesQuery";
import usePopularTvShowsQuery from "../queries/popularTvShowsQuery";
import { Link } from "react-router-dom";
import upcommingMoviesQuery from "../queries/upcomingMoviesQuery";
import MovieCardElement from "../components/movieCardComponent";
import { ImovieData } from "../types/movieData.types";
import TrailerButton from "../elements/trailerButton";
import LoadingComponent from "../components/loadingComponent";
import FooterComponent from "../components/footerComponent";

const MainPage = () => {
  const { data: trendingList, isLoading  } =useTrendingListQuery();
  const { data: popularMovieList, } =usePopularMoviesQuery();
  const { data: populartvList, } =usePopularTvShowsQuery();
  const { data: upcommingList, } =upcommingMoviesQuery();
  const [listNumber, setListNumber] = useState<number>(0);
  const [listNumberPopularMovie, setNumberPopularMovie] = useState<number>(0);
  const [listNumberPopularTv, setNumberPopularTv] = useState<number>(0);

  fetchPopularMovies();

  if(isLoading){
    return <LoadingComponent/>
  }

  return (
    <div className="min-h-fit overflow-hidden relative pb-48">
      <NavBar />
      <div className="w-screen h-screen bg-cover flex overflow-hidden justify-start relative">
        <div
          className="w-full h-full object-cover bg-cover overflow-hidden flex flex-col gap-10 justify-between py-20 relative transition-all duration-1000"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${trendingList?.results[listNumber]?.backdrop_path})`,
            backgroundAttachment: "fixed",
          }}
        >
          <div className="w-6/7 py-8 md:w-5/7 lg:w-6/7 xl:w-3/4 px-2 md:px-20 flex flex-col gap-3 lg:px-20 items-start">
            <h1
              className="text-4xl lg:text-6xl xl:text-6xl font-oswalid  text-white "
              style={{ textShadow: "1px 1px 1px black" }}
            >
              {trendingList?.results[listNumber]?.title
                ? trendingList?.results[listNumber]?.title
                : trendingList?.results[listNumber]?.original_name}
            </h1>
            <div className="flex gap-2 items-end">
              <img className="w-12 h-6 text-gray-600" src={imdb} alt="" />
              <h2 className="text-white font-oswalid font-normal text-2xl">
                {trendingList?.results[listNumber]?.vote_average.toFixed(1)}
              </h2>
              <p className="font-bold text-gray-300">
                ({trendingList?.results[listNumber]?.vote_count})
              </p>
            </div>
            <h3
              className="text-white text-[12px] md:text-md xl:text-md font-ineter"
              style={{ textShadow: "1px 1px 1px black" }}
            >
              {trendingList?.results[listNumber]?.overview}
            </h3>
            <TrailerButton type={'movie'} data={trendingList && trendingList?.results[listNumber]} size={'normal'}/>
          </div>
          <div className="h-2/6 absolute bottom-1 w-full">
            <SliderElement
              type={'movie'}
              data={trendingList?.results}
              listNumber={listNumber}
              setListNumber={setListNumber}
            />
          </div>
        </div>
      </div>
      <div className="w-full mt-20 min-h-screen bg-gray-700 py-7 px-2 sm:px-5 md:px-9 lg:px-12 xl:px-16 justify-center flex flex-col items-center gap-5"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${trendingList?.results[listNumber]?.backdrop_path})`,
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
      }}>
        <h1 className="text-xl md:text-3xl lg:text-5xl xl:text-6xl tracking-wider text-left w-full le font-roboto font-extrabold text-white">Upcomming Movies</h1>
        <div className="flex flex-wrap w-full h-full gap-10 justify-center md:justify-around lg:justify-between ">
        {upcommingList?.results.slice(0, 6).map((item: ImovieData, i: number) => (
          <MovieCardElement type={'movie'} key={i} data={item} />
        ))}
        </div>
      </div>
      <div className="w-full min-h-[110vh] py-20 flex items-center flex-col gap-5 justify-between">
        <div
          className="w-full md:w-[95%] h-[409px] py-20  relative rounded-lg overflow-hidden transition-all duration-1000"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${popularMovieList?.results[listNumberPopularMovie]?.backdrop_path})`,
            backgroundAttachment: "fixed",
            objectFit: "fill",
            backgroundSize: "cover",
          }}
        >
          <div className="flex gap-5 absolute top-0 w-full items-end px-14 h-fit py-8">
          <h1
            className="text-white text-3xl md:text-5xl font-oswalid top-4 left-10"
            style={{ textShadow: "1px 1px 1px black" }}
          >
            Popular Moviess
          </h1>
          <Link className="text-white cursor-pointer z-20" to={'/movie/popular'}>See all</Link>
          </div>
          <SliderElement
            data={popularMovieList?.results}
            listNumber={listNumberPopularMovie}
            ispopular={true}
            setListNumber={setNumberPopularMovie}
            type={'movie'}
          />
        </div>

        <div
          className="w-full md:w-[95%] h-[409px] py-20  relative rounded-lg transition-all duration-1000"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${populartvList?.results[listNumberPopularTv]?.backdrop_path})`,
            backgroundAttachment: "fixed",
            objectFit: "fill",
            backgroundSize: "cover",
          }}
        >
          <h1
            className="text-white text-3xl md:text-5xl font-oswalid absolute top-4 left-10"
            style={{ textShadow: "1px 1px 1px black" }}
          >
            Popular Tv series
          </h1>
          <SliderElement
            data={populartvList?.results}
            listNumber={listNumberPopularTv}
            ispopular={true}
            setListNumber={setNumberPopularTv}
            type={'tv'}
          />
        </div>
        
      </div>
      <FooterComponent/>
    </div>
    
  );
};

export default MainPage;
