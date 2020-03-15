import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const StarWarsContext = createContext();
const STAR_WARS_API = 'https://swapi.co/api/planets/';
const StarWarsProvider = ({ children }) => {
  const [data, setData] = useState();
  const [fetchis, setfetchis] = useState(true);
  const [filterName, setFilterName] = useState('');
  const [sortColumns, setSortColumns] = useState({ column: 'name', order: 'ASC' });
  const [value, setValue] = useState('');
  const [column, setColumn] = useState('');
  const [comparison, setComparison] = useState('');
  const [filters, setFilters] = useState([]);
  const getStarWarsPlanets = () => fetch(STAR_WARS_API)
    .then((response) => response.json())
    .then((result) => {
      setData(result.results);
      setfetchis(false);
    });
  const context = {
    fetchis,
    setfetchis,
    data,
    setData,
    setFilters,
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
  };
  return <StarWarsContext.Provider value={context}>{children}</StarWarsContext.Provider>;
};

StarWarsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export { StarWarsContext, StarWarsProvider as Provider };
