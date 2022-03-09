import React from 'react';
import './SearchBar.css';
export const SearchBar = ({ type, placeholder, value, handleInputChange, width = '50%' }) => {
  return (
    <div className='custom-search' style={{ width }}>
      <input type={type} placeholder={placeholder} value={value} onChange={handleInputChange} />
      <button type='submit'></button>
    </div>
  );
};
