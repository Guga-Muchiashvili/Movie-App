import React from 'react';
import MainPage from '../pages/MainPage'; 
import AllMoviesPage from '../pages/allMovies'; 
import MovieDetailPage from '../pages/movieDetailPage';
import PersonDataPage from '../pages/personDataPage';

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
    },
    {
        path : "/person/:id",
        element : <PersonDataPage />
    }
];

export default router;