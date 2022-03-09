import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Sidebar } from '../components/sidebar/Sidebar';
import { akelab, fibonacci, movies } from '../config/routes';
import { Akelab } from '../pages/akelab/Akelab';
import { Fibonacci } from '../pages/fibonacci/Fibonacci';
import { Movies } from '../pages/movies/Movies';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Sidebar />
      <div className='content custom-scroll'>
        <Routes>
          <Route index path={fibonacci()} element={<Fibonacci />} />

          <Route path={akelab()} element={<Akelab />} />

          <Route path={movies()} element={<Movies />} />

          <Route path='/*' element={<Fibonacci />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};
