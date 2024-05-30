import React from 'react';
import MainPage from '../pages/MainPage'; 
import AllMoviesPage from '../pages/allMovies'; 

const router = [
    {
        path: '/',
        element: <MainPage/>,
    },
    {
        path : '/movie/:id',
        element : <AllMoviesPage/> 
    },

];

export default router;