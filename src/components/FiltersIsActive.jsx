import React, { useContext } from 'react';
import { StarWarsContext } from '../context/StarWarsContext';
import { showActiveFilters } from '../service/functions';


const FiltersIsActive = () => {
  const { filters, setFilters } = useContext(StarWarsContext);

  return <div>{filters && showActiveFilters(filters, setFilters)}</div>;
};

export default FiltersIsActive;
