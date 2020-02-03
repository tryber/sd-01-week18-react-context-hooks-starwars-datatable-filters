import React, { useContext } from 'react';
import { StarWarsContext } from '../context/StarWarsContext';

function Filter() {
  const { filterInputName } = useContext(StarWarsContext);
  return (
    <div>
      <input
        placeholder="Digite o nome do planeta aqui"
        onChange={(e) => filterInputName(e.target.value)}
      />
    </div>
  );
}

export default Filter;
