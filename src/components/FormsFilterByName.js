import React, { useContext } from 'react';
import { StarWarsContext } from '../context/StarWarsContext';

export default function Filter() {
  const { filterPlanetName, setFilterPlanetName } = useContext(StarWarsContext);
  return (
    <div>
      <label htmlFor="input-text-value">
        Nome do Planeta:
        <input
          type="text"
          id="input-text-value"
          placeholder="Nome do Planeta"
          value={filterPlanetName}
          onChange={(event) => setFilterPlanetName(event.target.value.toLowerCase())}
        />
      </label>
    </div>
  );
}
