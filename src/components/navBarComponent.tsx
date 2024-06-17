import React, { useEffect, useState } from 'react'
import { MdMenu } from "react-icons/md";
import '../App.scss'
import {motion} from 'framer-motion'
import logo from '../public/photos/logo.svg'
import { IoCloseSharp, IoSearch } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import useGenreListQuery from '../queries/genreListQuery';

const NavBar = () => {

  const [showModal, setShowModal] = useState(false)
  const [scrollOpacity, setScrollOpacity] = useState(0.50);
  const [additionalLinks, setadditionalLinks] = useState(false)
  const [showGenreList, setShowGenreList] = useState(false)
  const[showSearch, setShowSearch] = useState(false)
  const [additionaltvseries, setadditionaltvseries] = useState(false)
  const {data:genreList} = useGenreListQuery({type : "movie"})
  const genreListData = genreList?.genres
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
            <h2 className='font-mono text-lg'><Link className='font-oswalid' to={'/'}>GuGa Movies</Link></h2>
        </div>
        <div className='flex items-center px-10'>
    <ul className='font-oswalid text-white gap-14 hidden md:flex'>
        <li className='relative'>
            <Link className=' duration-1000 border-white border-spacing-2 transition-all hover:text-gray-400' to={'/'} style={{ textShadow: "1px 1px 1px black" }} onMouseEnter={() => setadditionalLinks(true)} onMouseLeave={() => setadditionalLinks(false)}>Movies</Link>
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
        <Link className='duration-1000 border-white border-spacing-2 hover:text-gray-400' to={'/'} style={{ textShadow: "1px 1px 1px black" }} onMouseEnter={() => setadditionaltvseries(true)} onMouseLeave={() => setadditionaltvseries(false)}>Tv series</Link>
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
        
        <Link className='hover:text-gray-400 duration-1000 border-white border-spacing-2' to={'/'} style={{ textShadow: "1px 1px 1px black" }} onMouseEnter={() => setShowGenreList(true)} onMouseLeave={() => setShowGenreList(false)}>Genres</Link>
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
          {showSearch &&  <motion.input initial={{width : "0px"}} animate={{width : "250px"}} transition={{duration : .5, ease : "easeIn"}} type="text" name="" id="" placeholder='search for movie' className='w-80 pl-2 text-sm h-8 bg-transparent border-b-blue-500 border-b-2 outline-none' />}
          <IoSearch className='pl-1 md:border-l-[1px] xl:text-xl cursor-pointer' onClick={() => setShowSearch(Prev => !Prev)}/>
          </div>
          
        <MdMenu className='text-4xl md:hidden' onClick={() => setShowModal(!showModal)}/>
        </div>

        {showModal && (
          <div className='w-full h-screen absolute left-0 top-0 bg-white bg-opacity-95 flex items-center justify-center'>
            <IoCloseSharp className='text-4xl absolute right-5 top-5' onClick={() => setShowModal(false)}/>
            <ul className='font-oswalid text-black gap-16 flex flex-col text-4xl'>
              <Link to={'/movies'}>Movies</Link>
              <Link to={'/'}>Tv series</Link>
              <Link to={'/'}>Genres</Link>
            </ul>
          </div>
        )}
    </div>
  )
}

export default NavBar