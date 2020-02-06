import React, { useContext } from 'react';
import { StarWarsContext } from '../context/StarWarsContext';

function FilterPlanetsByName() {
  const { data, filterPlanetName, setFilteredPlanets } = useContext(StarWarsContext);

  function Filter() {
    if (filterPlanetName) {
      return setFilteredPlanets(data.filter(({ name }) => name.toLowerCase().includes(filterPlanetName)))
    }
    return data;
  }

  return (
    <div >
      {Filter()} 
    </div>
    // <div>
    //   {filterPlanetName 
    //   ? setFilteredPlanets(data.filter(({ name }) => name.toLowerCase().includes(filterPlanetName)))
    //   : setFilteredPlanets(data)}
    // </div>
  );
}

export default FilterPlanetsByName;
