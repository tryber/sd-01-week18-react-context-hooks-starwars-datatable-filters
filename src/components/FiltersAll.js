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
    if (newFilters.length > 5) {
      return <div><h2>Todos os Filtros já foram selecionados</h2></div>;
    }
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
      {filters.length === 5 && sendValues()}
    </div>
  );
};

export default FilterAll;
