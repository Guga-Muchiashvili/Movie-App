import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import schema from './filterComponent.schema';
import useGenreListQuery from '../../queries/genreListQuery';
import { IFilterForm } from '../../types/movieData.types';
import useCountryListQuery from '../../queries/countryListQuery';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { setMovieData } from '../../redux/slices/movies/moviesSlice';
import { useAppDispatch } from '../../redux/hooks';

const FilterComponent = ({page, defaultValues} : {page : number, defaultValues : IFilterForm}) => {
  const { register, handleSubmit, watch, control, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });
  console.log(errors)
  
  const listType = watch('type');
  const genres = watch('with_genres')

  const { data: genreList } = useGenreListQuery({ type: listType });
  const { data: countryData } = useCountryListQuery();
  const [genre, setgenres] = useState<string>('')
  const dispatch = useAppDispatch()

  useEffect(() => {
    reset(defaultValues)
  },[])
  
  useEffect(() => {
    if (genres) {
      setgenres((prev : string) => prev ? `${prev}-${genres}` : genres);
    }
  }, [genres]);

  useEffect(() => {
    setgenres('')
  },[listType])

  const submit = (val: IFilterForm) => {
   const data : IFilterForm = {
    ...val,
    with_genres : genre,
   }
   console.log(data)
   dispatch(setMovieData({...data, page : page}))
  };

  return (
    <form onChange={handleSubmit(submit)} className='flex w-full h-full items-center justify-center min-h-fit py-6 flex-wrap gap-5'>
      <select className='w-40 h-12 px-2 rounded-md outline-none border-blue-400 bg-slate-600 text-blue-400 bg-opacity-50 border' id="type" {...register('type')}>
        <option className='bg-slate-700' value="movie">Movie</option>
        <option className='bg-slate-700' value="tv">TV</option>
      </select>
      
      <select className='w-40 h-12 px-2 rounded-md outline-none border-blue-400 bg-slate-600 text-blue-400 bg-opacity-50 border' id="genres" {...register('with_genres')}>
        {Array.isArray(genreList?.genres) && genreList.genres.map((genre) => (
          <option  className='bg-slate-700' key={genre.id} value={genre.id}>{genre.name}</option>
        ))}
      </select>
      
      <input className='w-40 h-12 px-2 rounded-md outline-none border-blue-400 bg-slate-600 text-blue-400 bg-opacity-50 border' type="date" {...register('release_dategte')} placeholder="Start Date" />
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
