import React from 'react';
import MainPage from '../pages/MainPage'; 
import AllMoviesPage from '../pages/allMovies'; 
import MovieDetailPage from '../pages/movieDetailPage';

const router = [
    {
        path: '/',
        element: <MainPage/>,
    },
    {
        path : '/:type/:id',
        element : <AllMoviesPage/>,
    },
    {
        path : '/detail/:type/:id',
        element : <MovieDetailPage/>
    }
];

export default router;