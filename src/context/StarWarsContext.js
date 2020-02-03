import React, { useState, createContext } from 'react';
import Proptypes from 'prop-types';
import SWAPI from '../services/SWAPI';

const StarWarsContext = createContext();

const DataSWAPI = ({ children }) => {
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

export { StarWarsContext, DataSWAPI as Provider };

DataSWAPI.propTypes = {
  children: Proptypes.node.isRequired,
};
