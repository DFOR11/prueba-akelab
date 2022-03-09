import React, { useState } from 'react';
import './SortFilter.css';

export const SortFilter = ({ options = [], handleSort }) => {
  const [toggle, setToggle] = useState(true);
  const [optionSelected, setOptionSelected] = useState();

  const handleClick = (type, option) => {
    handleSort(type, option);
    setToggle(true);
    return setOptionSelected(option);
  };

  return (
    <>
      <div className='header__sort' onClick={() => setToggle(!toggle)}>
        Ordernar
        <button className='sort__button'></button>
      </div>

      {!toggle && (
        <div className='sort-filter-container'>
          <div className='sort-filter custom-scroll'>
            {options.map((option) => (
              <>
                {option.title && <span className='option-title'>{option.title}</span>}
                {option.options.map((op) => (
                  <label key={op} className={op === optionSelected ? 'sort-option --active' : 'sort-option'} onClick={() => handleClick(option, op)}>
                    {op}
                  </label>
                ))}
              </>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
