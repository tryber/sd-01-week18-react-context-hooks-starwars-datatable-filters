import React, { useContext } from 'react';
import '../css/Filter.css';
import { StarWarsContext } from '../context/StarWarsContext';

function Filter() {
  const { filterInputName } = useContext(StarWarsContext);
  return (
    <div>
      <input
        placeholder="Digite o nome do planeta aqui"
        onChange={(e) => filterInputName(e.target.value)}
        data-testid="namePlanetInput"
      />
    </div>
  );
}

export default Filter;
