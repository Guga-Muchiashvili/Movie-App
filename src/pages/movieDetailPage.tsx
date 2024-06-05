import React from 'react'
import { useParams } from 'react-router'
import NavBar from '../components/navBarComponent'
import fetchMovideWithId from '../queries/movieWithId'
import fetchCreditswithMovide from '../queries/credithsWithMovide'
import CreditswithMovide from '../queries/credithsWithMovide'

const MovieDetailPage = () => {
    const {id} = useParams<string>()
    const {data} = fetchMovideWithId(id)
    const {data:credits} = CreditswithMovide(id)


    console.log(credits)
    
  return (
    <div className='w-full '>
      <NavBar/>
      <div className='w-full h-[90vh]'>
        <img className='w-full h-full' src={`https://image.tmdb.org/t/p/original${data?.backdrop_path}`} alt="" />
      </div>
    </div>
  )
}

export default MovieDetailPage