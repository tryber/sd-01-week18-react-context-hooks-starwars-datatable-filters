import React, { useContext } from 'react';
import { StarWarsContext } from '../context/StarWarsContext';

function FilterPlanetsByName() {
  const { data, filterPlanetName, setFilteredPlanets } = useContext(StarWarsContext);

  let nameFiltered = filterPlanetName
      ? data.filter(({ name }) => name.toLowerCase().includes(filterPlanetName.toLowerCase()))
      : data;

  console.log(nameFiltered);

  return (
    <div>
      {setFilteredPlanets(nameFiltered)}
    </div>
  );
}

export default FilterPlanetsByName;
