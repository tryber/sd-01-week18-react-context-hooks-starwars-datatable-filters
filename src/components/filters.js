import React, { useContext } from 'react';
import { StarWarsContext } from '../context/StarWarsContext';

const { data, filterPlanetName } = useContext(StarWarsContext);

function FilterPlanetByName() {
  const nameFiltered = data.filter(({ name }) => name.toLowerCase().includes(filterPlanetName));
  return filterPlanetName ? nameFiltered : data;
}

export default FilterPlanetByName;
