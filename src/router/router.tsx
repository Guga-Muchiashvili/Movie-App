import React from 'react';
import MainPage from '../pages/MainPage'; 
import AllMoviesPage from '../pages/allMovies'; 

const router = [
    {
        path: '/',
        element: <MainPage/>,
    },
    {
        path : '/movies/:id',
        element : <AllMoviesPage/> 
    },

];

export default router;