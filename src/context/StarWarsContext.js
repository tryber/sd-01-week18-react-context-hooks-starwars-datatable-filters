import React, { useState, createContext } from 'react';
import SWAPI from '../services/SWAPI';
import Proptypes from 'prop-types';

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
