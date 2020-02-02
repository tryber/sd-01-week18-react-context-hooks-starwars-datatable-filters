import React, { useState, createContext } from 'react';
import Proptypes from 'prop-types';
import SWAPI from '../services/SWAPI';

const StarWarsContext = createContext();

const dataSWAPI = ({ children }) => {
  const [data, setData] = useState({
    planets: [],
    success: false,
  });

  const isReadyAPI = () => {
    if (data.success) return;
    SWAPI()
      .then((obj) => setData({
        planets: obj.results,
        success: true,
      }));
  };

  const context = {
    data,
    setData,
    isReadyAPI,
  };

  return (
    <StarWarsContext.Provider value={context}>
      {children}
    </StarWarsContext.Provider>
  );
};

export { StarWarsContext, dataSWAPI as Provider };

dataSWAPI.propTypes = {
  children: Proptypes.node.isRequired,
};
