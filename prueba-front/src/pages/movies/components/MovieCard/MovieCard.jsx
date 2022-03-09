import React from 'react';
import starFilled from '../../../../assets/Star-3.png';
import emptyStar from '../../../../assets/Star-5.png';
import './MovieCard.css';

export const MovieCard = ({ movie, genres }) => {
  const handleGenre = (genre) => {
    const a = genres.find((gen) => gen.id === genre);
    return `${a.name}, `;
  };

  const handleStars = (note) => {
    note = Math.round(note / 2);
    let temp = [];

    for (let i = 0; i < 5; i++) {
      if (note > i) {
        temp.push(starFilled);
      } else {
        temp.push(emptyStar);
      }
    }

    return temp;
  };

  return (
    <div className='card'>
      <p className='card-title'>
        {movie.title} ({movie.release_date.slice(0, 4)})
      </p>
      <div className='card-content'>
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className='card__image' alt='' />

        <div className='content__info'>
          <p className='movie-description'>{movie.overview}</p>
          <p>
            <span>Titulo: </span> {movie.title}
          </p>
          <p>
            <span>Calificación: </span> {movie.vote_average}{' '}
            {handleStars(movie.vote_average).map((x, index) => (
              <img src={x} key={'img-movie-' + index} />
            ))}
          </p>
          <p>
            <span>Genero: </span> {movie.genre_ids.map((genre) => handleGenre(genre))}
          </p>
          <p>
            <span>Fecha: </span> {movie.release_date}
          </p>
        </div>
      </div>
    </div>
  );
};
