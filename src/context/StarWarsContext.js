import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import getPlanets from '../services/StarWarsApi';

const StarWarsContext = createContext();

const StarWarsProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [filterPlanetName, setFilterPlanetName] = useState('');
  const [filterNumberColumn, setFilterNumberColumn] = useState([]);
  const [filterNumberComparison, setFilterNumberComparison] = useState([]);
  const [filterNumberValue, setFilterNumberValue] = useState([]);

  useEffect(() => {
    getPlanets().then((planets) => {
      setData(planets.results);
      setIsFetching(true);
    });
  }, []);

  const context = {
    data,
    isFetching,
    filterPlanetName,
    setFilterPlanetName,
    filteredPlanets,
    setFilteredPlanets,
    filterNumberColumn,
    setFilterNumberColumn,
    filterNumberComparison,
    setFilterNumberComparison,
    filterNumberValue,
    setFilterNumberValue,
  };

  return (
    <StarWarsContext.Provider value={context}>
      {children}
    </StarWarsContext.Provider>
  );
};

StarWarsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { StarWarsContext, StarWarsProvider as Provider };

