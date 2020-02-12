import React, { useContext } from 'react';
import { StarWarsContext } from '../context/StarWarsContext';

export default function Filter() {
  const { filterPlanetName, setFilterPlanetName } = useContext(StarWarsContext);
  return (
    <div>
      <label htmlFor="input-text-value"> Filter by planet name:
        <input
          type="text"
          id="input-text-value"
          value={filterPlanetName}
          onChange={(event) => setFilterPlanetName(event.target.value.toLowerCase())}
        />
      </label>
    </div>
  );
}
