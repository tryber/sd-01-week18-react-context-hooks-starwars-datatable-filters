import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import getPlanetFetch from '../service/starWarAPI';

const StarWarsContext = createContext();

const StarWarsProvider = ({ children }) => {
  const [resultAPI, setResultAPI] = useState([]);
  // const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    getPlanetFetch().then((planets) => setResultAPI(planets));
  }, []);

  const context = { resultAPI };
  return <StarWarsContext.Provider value={context}>{children}</StarWarsContext.Provider>;
};

StarWarsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { StarWarsContext, StarWarsProvider as Provider };
