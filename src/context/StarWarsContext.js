import React, { useState, createContext } from 'react';
import Proptypes from 'prop-types';
import SWAPI from '../services/SWAPI';

const StarWarsContext = createContext();

const ProviderStarWars = ({ children }) => {
  const [data, setData] = useState({
    planets: [],
    success: false,
  });

  const IsReadyAPI = () => {
    if (data.success) return;
    SWAPI()
      .then((obj) => setData({
        planets: obj.results,
        success: true,
      }));
  };

  const context = {
    data,
    IsReadyAPI,
  };

  return (
    <StarWarsContext.Provider value={context}>
      {children}
    </StarWarsContext.Provider>
  );
};

export { StarWarsContext, ProviderStarWars as Provider };

ProviderStarWars.propTypes = {
  children: Proptypes.node.isRequired,
};
