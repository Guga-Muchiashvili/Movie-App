import React, { useEffect, useState } from 'react'
import { MdMenu } from "react-icons/md";
import '../App.scss'

import logo from '../public/photos/logo.svg'
import { IoCloseSharp, IoSearch } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const NavBar = () => {

  const [showModal, setShowModal] = useState(false)
  const [scrollOpacity, setScrollOpacity] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const maxScroll = 700;
      const opacity = Math.min(scrollPosition / maxScroll, 1) 
      setScrollOpacity(opacity);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  return (
    <div className='w-full h-[8vh]flex items-center justify-between pl-5 pr-5 pos fixed xl:px-16 z-10' style={{ backgroundColor: `rgba(0, 0, 0, ${scrollOpacity})`, display : "flex", height : "7vh" }}>
        <div className='flex text-white items-center gap-2'>
            <img className='w-8 h-8' src={logo} alt="" />
            <h2 className='font-mono text-lg'><Link className='font-oswalid' to={'/'}>GuGa Movies</Link></h2>
        </div>
        <div className='flex items-center px-10'>
            <ul className='font-oswalid text-white gap-8 hidden md:flex'>
              <Link className='hover:border-b-2 duration-1000 border-white border-spacing-2' to={'/movies'}>Movies</Link>
              <Link className='hover:border-b-2 duration-1000 border-white border-spacing-2' to={'/'}>Tv series</Link>
              <Link className='hover:border-b-2 duration-1000 border-white border-spacing-2' to={'/'}>Genres</Link>
            </ul>
        </div>
        <div className='flex items-center gap-8 text-white text-3xl'>
        <IoSearch className='pl-1 md:border-l-[1px] xl:text-xl cursor-pointer' />
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