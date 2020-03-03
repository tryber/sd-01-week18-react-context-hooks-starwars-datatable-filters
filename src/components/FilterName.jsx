import React, { useContext } from 'react';
import '../css/Filter.css';
import { StarWarsContext } from '../context/StarWarsContext';

export default function FilterName() {
  const { setFilter } = useContext(StarWarsContext);
  return (
    <div>
      <input
        placeholder="Digite o nome do planeta aqui"
        onChange={(e) => setFilter(e.target.value)}
        data-testid="namePlanetInput"
      />
    </div>
  );
}
