import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { IFilterForm } from '../types/movieData.types';
import useMovieListQuery from '../queries/movieListQuery';
import NavBar from '../components/navBarComponent';
import CardElement from '../elements/cardElement';
import FooterComponent from '../components/footerComponent';
import { IoArrowBackCircleOutline, IoArrowForwardCircleOutline } from 'react-icons/io5';
import FilterComponent from '../components/filterComponent/filterComponent';
import LoadingComponent from '../components/loadingComponent';
import MovieWithGenreQuery from '../queries/movieWithGenreQuery';
import { useAppSelector } from '../redux/hooks';
import MovieFilterQuery from '../queries/filterMovieQuery';

const AllMoviesPage = () => {
  const { id, type } = useParams();
  const [page, setPage] = useState(1);
  const { data, isLoading } = useMovieListQuery({ type: id, page, mut: type });
  const { data: genreData } = MovieWithGenreQuery({ id, page });
  const totalPages = genreData?.results.length ? genreData?.total_pages : data?.total_pages;
  const paginationRef = useRef<HTMLDivElement>(null);
  const [translateX, setTranslateX] = useState<number>(0);

  const filteredData = useAppSelector((state) => state.movies.movieList);
  const [debouncedFilteredData, setDebouncedFilteredData] = useState(filteredData);


  const debounce = (func: (newData: any) => void, delay: number) => {
    let debounceTimer: number;
    return function (this: any, ...args: []) {
      const context = this;
      clearTimeout(debounceTimer);
      debounceTimer = window.setTimeout(() => func.apply(context, args), delay);
    };
  };

  const updateDebouncedData = useCallback(debounce((newData) => {
    setDebouncedFilteredData(newData);
  }, 500), []);

  useEffect(() => {
    updateDebouncedData(filteredData);
  }, [filteredData, updateDebouncedData]);

  const { data: filterData } = MovieFilterQuery({ filteredData: debouncedFilteredData, page: page });

  const defaultValues: IFilterForm = {
    type,
    release_datelgre: "",
    release_datelte: "",
    vote_averagegte: "",
    vote_averagelte: "",
    with_genres: "",
    with_origin_country: "",
  };


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id, page]);

  const handlePrevClick = () => {
    if (translateX > 1) {
      setTranslateX(translateX - 60);
    }
  };

  useEffect(() => {
    setDebouncedFilteredData([])
  },[id, type])

  const handleNextClick = () => {
    const paginationWidth = paginationRef.current?.getBoundingClientRect().width;
    if (paginationWidth && translateX < paginationWidth - 350) {
      setTranslateX(translateX + 60);
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  if (isLoading) return <LoadingComponent />;
  return (
    <div className='w-full min pb-40 relative flex flex-col bg-[#15141F]'>
      <NavBar />
      <div className='w-full py-20 flex flex-col justify-center items-center'>
        <div className='w-full h-48'>
          {type !== 'genre' &&  <FilterComponent defaultValues={defaultValues} />}
        </div>
        <div className='w-full min-h-screen flex flex-wrap px-9 mt-80 sm:mt-24 md:mt-12 justify-center gap-8 py-5'>
          {(filterData?.results && filterData.results.length > 0) ? (
            filterData.results.map((item, i) => (
              <CardElement i={i} data={item} key={i} />
            ))
          ) : (
            (data?.results && data.results.length > 0) ? (
              data.results.map((item, i) => (
                <CardElement i={i} data={item} key={i} />
              ))
            ) : (
              genreData?.results && genreData.results.length > 0 && genreData.results.map((item, i) => (
                <CardElement i={i} data={item} key={i} />
              ))
            )
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
              className='flex mt-5 transition-all duration-700'
              style={{ display: 'flex', transform: `translateX(${-translateX}px)` }}
            >
              {Array.from({ length: filterData?.total_pages ||  totalPages || 0 }, (_, index) => (
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
