import React from 'react';
import { NavLink } from 'react-router-dom';
import { akelab, fibonacci, movies } from '../../config/routes';
import './Sidebar.css';

export const Sidebar = () => {
  const routes = [
    {
      path: () => fibonacci(),
      name: 'Fibonacci',
    },
    {
      path: () => akelab(),
      name: 'Akelab',
    },
    {
      path: () => movies(),
      name: 'Peliculas',
    },
  ];

  return (
    <div className='sidebar'>
      {routes.map((route) => (
        <NavLink key={route.name} className={({ isActive }) => (isActive ? 'active' : '')} to={route.path()}>
          {route.name}
        </NavLink>
      ))}
    </div>
  );
};
