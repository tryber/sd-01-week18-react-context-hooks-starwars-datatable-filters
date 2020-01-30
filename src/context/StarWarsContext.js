import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import getPlanetFetch from '../service/starWarAPI';

const StarWarsContext = createContext();

const StarWarsProvider = ({ children }) => {
  const [resultAPI, setResultAPI] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    getPlanetFetch().then((planets) => setResultAPI(planets));
    setIsFetching(true);
  }, []);

  const context = { resultAPI, isFetching };
  return <StarWarsContext.Provider value={context}>{children}</StarWarsContext.Provider>;
};

StarWarsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export { StarWarsContext, StarWarsProvider as Provider };
