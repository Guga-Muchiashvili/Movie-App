import React from 'react';
import MainPage from '../pages/MainPage'; // Import MainPage component
import AllMoviesPage from '../pages/allMovies'; // Import AllMoviesPage component

const router = [
    {
        path: '/',
        element: <MainPage/>,
    },
    {
        path : '/movies',
        element : <AllMoviesPage/> // Use AllMoviesPage component
    }
];

export default router;