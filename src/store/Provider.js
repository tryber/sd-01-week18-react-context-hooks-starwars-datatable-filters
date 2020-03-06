import React, { useState } from 'react';
import PropTypes from 'prop-types';
import context from './context';

const Provider = ({ children }) => {
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

  const storeContext = {
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

  return <context.Provider value={storeContext}>{children}</context.Provider>;
};

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
