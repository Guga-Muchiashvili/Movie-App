import React from 'react'
import { useParams } from 'react-router'
import NavBar from '../components/navBarComponent'
import fetchMovideWithId from '../queries/movieWithId'
import fetchCreditswithMovide from '../queries/credithsWithMovide'
import CreditswithMovide from '../queries/credithsWithMovide'
import imdb from '../public/photos/imdb.png'
import CardElement from '../elements/cardElement'
import MovieCardElement from '../components/movieCardComponent'

const MovieDetailPage = () => {
    const {id, type} = useParams<{id : string, type : string}>()
    const {data} = fetchMovideWithId(id, type)
    const {data:credits} = CreditswithMovide(id, type)


    console.log(data)
    console.log(credits)
    
  return (
    <div className='w-full h-screen '>
      <NavBar/>
      <div
          className="w-full h-3/4 object-cover bg-cover flex flex-col gap-10 justify-between py-40 relative  transition-all duration-1000"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${data?.backdrop_path})`,
            backgroundAttachment: "fixed",
            backgroundSize: "cover",
            backgroundRepeat : "no-repeat",
          }}
        >
          <div className='w-full h-fit pb-40 flex-col lg:flex-row  top-[15%] md:top-[35%] lg:top-[65%]  absolute py-5  bg-opacity-30 flex px-2 md:px-10 lg:px-28 xl:px-40'>
            <img className='w-full lg:w-[350px] rounded-md h-[470px]' src={`https://image.tmdb.org/t/p/w500/${data?.backdrop_path}`} alt="" />
            <div className='w-full md:w-2/3  h-96 pl-2 flex flex-col gap-2'>
            <div className=' top-0 left-0 h-120 flex items-start flex-col gap-2 text-white font-oswalid' style={{ textShadow: "1px 1px 1px black" }}>
              <h1 className=' text-4xl'>{data?.original_title}</h1>
              <div className=' flex items-center gap-2'>
                <h4 className=''>
                  {data?.release_date.split('-')[0]}
                </h4>
                <h3>
                  {data?.origin_country}
                </h3>
                <h2 className='flex gap-2'>
                  {data?.spoken_languages.map((en) => (
                    <p>{en.name}</p>
                  ))}
                </h2>
               </div>
            </div>
            <div className='flex gap-2'>
              {data?.genres.map((item) => (
                <p className='py-1 px-2 bg-black text-white font-oswalid rounded-md bg-opacity-30'>{item.name}</p>
              ))}
            </div>
            <div className='w-full gap-5 flex items-end'>
                  <div className='w-24 h-24 lg:w-32 lg:h-32 bg-yellow-500 rounded-md flex flex-col justify-center items-center'>
                    <h1 className='text-black font-ineter text-3xl md:text-6xl font-extrabold '>{data?.vote_average.toFixed(1)}</h1>
                    <h2 className='font-extrabold text-sm'>IMDB rating</h2>
                  </div>
                  <div className='border-r-2 border-black pr-2'>
                  <h3 className='text-xl md:text-2xl font-oswalid font-extrabold'>{data?.vote_count}</h3>
                  <h2 className='text-black font-ineter font-extrabold '>Vote Count</h2>
                  </div>
                  <div>
                  <h3 className='text-xl md:text-3xl font-oswalid font-extrabold'>{data?.budget}$</h3>
                  <h2 className='text-black font-ineter font-extrabold '>Budget</h2>
                  </div>
              </div>
              <h2 className='text-black font-roboto font-bold'>{data?.tagline}</h2>
              <h5 className='text-sm w-full text-gray-500 font-bold   lg:w-full md:text-md xl:text-md'>
                  {data?.overview}
                </h5>
                <h1 className='text-xl font-bold '>{data?.status}</h1>
            </div>
          </div>
        </div>
    </div>
  )
}

export default MovieDetailPage