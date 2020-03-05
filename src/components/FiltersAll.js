import React, { useContext } from 'react';

import FilterSelect from './FilterSelect';
import FilterCompare from './FilterCompare';
import FilterValue from './FilterValue';
import FiltersActives from './FiltersActives';
import context from '../store/context';

const FilterAll = () => {
  const {
    column,
    comparison,
    value,
    filters,
    setFilters,
  } = useContext(context);

  const sendValues = () => {
    const newFilters = [...filters, { numeric_values: { column, comparison, value } }];
    return setFilters(newFilters);
  };

  return (
    <div>
      <FiltersActives />
      <FilterSelect />
      <FilterCompare />
      <FilterValue />
      {column && comparison && value
        && <button type="button" onClick={sendValues}>Adicionar Filtro</button>}
    </div>
  );
};

export default FilterAll;
