import React, { useContext } from 'react';
import '../css/Filter.css';
import { StarWarsContext } from '../context/StarWarsContext';

export default function FilterName() {
  const { filterName, setFilterName } = useContext(StarWarsContext);

  return (
    <div>
      <input
        type="text"
        placeholder="Filtrar por nome"
        value={filterName}
        data-testid="planet-name-input"
        onChange={(event) => setFilterName(event.target.value)}
      />
    </div>
  );
}
