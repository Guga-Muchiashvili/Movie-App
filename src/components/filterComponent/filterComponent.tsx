import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import schema from './filterComponent.schema';
import useGenreListQuery from '../../queries/genreListQuery';
import useCountryListQuery from '../../queries/countryListQuery';
import { IFilterForm } from '../../types/movieData.types';
import { setMovieData } from '../../redux/slices/movies/moviesSlice';
import { useAppDispatch } from '../../redux/hooks';
import debounce from 'lodash/debounce'
import { useParams } from 'react-router';

const FilterComponent = ({ defaultValues }: { defaultValues: IFilterForm }) => {
  const { register, handleSubmit, reset} = useForm({
    resolver: yupResolver(schema),
  });

  const {type} = useParams()


  const { data: genreList } = useGenreListQuery({ type });
  const { data: countryData } = useCountryListQuery();
  const dispatch = useAppDispatch();

  const debouncedSubmit = debounce((val: IFilterForm) => {
    console.log(val)
    const data: IFilterForm = {
      ...val,
    };
    dispatch(setMovieData({ ...data}));
  }, 500)

  useEffect(() => {
    reset(defaultValues);
  }, []);



  const onSubmit = (formData: IFilterForm) => {
    debouncedSubmit(formData);
  };

  return (
    <form onChange={handleSubmit(onSubmit)} className='flex w-full h-full items-center justify-center min-h-fit py-6 flex-wrap gap-5'>
      <select className='w-40 h-12 px-2 rounded-md outline-none border-blue-400 bg-slate-600 text-blue-400 bg-opacity-50 border' id="type" {...register('type')}>
        <option className='bg-slate-700' value={type}>{type}</option>
      </select>
      
      <select className='w-40 h-12 px-2 rounded-md outline-none border-blue-400 bg-slate-600 text-blue-400 bg-opacity-50 border' id="genres" {...register('with_genres')}>
        {Array.isArray(genreList?.genres) && genreList.genres.map((genre) => (
          <option className='bg-slate-700' key={genre.id} value={genre.id}>{genre.name}</option>
        ))}
      </select>
      
      <input className='w-40 h-12 px-2 rounded-md outline-none border-blue-400 bg-slate-600 text-blue-400 bg-opacity-50 border' type="date" {...register('release_datelgre')} placeholder="Start Date" />
      <input className='w-40 h-12 px-2 rounded-md outline-none border-blue-400 bg-slate-600 text-blue-400 bg-opacity-50 border' type="date" {...register('release_datelte')} placeholder="End Date" />
      <input className='w-40 h-12 px-2 rounded-md outline-none border-blue-400 bg-slate-600 text-blue-400 bg-opacity-50 border' type="text" {...register('vote_averagegte')} placeholder="Min IMDB" />
      <input className='w-40 h-12 px-2 rounded-md outline-none border-blue-400 bg-slate-600 text-blue-400 bg-opacity-50 border' type="text" {...register('vote_averagelte')} placeholder="Max IMDB" />
      
      <select className='w-40 h-12 px-2 rounded-md outline-none border-blue-400 bg-slate-600 bg-opacity-50 text-blue-400  border' {...register('with_origin_country')} >
        {Array.isArray(countryData) && countryData.map((item) => (
          <option className='bg-slate-700' key={item.iso_3166_1} value={item.iso_3166_1}>{item.english_name}</option>
        ))}
      </select>
      
    </form>
  );
};

export default FilterComponent;
