import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import getPlanets from '../services/StarWarsApi';

const StarWarsContext = createContext();

const StarWarsProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [filterPlanetName, setFilterPlanetName] = useState('');
  const [column, setColumn] = useState('');
  const [comparison, setComparison] = useState('');
  const [value, setValue] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const [filters, setFilters] = useState([]);
  const [sortColumns, setSortColumns] = useState({ column: 'name', order: 'ASC' });

  useEffect(() => {
    getPlanets().then((planets) => {
      setData(planets.results);
      setIsFetching(true);
    });
  }, []);

  const context = {
    column,
    comparison,
    data,
    filterPlanetName,
    filters,
    isFetching,
    value,
    setColumn,
    setComparison,
    sortColumns,
    setValue,
    setFilterPlanetName,
    setFilters,
    setSortColumns,
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
