import React, { useContext } from 'react';
import { PlanetsContext } from '../context/StarWarsContext';

function NameFilterInput() {
  const { setNameFilter } = useContext(PlanetsContext);
  return (
    <input
      type="text"
      placeholder="Filtrar pelo Nome"
      onChange={(e) => setNameFilter(e.target.value)}
    />
  );
}

export default NameFilterInput;
