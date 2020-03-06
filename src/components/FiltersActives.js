import React, { useContext } from 'react';

import context from '../store/context';

const removePlanetFilters = (filterObj, setFilters, filters) => {
  const newFilters = filters.filter((filter) => filter.numeric_values.column !== filterObj.column);
  return setFilters(newFilters);
};

const createFilter = (filterObj, setFilters, filters) => (
  <p key={filterObj.column} className="active-filters">
    {`${filterObj.column} | ${filterObj.comparison} | ${filterObj.value}`}
    <button
      data-testid="exclude-filter"
      type="button"
      onClick={() => removePlanetFilters(filterObj, setFilters, filters)}
    >
      X
    </button>
  </p>
);

const showActiveFilters = (filters, setFilters) => (
  filters.map((filter) => createFilter(filter.numeric_values, setFilters, filters))
);

const FilterActives = () => {
  const { filters, setFilters } = useContext(context);

  return (
    <div className="active-filters">
      <h3>Filtros Ativos</h3>
      {filters && showActiveFilters(filters, setFilters)}
    </div>
  );
};

export default FilterActives;
