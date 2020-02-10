import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import getPlanets from '../services/StarWarsApi';
import FilterPlanetByName from '../components/filters';

const StarWarsContext = createContext();

const StarWarsProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [filterPlanetName, setFilterPlanetName] = useState('');
  const [filterNumberColumn, setFilterNumberColumn] = useState([]);
  const [filterNumberComparison, setFilterNumberComparison] = useState([]);
  const [filterNumberValue, setFilterNumberValue] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [planetFiltered, setPlanetFiltered] = useState([]);

  useEffect(() => {
    getPlanets().then((planets) => {
      setData(planets.results);
      setIsFetching(true);
    });
  }, []);

  useEffect(() => {
    setPlanetFiltered(FilterPlanetByName());
  }, []);

  const context = {
    data,
    isFetching,
    filterPlanetName,
    setFilterPlanetName,
    filterNumberColumn,
    setFilterNumberColumn,
    filterNumberComparison,
    setFilterNumberComparison,
    filterNumberValue,
    setFilterNumberValue,
    planetFiltered,
    setPlanetFiltered,
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
