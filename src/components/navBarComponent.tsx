import React, { useEffect, useState } from 'react'
import { MdMenu } from "react-icons/md";
import '../App.scss'
import {motion} from 'framer-motion'
import logo from '../public/photos/logo.svg'
import { IoCloseSharp, IoSearch } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import useGenreListQuery from '../queries/genreListQuery';
import useMovieWithKeyword from '../queries/movieFilterQuery';

const NavBar = () => {

  const [showModal, setShowModal] = useState(false)
  const [scrollOpacity, setScrollOpacity] = useState(0.50);
  const [additionalLinks, setadditionalLinks] = useState(false)
  const [showGenreList, setShowGenreList] = useState(false)
  const[showSearch, setShowSearch] = useState(false)
  const [additionaltvseries, setadditionaltvseries] = useState(false)
  const {data:genreList} = useGenreListQuery({type : "movie"})
  const [keyword, setKeyword] = useState<string>('')
  const genreListData = genreList?.genres
  console.log(keyword)

  const {data} = useMovieWithKeyword({keyword})
  const navigate = useNavigate()

  console.log(data)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const maxScroll = 700;
      const opacity = Math.min(0.5 + scrollPosition / maxScroll, 1) 
      setScrollOpacity(opacity);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  return (
    <div className='w-full h-[8vh]flex items-center justify-between pl-5 pr-5 pos fixed xl:px-16 z-40' style={{ backgroundColor: `rgba(0, 0, 0, ${scrollOpacity})`, display : "flex", height : "7vh" }}>
        <div className='flex text-white items-center gap-2'>
            <img className='w-8 h-8' src={logo} alt="" />
            <h2 className='font-mono text-lg hidden sm:block'><Link className='font-oswalid' to={'/'}>GuGa Movies</Link></h2>
        </div>
        <div className='flex items-center px-10'>
    <ul className='font-oswalid text-white gap-14 hidden md:flex'>
        <li className='relative'>
            <h1 className=' duration-1000 cursor-pointer border-white border-spacing-2 transition-all hover:text-gray-400' style={{ textShadow: "1px 1px 1px black" }} onMouseEnter={() => setadditionalLinks(true)} onMouseLeave={() => setadditionalLinks(false)}>Movies</h1>
           {additionalLinks && (
            <motion.div initial={{opacity : 0}} animate={{opacity : 1}} transition={{duration : 1}} className='absolute  duration-1000 top-5 left-4/5 translate-x-[-50%] transition-all group-hover:block rounded-lg py-4 flex bg-opacity-50 w-fit px-4 gap-5'   onMouseEnter={() => setadditionalLinks(true)} onMouseLeave={() => setadditionalLinks(false)}>
              <div className='flex w-full h-fit py-3 bg-gray-900 bg-opacity-65 mt-5 px-2 rounded-md'>

             <Link to={'/movie/popular'} className='hover:scale-105 duration-200  block w-24 py-1 px-2 text-white transition-all '>Popular</Link>
             <Link to={'/movie/now_playing'} className='hover:scale-105 duration-200  block w-24 py-1 px-2 text-white'>Now playing</Link>
             <Link to={'/movie/top_rated'} className='hover:scale-105 duration-200  block w-24 py-1 px-2 text-white'>Top Rated</Link>
             </div>
          </motion.div>
           )}
        </li>
        <li className="releative">
        <h1 className='duration-1000 border-white cursor-pointer border-spacing-2 hover:text-gray-400' style={{ textShadow: "1px 1px 1px black" }} onMouseEnter={() => setadditionaltvseries(true)} onMouseLeave={() => setadditionaltvseries(false)}>Tv series</h1>
        {additionaltvseries && (
        <motion.div initial={{opacity : 0}} animate={{opacity : 1}} transition={{duration : 1}} className='absolute top-8  duration-1000 left-4/5 translate-x-[-50%] transition-all justify-center items-center group-hover:block rounded-lg py-4 flex bg-opacity-50 w-fit px-4 gap-5'   onMouseEnter={() => setadditionaltvseries(true)}  onMouseLeave={() => setadditionaltvseries(false)}>
          <div className='flex w-full h-fit py-3 bg-gray-900 bg-opacity-65 mt-5 px-2 rounded-md'>
          <Link to={'/tv/airing_today'} className='hover:scale-105 duration-200  block w-24 py-1 px-2 text-white transition-all '>Airing Today</Link>
        <Link to={'/tv/on_the_air'} className='hover:scale-105 duration-200  block w-24 py-1 px-2 text-white'>on the air</Link>
        <Link to={'/tv/top_rated'} className='hover:scale-105 duration-200  block w-24 py-1 px-2 text-white'>Top Rated</Link>
          </div>
        </motion.div>
        )}
        </li>
        
        <h1 className='hover:text-gray-400 duration-1000 border-white border-spacing-2 cursor-pointer'  style={{ textShadow: "1px 1px 1px black" }} onMouseEnter={() => setShowGenreList(true)} onMouseLeave={() => setShowGenreList(false)}>Genres</h1>
        {showGenreList && (
        <motion.div initial={{opacity : 0}} animate={{opacity : 1}} transition={{duration : 1}} className='absolute top-8   duration-1000 left-4/5 translate-x-[-30%] transition-all justify-start items-start group-hover:block rounded-lg py-4 flex bg-opacity-50 w-fit px-4 gap-5'   onMouseEnter={() => setShowGenreList(true)}  onMouseLeave={() => setShowGenreList(false)}>
          <div className='flex w-full flex-wrap justify-center items-center h-fit py-3 bg-gray-900 bg-opacity-65 mt-6 px-2 rounded-md'>
          {genreListData?.map((item) => (
             <Link to={`/genre/${item.id}`} className='hover:scale-105 duration-200  block w-24 py-1 px-2 text-white transition-all '>{item.name}</Link>
          ))}
          </div>
        </motion.div>
        )}
          </ul>
      </div>
      
        <div className='flex items-center gap-8 text-white text-3xl'>
          <div className='flex gap-1 h-full items-center'>
          {showSearch &&  <motion.input initial={{width : "0px", opacity : 0}} animate={{width : "200px", opacity : 1}} transition={{duration : .5, ease : "easeIn"}} type="text" name="" id="" placeholder='search for movie' className='pl-2 absolute left-1/2 translate-x-[-60%] md:relative w-full text-sm h-8 bg-transparent border-b-blue-500 border-b-2 outline-none' onChange={(e) => setKeyword(e.target.value)} />}
          <IoSearch className='pl-1 md:border-l-[1px] xl:text-xl cursor-pointer' onClick={() => setShowSearch(Prev => !Prev)}/>
          </div>
          
        <MdMenu className='text-4xl md:hidden' onClick={() => setShowModal(!showModal)}/>
        {data?.results.length > 0 && (
      <div className='md:w-80 flex flex-col gap-2 h-96 absolute w-64 right-14 top-10 bg-black bg-opacity-75 md:right-3 rounded-lg px-2 py-5 overflow-hidden'>
        <div className='overflow-y-auto h-full'>
          {data?.results.map((item ) => (
            <div key={item.id} className='w-full h-32 mt-3 flex gap-2'>
              <img className='w-1/3 rounded-md' src={item.poster_path?  `https://image.tmdb.org/t/p/original/${item.poster_path}` : item.profile_path ? `https://image.tmdb.org/t/p/original/${item.profile_path}` : `https://www.svgrepo.com/show/340721/no-image.svg`} alt="" />
              <div className='flex flex-col gap-4'>
              <h3 className='text-sm font-roboto font-bold'>{item.original_name ? item.original_name : item.name ? item.name : item.title ?  item.title : "unknown"}</h3>
              <h5 className='text-sm font-oswalid'>{item.media_type}</h5>
              <button className='w-20 bg-orange-400 h-7 rounded-md text-sm' onClick={() => navigate(item.media_type !== 'person' ? `/detail/${item.media_type}/${item.id}` : `/${item.media_type}/${item.id}`)} >view</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}
        </div>

        {showModal && (
          <div className='w-full h-screen absolute left-0 top-0 bg-gray-700  flex items-center justify-center'>
            <IoCloseSharp className='text-4xl absolute right-5 top-5' onClick={() => setShowModal(false)}/>
    <ul className='font-oswalid text-white gap-14 flex flex-col text-4xl justify-center items-center '>
        <li className='relative flex flex-col w-full justify-center items-center'>
            <h1 className=' duration-1000 cursor-pointer border-white border-spacing-2 transition-all hover:text-gray-200' style={{ textShadow: "1px 1px 1px black" }} onClick={() => {
              setadditionalLinks(prev => !prev)
              setadditionaltvseries(false)
            setShowGenreList(false)
              }}>Movies</h1>
           {additionalLinks && (
            <motion.div initial={{opacity : 0}} animate={{opacity : 1}} transition={{duration : 1}} className=' duration-1000  transition-all group-hover:block rounded-lg py-1 flex  px-4 gap-2'   >
              <div className='flex w-full justify-center items-center gap-1 h-fit py-3 text-black bg-opacity-65 mt-5 flex-col px-2 rounded-md'>
             <Link to={'/movie/popular'} className='hover:scale-105 duration-200 text-[20px]  block py-1 px-2  transition-all '>Popular</Link>
             <Link to={'/movie/now_playing'} className='hover:scale-105 duration-200  text-[20px] block py-1 px-2 '>Now playing</Link>
             <Link to={'/movie/top_rated'} className='hover:scale-105 duration-200  text-[20px] block  py-1 px-2 '>Top Rated</Link>
             </div>
          </motion.div>
           )}
        </li>
        <li className='relative flex flex-col w-full justify-center items-center'>
            <h1 className=' duration-1000 cursor-pointer border-white border-spacing-2 transition-all hover:text-gray-200' style={{ textShadow: "1px 1px 1px black" }} onClick={() => {
              setadditionaltvseries(prev => !prev) 
              setadditionalLinks(false)
              setShowGenreList(false)
              }}>Tv</h1>
           {additionaltvseries && (
            <motion.div initial={{opacity : 0}} animate={{opacity : 1}} transition={{duration : 1}} className=' duration-1000  transition-all group-hover:block rounded-lg py-1 flex bg-opacity-5 0 px-4 gap-5' >
              <div className='flex w-full justify-center items-center gap-1 h-fit py-3 text-black bg-opacity-65 mt-5 flex-col px-2 rounded-md'>
             <Link to={'tv/airing_today'} className='hover:scale-105 duration-200  text-[20px] block py-1 px-2  transition-all '>Airing Today</Link>
             <Link to={'/tv/on_the_air'} className='hover:scale-105 duration-200  text-[20px] block py-1 px-2 '>on the air</Link>
             <Link to={'/tv/top_rated'} className='hover:scale-105 duration-200  text-[20px] block  py-1 px-2 '>Top Rated</Link>
             </div>
          </motion.div>
           )}
        </li>
      
        
        <h1 className='hover:text-gray-400 duration-1000 border-white border-spacing-2'  style={{ textShadow: "1px 1px 1px black" }} onClick={() => 
          {
            setadditionalLinks(false)
            setadditionaltvseries(false)
            setShowGenreList(prev => !prev)
            }}>Genres</h1>
        {showGenreList && (
        <motion.div initial={{opacity : 0}} animate={{opacity : 1}} transition={{duration : 1}} className='   duration-1000 transition-all justify-center items-center group-hover:block rounded-lg py-4 flex h-fit w-full px-4 gap-5'>
          <div className='flex w-full flex-wrap justify-center text-center items-center h-full  py-3 mt-6 px-2 rounded-md'>
          {genreListData?.map((item) => (
             <Link to={`/genre/${item.id}`} className='hover:scale-105 duration-200 text-[18px] block w-24 py-1 px-2 text-black transition-all '>{item.name}</Link>
          ))}
          </div>
        </motion.div>
        )}
          </ul>
          </div>
        )}
    </div>
  )
}

export default NavBar