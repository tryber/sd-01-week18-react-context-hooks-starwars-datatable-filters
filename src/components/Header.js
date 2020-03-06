import React, { useEffect, useContext } from 'react';

import context from '../store/context';

const Header = () => {
  const { getStarWarsPlanets } = useContext(context);

  useEffect(() => {
    getStarWarsPlanets();
  });

  return (
    <h1>
      StarWars Datatable with Filters
    </h1>
  );
};

export default Header;
