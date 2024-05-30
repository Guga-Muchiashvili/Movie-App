import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ImovieData } from '../types/movieData.types';
import useMovieListQuery from '../queries/movieListQuery';
import NavBar from '../components/navBarComponent';
import CardElement from '../elements/cardElement';
import FooterComponent from '../components/footerComponent';
import { IoArrowBackCircleOutline, IoArrowForwardCircleOutline } from 'react-icons/io5';


const AllMoviesPage = () => {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const { data } = useMovieListQuery({ type: id, page });
  const totalPages = data?.total_pages || 1; // Default to 1 if total_pages is not available
  const paginationRef = useRef(null);

  useEffect(() => {
    if (paginationRef.current) {
      paginationRef?.current.style.transform = `translateX(${-(page - 1) * 40}px)`; // 40 is the width of each button
    }
  }, [page]);

  const handleNextClick = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrevClick = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handlePageChange = (newPage : any) => {
    setPage(newPage);
  };

  return (
    <div className='w-full min pb-40 relative flex flex-col'>
      <NavBar />
      <div className='w-full py-20 flex flex-col justify-center items-center'>
        <div className='w-full h-48 bg-blue-800'></div>
        <div className='w-full min-h-screen flex flex-wrap px-9 justify-center gap-8 py-5'>
          {data?.results.map((item, i) => (
            <CardElement i={i} data={item} key={i} />
          ))}
        </div>
        {/* Slider */}
        <div className='flex w-1/3 gap-5 z-10'>      
        <IoArrowBackCircleOutline
            className={`text-white text-5xl cursor-pointer mt-4`}
            onClick={handlePrevClick}
          />
        <div className="flex items-center gap-3 w-full overflow-x-hidden">
          <div
            ref={paginationRef}
            className='flex mt-5 transition-transform duration-300'
            style={{ display: 'flex', transform: `translateX(${-(page - 1) * 40}px)` }}
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