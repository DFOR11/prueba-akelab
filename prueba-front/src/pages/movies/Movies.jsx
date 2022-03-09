import React, { useEffect, useState } from 'react';
import { SearchBar } from '../../components/searchBar/SearchBar';
import './Movies.css';

import { MovieCard } from './components/MovieCard/MovieCard';
import { FilterCheck } from './components/FilterCheck/FilterCheck';
import { SortFilter } from './components/SortFilter/SortFilter';
import { useFetchData } from '../../hooks/useFetch';

export const Movies = () => {
  const { data, loading, error } = useFetchData('/api?Akelab=123456789');
  useEffect(() => {
    if (data) {
      setMovies(data.results);
      setFilterOptions(data.genres);
      setFilteredMovies(data.results);
    }
  }, [data]);

  const [movies, setMovies] = useState([]);
  const [filterOptions, setFilterOptions] = useState([]);

  const [filteredMovies, setFilteredMovies] = useState([]);
  const [filterGenres, setFilterGenres] = useState([]);

  const sortOptions = [
    { title: 'Fecha', options: ['Nuevas-Antiguas', 'Antiguas-Nuevas'] },
    { title: 'Calificación', options: ['0-10 puntos', '10-0 puntos'] },
  ];

  const handleSearch = (e) => {
    const { value } = e.target;
    const filtered = movies.filter((mov) => mov.title.toLowerCase().includes(value));
    setFilteredMovies(filtered);
  };

  const handleSort = (type, option) => {
    let temp = [...filteredMovies];

    if (type.title === 'Fecha') {
      if (option === 'Nuevas-Antiguas') {
        temp = temp.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
        return setFilteredMovies(temp);
      }
      temp = temp.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
      return setFilteredMovies(temp);
    }

    if (type.title === 'Calificación') {
      if (option === '10-0 puntos') {
        temp = temp.sort((a, b) => b.vote_average - a.vote_average);
        return setFilteredMovies(temp);
      }
      temp = temp.sort((a, b) => a.vote_average - b.vote_average);
      return setFilteredMovies(temp);
    }
  };

  const handleFilter = (id, isChecked) => {
    if (filterGenres.length === 1 && !isChecked) {
      setFilterGenres([]);
      return setFilteredMovies([...movies]);
    }
    id = parseInt(id);

    if (filterGenres.length === 0 && isChecked) {
      const temp = movies.filter((mov) => mov.genre_ids.includes(id));
      setFilterGenres([...filterGenres, id]);
      return setFilteredMovies(temp);
    }

    let arr = [...filterGenres];

    if (!isChecked) {
      const index = arr.indexOf(id);
      arr.splice(index, 1);
    } else {
      arr = [...filterGenres, id];
    }

    const temp = movies.filter((mov) => mov.genre_ids.some((_id) => arr.includes(_id)));
    setFilterGenres([...arr]);
    return setFilteredMovies(temp);
  };

  if (error) {
    return <h4>Algo salió mal, por favor vuelve a intentarlo más tarde</h4>;
  }

  return (
    <div className='movies-container'>
      {loading ? (
        <h4>Cargando...</h4>
      ) : (
        <>
          <h2 className='movies__title'>Películas</h2>
          <div className='movies__header'>
            <SearchBar width='30%' placeholder='Filtrar por título' handleInputChange={handleSearch} />
            <FilterCheck options={filterOptions} handleFilter={handleFilter} />
            <SortFilter options={sortOptions} handleSort={handleSort} />
          </div>
          <section>
            <div className='cards'>
              {filteredMovies.map((movie) => (
                <MovieCard movie={movie} genres={filterOptions} key={movie.id} />
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
};
