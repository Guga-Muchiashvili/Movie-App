import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ImovieData } from '../types/movieData.types';
import useMovieListQuery from '../queries/movieListQuery';
import NavBar from '../components/navBarComponent';
import CardElement from '../elements/cardElement';
import FooterComponent from '../components/footerComponent';
import { IoArrowBackCircleOutline, IoArrowForwardCircleOutline } from 'react-icons/io5';
import FilterComponent from '../components/filterComponent';
import LoadingComponent from '../components/loadingComponent';
import movieWithGenreQuery from '../queries/movieWithGenreQuery';


const AllMoviesPage = () => {
  const { id } = useParams();
  const { type } = useParams();
  const [page, setPage] = useState(1);
  const { data, isLoading } = useMovieListQuery({ type: id, page, mut : type  });
  const {data: genreData} = movieWithGenreQuery({id})
  let totalPages = genreData?.results.length ? genreData?.total_pages : data?.total_pages
  const paginationRef = useRef<HTMLDivElement>(null);
  const [translateX, setTranslateX] = useState<number>(0)


  console.log(totalPages)

  console.log(genreData)

  useEffect(() => {
    window.scrollTo(0, 0)
  },[id, page])



  const handlePrevClick = () => {
    if (translateX > 1) {
      setTranslateX(translateX - 60);
    }
  };

  const handleNextClick = () => {
    const paginationWidth = paginationRef.current?.getBoundingClientRect().width;
    if (paginationWidth && translateX < paginationWidth - 350) {
        setTranslateX(translateX + 60);
    }
};


  const handlePageChange = (newPage : any) => {
    setPage(newPage);
  };

  if(isLoading) return <LoadingComponent/>
  return (
    <div className='w-full min pb-40 relative flex flex-col bg-[#15141F]'>
      
      <NavBar />
      <div className='w-full py-20 flex flex-col justify-center items-center'>
        <div className='w-full h-48 bg-blue-800'>
          <FilterComponent/>
        </div>
        <div className='w-full min-h-screen flex flex-wrap px-9 justify-center gap-8 py-5'>
        {(data?.results && data.results.length > 0) ? (
          data.results.map((item, i) => (
            <CardElement i={i} data={item} key={i} />
          ))
        ) : (
          genreData?.results && genreData.results.length > 0 && genreData.results.map((item, i) => (
            <CardElement i={i} data={item} key={i} />
          ))
        )}
        </div>
        {/* Slider */}
        <div className='flex w-4/5 md:w-3/5 lg:w-1/3 xl:w-1/4 gap-5 z-10'>      
        <IoArrowBackCircleOutline
            className={`text-white text-5xl cursor-pointer mt-4`}
            onClick={handlePrevClick}
          />
        <div className="flex items-center gap-3 w-full overflow-x-hidden">
          <div
            ref={paginationRef}
            className='flex mt-5  transition-all duration-700'
            style={{ display: 'flex', transform: `translateX(${-translateX}px)` }}
          >
            {Array.from({ length: totalPages ?? 0 }, (_, index) => (
              <button
                key={index}
                className={`mx-1 px-2 py-1 w-10 h-10 rounded-full border  ${
                  index + 1 === page ? 'bg-gray-600 text-white' : 'bg-white text-black font-bold'
                } hover:bg-gray-500 bg-opacity-80 focus:outline-none`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
        <IoArrowForwardCircleOutline
            className={`text-white text-5xl cursor-pointer mt-4 z-10`}
            onClick={handleNextClick}
          />
        </div>
      </div>
      <FooterComponent />
    </div>
  );
};

export default AllMoviesPage;