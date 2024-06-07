import React from 'react'
import { useParams } from 'react-router'
import NavBar from '../components/navBarComponent'
import fetchMovideWithId from '../queries/movieWithId'
import fetchCreditswithMovide from '../queries/credithsWithMovide'
import CreditswithMovide from '../queries/credithsWithMovide'
import imdb from '../public/photos/imdb.png'
import CardElement from '../elements/cardElement'
import MovieCardElement from '../components/movieCardComponent'
import { FaDollarSign, FaStar } from 'react-icons/fa6'
import { useScroll } from 'framer-motion'
import SimilarDataQuery from '../queries/fetchSimilarQuery'
import SliderElement from '../components/sliderComponent'

const MovieDetailPage = () => {
    const {id, type} = useParams<{id : string, type : string}>()
    const {data} = fetchMovideWithId(id, type)
    const {data:credits} = CreditswithMovide(id, type)
    const {data:releatedMovies} = SimilarDataQuery(id, type)

    console.log(releatedMovies)


    console.log(data)
    console.log(credits)
    
  return (
    <div className='w-full h-screen '>
      <NavBar/>
      <div
          className="w-full h-3/4 object-cover bg-cover flex flex-col gap-10 justify-between relative  transition-all duration-1000"
          // style={{
          //   backgroundImage: `url(https://image.tmdb.org/t/p/original/${data?.backdrop_path})`,
          //   backgroundAttachment: "fixed",
          //   backgroundSize: "cover",
          //   backgroundRepeat : "no-repeat",
          // }}
        >
          <div className='w-full min-h-screen  flex-col  text-white font-roboto bg-[#15141F]  absolute '>
            <img className='w-full rounded-md h-[470px] lg:h-3/4 ' src={data?.backdrop_path ? `https://image.tmdb.org/t/p/w500/${data?.backdrop_path}` : `https://www.shepherdsearchgroup.com/wp-content/themes/shepherd/images/no-image-found-360x250.png` } alt="" />
            <div className='w-full p-3 px-10 flex flex-col gap-2'>
            <div className=' top-0 left-0 h-120 flex items-start border-b-gray-500 border-b-[1px] pb-3 flex-col gap-4 text-white font-oswalid' style={{ textShadow: "1px 1px 1px black" }}>
              <div className='flex items-center gap-5'>
              <h1 className=' text-4xl'>{data?.original_title || data?.original_name }</h1>
              <h4 className='bg-gray-500 py-1 px-2 rounded-md bg-opacity-80'>{data?.origin_country}</h4>
              </div>
              <div className='flex items-center gap-6'>
                <h2 className=' flex items-center'>
                <FaDollarSign />
                  {data?.budget}
                </h2>
                <h2 className=' flex items-center gap-2'>
                <FaStar />
                  {data?.vote_average}
                </h2>
              </div>
             </div>
             <div className='w-full flex gap-2 items-center justify-between py-3'>
              <div className='flex flex-col items-start gap-2 '>
                <h3 className='font-bold text-2xl'>Release Date</h3>
                <h4 className='text-gray-400'>{data?.release_date ? data?.release_date : data?.first_air_date }</h4>
              </div>
              <div className='flex flex-col items-end gap-2'>
                <h3 className='font-bold text-2xl'>Genre</h3>
                <div className='flex gap-2 flex-wrap'>

                {data?.genres.map((item) => (
                  <h4 className='text-gray-400'>{item.name}</h4>
                ))}
                </div>

              </div>
             </div>
             <div className='w-full'>
              <h3 className='text-xl font-extrabold'>description</h3>

             <p className='text-gray-500'>{data?.overview}</p>
             </div>
          </div>
          <div className='h-72 relative flex flex-col  justify-start'>
          <h1 className='text-2xl ml-10 font-roboto font-extrabold'>Relevant movies</h1>
          <div className='h-5/6 relative'>

          <SliderElement isDetail={true}  data={releatedMovies?.results} type={type || ""} />
          </div>
          <div className='h-5/6 relative'>

          <SliderElement isDetail={true}  data={credits?.cast} type={type || ""} />
          </div>
        </div>
        </div>
        </div>
    </div>
  )
}

export default MovieDetailPage