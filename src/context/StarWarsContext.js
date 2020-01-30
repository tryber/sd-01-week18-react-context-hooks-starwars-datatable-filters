import React, { useState, useEffect, createContext } from 'react';
import { PropTypes } from 'prop-types';
import getStarWarsPlanets from '../services/index';

const StarWarsContext = createContext();

const StarWarsProvider = ({ children }) => {
  const [APIresult, setAPIresult] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    getStarWarsPlanets().then((planets) => setAPIresult(planets));
    setIsFetching(true);
  }, []);

  const context = { APIresult, isFetching };
  return <StarWarsContext.Provider value={context}>{children}</StarWarsContext.Provider>;
};

export { StarWarsContext, StarWarsProvider as Provider };

StarWarsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
