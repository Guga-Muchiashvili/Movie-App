import React, { useEffect, useState } from 'react'
import NavBar from '../components/navBarComponent'
import useTrendingListQuery from '../queries/trendingMoviesQuery'
import { useParams } from 'react-router'
import useMovieListQuery from '../queries/movieListQuery'
import FooterComponent from '../components/footerComponent'
import MovieCardElement from '../components/movieCardComponent'
import CardElement from '../elements/cardElement'


const allMoviesPage = () => {
  const movieType = useParams()
  const [page, setpage] = useState(1)
  const {data} = useMovieListQuery({type : movieType.id, page})

  console.log(data?.results)

  return (
    <div className='w-full min-h-fit relative pb-24'>
      <NavBar/>
      <div className='w-full min-h-screen flex flex-wrap px-9 justify-center gap-8'>
        {data?.results.map((item) => (
          <CardElement data={item} />
        ))}
      </div>
      <FooterComponent/>
      </div>
  )
}

export default allMoviesPage