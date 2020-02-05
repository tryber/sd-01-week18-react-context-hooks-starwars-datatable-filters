import React from 'react';

const searchedNumbers = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

const Dropdown = () => {
  return (
    <select>
      {searchedNumbers.map((value) => <option key={value}>{value}</option>)}
    </select>
  );
};

export default Dropdown;
