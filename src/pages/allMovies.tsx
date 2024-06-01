import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ImovieData } from '../types/movieData.types';
import useMovieListQuery from '../queries/movieListQuery';
import NavBar from '../components/navBarComponent';
import CardElement from '../elements/cardElement';
import FooterComponent from '../components/footerComponent';
import { IoArrowBackCircleOutline, IoArrowForwardCircleOutline } from 'react-icons/io5';
import FilterComponent from '../components/filterComponent';


const AllMoviesPage = () => {
  const { id } = useParams();
  const { type } = useParams();
  const [page, setPage] = useState(1);
  const { data } = useMovieListQuery({ type: id, page, mut : type  });
  const totalPages = data?.total_pages || 1;
  const paginationRef = useRef<HTMLDivElement>(null);
  const [translateX, setTranslateX] = useState<number>(0)



  const handlePrevClick = () => {
    if (translateX > 1) {
      setTranslateX(translateX - 60);
    }
  };

  const handleNextClick = () => {
    const paginationWidth = paginationRef.current?.getBoundingClientRect().width;
    if (paginationWidth && translateX < paginationWidth) {
        setTranslateX(translateX + 60);
    }
};


  const handlePageChange = (newPage : any) => {
    setPage(newPage);
  };

  return (
    <div className='w-full min pb-40 relative flex flex-col'>
      <NavBar />
      <div className='w-full py-20 flex flex-col justify-center items-center'>
        <div className='w-full h-48 bg-blue-800'>
          <FilterComponent/>
        </div>
        <div className='w-full min-h-screen flex flex-wrap px-9 justify-center gap-8 py-5'>
          {data?.results.map((item, i) => (
            <CardElement i={i} data={item} key={i} />
          ))}
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
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                className={`mx-1 px-2 py-1 rounded-full border border-gray-300 ${
                  index + 1 === page ? 'bg-blue-500 text-white' : 'bg-white text-gray-500'
                } hover:bg-blue-600 focus:outline-none`}
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