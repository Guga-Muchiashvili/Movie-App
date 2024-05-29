import React from 'react'
import { AiFillFacebook, AiFillGithub, AiFillLinkedin } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import sweeft from '../public/photos/swf.png'

const FooterComponent = () => {
  return (
    <div className='w-full h-40 bg-gray-900 flex flex-col items-center justify-between absolute bottom-0'>
        <div className='flex justify-center items-center h-full text-white gap-4'>
            <h1 className='flex gap-2'>Created by <h3 className='text-gray-400'> Making science Sweeft</h3></h1>
            <img className='w-14 h-12' src={sweeft} alt="" />
        </div>
        <div className='flex gap-6 text-white mb-4'>
        <a className='text-3xl' href="https://www.facebook.com/profile.php?id=100010053016821"><AiFillFacebook /></a>
        <a className='text-3xl' href="https://www.linkedin.com/in/gugamuchiashvili/"><AiFillLinkedin /></a>
        <a className='text-3xl' href="https://github.com/guga-ggw"><AiFillGithub /></a>
        </div>
        <div className='w-full h-9 bg-black flex justify-center py-2'>
        
        <h2 className='text-white font-roboto text-sm'>Copyright @2024 GugaMuchiashvili. Designed by Guga</h2>
        </div>
    </div>
  )
}

export default FooterComponent