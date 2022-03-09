import React, { useState } from 'react';
import './Fibonacci.css';
import { SearchBar } from '../../components/searchBar/SearchBar';

export const Fibonacci = () => {
  const [number, setNumber] = useState('');
  const [numbers, setNumbers] = useState();
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (number < 1) return;
    if (number == 1) return setNumbers([1]);

    const res = [1, 1];
    for (let i = 2; i < number; i++) {
      res[i] = res[i - 1] + res[i - 2];
    }
    setNumbers(res);
  };

  const handleInputChange = (e) => {
    setError('');
    setNumbers([]);
    const { value } = e.target;

    if (value.length < 1) return setNumber('');

    const isnumber = /^\d+$/.test(value);

    if (!isnumber || value < 1) return setError('Solo se permiten números positivos');

    setNumber(value);
    setError('');
  };

  return (
    <section className='fibonacci-container'>
      <form onSubmit={handleSubmit} className='fibonacci-form'>
        <h2>Serie de Fibonacci</h2>
        <SearchBar type='tel' placeholder='Introduzca un número' value={number} handleInputChange={handleInputChange} />
        {error && <p className='fibonacci_error'>{error}</p>}
      </form>
      <p className='numbers'>
        {numbers?.map((n, index) => (
          <span key={`fibonacci-${index}`}>
            {n}
            {index < numbers.length - 1 ? ' || ' : ''}
          </span>
        ))}
      </p>
    </section>
  );
};
