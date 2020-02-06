import React, { useContext } from 'react';
import { StarWarsContext } from '../context/StarWarsContext';

function FilterPlanetsByName() {
  const { data, filterPlanetName, setFilteredPlanets } = useContext(StarWarsContext);

  console.log(filterPlanetName);
  return (
    <div>
      {filterPlanetName 
      ? setFilteredPlanets(data.filter(({ name }) => name.toLowerCase().includes(filterPlanetName)))
      : setFilteredPlanets(data)}
    </div>
  );
}

export default FilterPlanetsByName;
