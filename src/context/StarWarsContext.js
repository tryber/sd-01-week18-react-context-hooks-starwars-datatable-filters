import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import getPlanetFetch from '../service/starWarAPI';

const StarWarsContext = createContext();

const StarWarsProvider = ({ children }) => {
  const [resultAPI, setResultAPI] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    getPlanetFetch().then((planets) => setResultAPI(planets));
    setIsFetching(true);
  }, []);
  const filterInputName = (e) => setFilter(e);

  const context = {
    resultAPI, isFetching, filter, setFilter, filterInputName,
  };
  return <StarWarsContext.Provider value={context}>{children}</StarWarsContext.Provider>;
};

StarWarsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export { StarWarsContext, StarWarsProvider as Provider };
