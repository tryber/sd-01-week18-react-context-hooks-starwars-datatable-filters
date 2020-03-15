import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';
import { getPlanets } from '../services/swAPI';

const PlanetsContext = createContext();

const PlanetsProvider = ({ children }) => {
  const [planetsData, setData] = useState({ data: [], isFetching: true });
  const [nameFilter, setNameFilter] = useState('');
  const [numericFilterObj, setFilterObj] = useState({ column: '', comparison: '', value: '' });
  const [numericFilters, setFilters] = useState([]);
  const [sortColumn, setSort] = useState({ column: 'name', order: 'ASC' });

  const fetchPlanets = () => {
    if (!planetsData.isFetching) return;
    getPlanets()
      .then((data) => {
        setData({ data: data.results, isFetching: false });
      });
  };

  const setNumericFilters = (numericFilter) => {
    setFilters([...numericFilters, numericFilter]);
  };

  const removeNumericFilter = (numericFilter) => {
    setFilters([...numericFilters.filter((filter) => filter !== numericFilter)]);
  };

  const setColumnSort = (column) => {
    let columnOrder = 'ASC';
    if (column === sortColumn.column) {
      columnOrder = (sortColumn.order === 'ASC') ? 'DESC' : 'ASC';
    }
    setSort({ column, order: columnOrder });
  };

  const context = {
    planetsData,
    setData,
    nameFilter,
    setNameFilter,
    numericFilterObj,
    setFilterObj,
    numericFilters,
    setNumericFilters,
    removeNumericFilter,
    sortColumn,
    setColumnSort,
    fetchPlanets,
  };

  return (
    <PlanetsContext.Provider value={context}>
      {children}
    </PlanetsContext.Provider>
  );
};

export { PlanetsContext, PlanetsProvider as Provider };

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
