import React, { useState } from 'react';
import './FilterCheck.css';

export const FilterCheck = ({ options = [], handleFilter }) => {
  const [toggle, setToggle] = useState(true);

  const handleCheck = ({ target }) => {
    handleFilter(target.name, target.checked);
  };

  return (
    <>
      <button className='header__filter-button' onClick={() => setToggle(!toggle)}></button>

      {!toggle && (
        <div className='filter-container '>
          <div className='filter custom-scroll'>
            <span className='option-title'>Genero</span>
            {options.map((mov) => (
              <label className='control ' key={mov.id}>
                {mov.name}
                <input type='checkbox' onChange={(e, mov) => handleCheck(e, mov)} name={mov.id} />
                <div className='control__indicator'></div>
              </label>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
