import React from 'react'
import '../styles/spinner.scss'

const LoadingComponent = () => {
  return (
    <div className='w-full h-screen flex justify-center items-center flex-col gap-12'>
        <div className="spinner"></div>
        <h2 className='text-blue-500 font-roboto'>Loading...</h2>
    </div>
  )
}

export default LoadingComponent