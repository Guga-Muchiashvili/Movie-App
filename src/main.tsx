import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Provider } from 'react-redux';
import store from './redux/store.ts';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import router from './router/router.tsx';


const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
  <Provider store={store}>
    <React.StrictMode>
    <RouterProvider router={createBrowserRouter(router)} />
    </React.StrictMode>
  </Provider>
  </QueryClientProvider>
);