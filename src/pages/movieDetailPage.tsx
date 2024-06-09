import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import NavBar from '../components/navBarComponent'
import fetchMovideWithId from '../queries/findMovieWithIdQuery'
import fetchCreditswithMovide from '../queries/credithsWithMovide'
import CreditswithMovide from '../queries/credithsWithMovide'
import { FaDollarSign, FaStar } from 'react-icons/fa6'
import { useScroll } from 'framer-motion'
import SimilarDataQuery from '../queries/fetchSimilarQuery'
import SliderElement from '../components/sliderComponent'
import errorimg from '../../public/not found.png'
import { ICast } from '../types/movieData.types'
import LoadingComponent from '../components/loadingComponent'

const MovieDetailPage = () => {
    const {id, type} = useParams<{id : string, type : string}>()
    const {data} = fetchMovideWithId(id, type)
    const {data:credits} = CreditswithMovide(id, type)
    const {data:releatedMovies, isLoading} = SimilarDataQuery(id, type)
    const creditsData : ICast[] | undefined = credits?.cast
    const releatedData = releatedMovies?.results

    console.log(data)

    useEffect(() => {
      window.scrollTo(0, 0)
    },[id])

    console.log(releatedData)

    if(isLoading) return <LoadingComponent/>
    
  return (
    <div className='w-full h-screen '>
      <NavBar/>
      {data?.success == false?  
        <div className='w-full h-screen'>
          <h1 className='absolute top-[50%] w-full text-center left-1/2 translate-["-50%"] translate-x-[-50%] font-extrabold text-white  text-7xl'>Movie not found</h1>
          <div className='w-full h-full' style={{backgroundImage : `url(${errorimg})`, backgroundSize : "cover"}} />
        </div> : <div
          className="w-full h-screen object-cover bg-cover flex flex-col gap-10 justify-between relative  transition-all duration-1000"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${data?.backdrop_path})`,
            backgroundAttachment: "fixed",
            backgroundSize: "cover",
            backgroundRepeat : "no-repeat",
          }}
        >
          <div className='w-full min-h-screen  flex-col  text-white font-roboto bg-[#15141F]  absolute ' style={{ textShadow: "1px 1px 1px black" }}>
            <div className='w-full rounded-md h-[470px] relative lg:h-[560px]' style={{backgroundImage : `url(${data?.poster_path ? `https://image.tmdb.org/t/p/w500/${data?.poster_path}` : `https://www.shepherdsearchgroup.com/wp-content/themes/shepherd/images/no-image-found-360x250.png`},)`, backgroundSize: "cover", backgroundAttachment : "fixed", backgroundPosition : "top"}} />
            <img className='hidden lg:block w-80 h-[450px] absolute left-5 top-20 rounded-lg' src={data?.backdrop_path ? `https://image.tmdb.org/t/p/w500/${data?.backdrop_path}` : `https://www.shepherdsearchgroup.com/wp-content/themes/shepherd/images/no-image-found-360x250.png`} alt="" />
            <div className='w-full p-3 px-6 flex flex-col gap-2 lg:absolute top-20 right-4 lg:w-1/2  lg:bg-opacity-25 rounded-lg'>
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
                  {data?.vote_average }
                </h2>
              </div>
             </div>
             <div className='w-full flex gap-2 items-center justify-between py-3 lg:flex-col lg:justify-start lg:items-start'>
              <div className='flex flex-col items-start gap-2 lg:flex-row lg:items-center'>
                <h3 className='font-bold text-2xl'>Release Date</h3>
                <h4 className='text-gray-400 lg:text-white'>{data?.release_date ? data?.release_date  : "unknwon" }</h4>
              </div>
              <div className='flex flex-col items-end gap-2 lg:flex-row lg:items-center'>
                <h3 className='font-bold text-2xl'>Genre</h3>
                <div className='flex gap-2 flex-wrap'>

                {data?.genres && data?.genres.map((item) => (
                  <h4 className='text-gray-400 lg:text-white font-oswalid bg-gray-400 py-1 px-2 rounded-md bg-opacity-35 cursor-pointer'>{item.name}</h4>
                ))}
                </div>

              </div>
             </div>
             <div className='w-full'>
              <h3 className='text-xl font-extrabold'>description</h3>

             <p className='text-gray-500 lg:text-white'>{data?.overview}</p>
             </div>
          </div>
          <div className='min-h-96 relative flex flex-col  justify-start lg:mt-6'>
          <h1 className='text-2xl ml-10 font-roboto font-extrabold'>Relevant movies</h1>
          <div className='h-[300px] relative'>

       {releatedData?.results?.length > 0 ? <SliderElement isDetail={true}  data={releatedData || []} type={type || ""} /> : <h1 className='text-3xl p-5 text-white'>No results found</h1> }
          </div>
        </div>
        <div className='min-h-96 relative flex flex-col  justify-start'>
          <h1 className='text-2xl ml-10 font-roboto font-extrabold'>People in movie</h1>
          <div className='mt-1 h-[300px] relative'>
          <SliderElement isCast={true}  data={creditsData || [] } type={type || ""} />
          </div>
          </div>
        </div>
        </div>
        }
    </div>
  )
}

export default MovieDetailPage