import React, { useContext } from 'react';
import { ReciperContext } from '../context';

const handleClick = (database, setDatabase, value) => {
  if (value !== '') {
    setDatabase({
      ...database,
      planets: database.data
        .filter(((planet) => planet.name.toLowerCase()
          .includes(value.toLowerCase()))),
    });
  } else {
    setDatabase({
      ...database,
      planets: database.data,
    });
  }
}

const FilterText = () => {
  const { database, setDatabase } = useContext(ReciperContext);
  return (
    <div>
      <h2>Filter Table By Text</h2>
      <input type="text" onChange={(e) => handleClick(database, setDatabase, e.target.value)} />
    </div>
  );
}

export default FilterText;
