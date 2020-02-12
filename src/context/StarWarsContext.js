import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import getPlanets from '../services/StarWarsApi';
import Filters from '../components/filters';

const StarWarsContext = createContext();

const StarWarsProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({ column: [], comparison: [], numberValue: []});
  const [filterPlanetName, setFilterPlanetName] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const [planetFiltered, setPlanetFiltered] = useState([]);

  useEffect(() => {
    getPlanets().then((planets) => {
      setData(planets.results);
      setIsFetching(true);
    });
  }, []);

  useEffect(() => {
    setPlanetFiltered(Filters(data, filters, filterPlanetName));
  }, [data, filterPlanetName]);

  const context = {
    data,
    filterPlanetName,
    filters,
    isFetching,
    planetFiltered,
    setFilters,
    setFilterPlanetName,
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
