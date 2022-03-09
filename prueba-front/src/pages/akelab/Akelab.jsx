import React, { useState } from 'react';
import './Akelab.css';
import { SearchBar } from '../../components/searchBar/SearchBar';

export const Akelab = () => {
  const [number, setNumber] = useState('');
  const [numbers, setNumbers] = useState();
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (number < 1) return;
    if (number == 1) return setNumbers([1]);

    const res = [];
    for (let i = 0; i < number; i++) {
      res[i] = '';
      if ((1 + i) % 3 === 0) res[i] = 'AKE';
      if ((1 + i) % 5 === 0) res[i] += 'LAB';

      if (res[i] === '') res[i] = i + 1;
    }
    setNumbers(res);
  };

  const handleInputChange = (e) => {
    console.log(e.target.value);
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
    <section className='akelab-container'>
      <form onSubmit={handleSubmit} className='akelab-form'>
        <h2>Akelab</h2>
        <SearchBar type='tel' placeholder='Introduzca un número' value={number} handleInputChange={handleInputChange} />
        {error && <p className='akelab_error'>{error}</p>}
      </form>
      <p className='numbers'>
        {numbers?.map((n, index) => (
          <span>
            {n}
            {index < numbers.length - 1 ? ' || ' : ''}
          </span>
        ))}
      </p>
    </section>
  );
};
