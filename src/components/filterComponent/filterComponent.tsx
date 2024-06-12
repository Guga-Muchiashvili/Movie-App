import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react'
import { useForm } from 'react-hook-form';
import schema from './filterComponent.schema';
import useGenreListQuery from '../../queries/genreListQuery';
import { IFilterForm } from '../../types/movieData.types';

const FilterComponent = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver : yupResolver(schema)
  });
  const listType = watch('type')

  const {data:genreList} = useGenreListQuery({type : listType})

  console.log(genreList)

  const submit = (val : IFilterForm) => {
    console.log(val)
  }


  return (
    <div>
      <select id="cars" {...register('type')}>
      <option value="movie">movie</option>
      <option value="tv">tv</option>
      </select>
      <select id="cars" {...register('genres')}>
        {genreList?.genres?.map((genre) => (
          <option value={genre.id}>{genre.name}</option>
        ))}
      </select>
    <button onClick={handleSubmit(submit)}>Submit</button>
    </div>
  )
}

export default FilterComponent