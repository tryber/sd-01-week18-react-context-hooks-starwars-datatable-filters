import React, { useEffect, useContext } from 'react';

import context from '../store/context';
import getStarWarsPlanets from '../services/starWarsAPI';

const Header = () => {
  const { setData } = useContext(context);

  useEffect(() => {
    getStarWarsPlanets().then((result) => setData(result));
  }, []);

  return (
    <h1>
      StarWars Datatable with Filters
    </h1>
  );
};

export default Header;
