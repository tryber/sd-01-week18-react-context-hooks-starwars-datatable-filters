import React, { useEffect, useContext } from 'react';
import { StarWarsContext } from '../context/StarWarsContext';

const HeaderOfStart = () => {
  const { getStarWarsPlanets } = useContext(StarWarsContext);

  useEffect(() => {
    getStarWarsPlanets();
  }, []);

  return (
    <h1>
      StarWars Datatable with Filters
    </h1>
  );
};

export default HeaderOfStart;