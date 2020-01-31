import React, { useContext } from 'react';
import { StarWarsContext } from '../context/StarWarsContext';

const Planets = () => {
  const { getApiStarWars } = useContext(StarWarsContext);
  return (
    console.log(getApiStarWars)
  );
}

export default Planets;
