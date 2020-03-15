import React, { useContext } from 'react';
import { PlanetsContext } from '../context/StarWarsContext';

function createFilter(filterObj, removeFilter) {
  return (
    <p key={filterObj.column} className="active-filters">
      {`${filterObj.column} | ${filterObj.comparison} | ${filterObj.value}  `}
      <button type="button" onClick={() => removeFilter(filterObj)}>X</button>
    </p>
  );
}

function showActiveFilters(filters, removeFilter) {
  return filters.map((filter) => createFilter(filter, removeFilter));
}

function ActiveFilters() {
  const { numericFilters, removeNumericFilter } = useContext(PlanetsContext);
  return (
    <div className="active-filters">
      <h3>Filtros Ativos</h3>
      {numericFilters && showActiveFilters(numericFilters, removeNumericFilter)}
    </div>
  );
}

export default ActiveFilters;
