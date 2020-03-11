import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const StarWarsContext = createContext();

const StarWarsProvider = ({ children }) => {
  const [data, setData] = useState();
  const [filterName, setFilterName] = useState('');
  const [sortColumns, setSortColumns] = useState({ column: 'name', order: 'ASC' });
  const [value, setValue] = useState('');
  const [column, setColumn] = useState('');
  const [comparison, setComparison] = useState('');
  const [filters, setFilters] = useState([]);

  const STAR_WARS_API = 'https://swapi.co/api/planets/';

  const getStarWarsPlanets = () => fetch(STAR_WARS_API)
    .then((response) => response.json())
    .then((result) => setData(result.results));

  const context = {
    data,
    setData,
    getStarWarsPlanets,
    filterName,
    setFilterName,
    sortColumns,
    setSortColumns,
    value,
    setValue,
    column,
    setColumn,
    comparison,
    setComparison,
    filters,
    setFilters,
  };

  return <StarWarsContext.Provider value={context}>{children}</StarWarsContext.Provider>;
};

StarWarsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export { StarWarsContext, StarWarsProvider as Provider };
