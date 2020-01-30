import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import getStarWarsPlanets from '../services/index';
import StarWarsContext from './StarWarsContext';

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

StarWarsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StarWarsProvider;
