import React, { useEffect, useContext } from 'react';
import Loading from './Loading';
import { StarWarsContext } from '../context/StarWarsContext';

const HeaderOfStart = () => {
  const { getStarWarsPlanets, fetchis } = useContext(StarWarsContext);

  useEffect(() => {
    getStarWarsPlanets();
  }, []);
  if (fetchis) return <Loading />;
  return <h1>StarWars Datatable with Filters</h1>;
};

export default HeaderOfStart;
