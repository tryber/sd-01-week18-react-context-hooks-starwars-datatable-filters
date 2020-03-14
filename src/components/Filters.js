import React, { useContext } from 'react';

import FormsFilterByNumber from './FormsFilterByNumber';
import FilterActive from './FiltersActive';
import { StarWarsContext } from '../context/StarWarsContext';

const FilterAll = () => {
  const {
    column,
    comparison,
    value,
    filters,
    setFilters,
  } = useContext(StarWarsContext);

  const sendValues = () => {
    const newFilters = [...filters, { numeric_values: { column, comparison, value } }];
    if (newFilters.length > 5) {
      return <div><h2>Todos os Filtros já foram selecionados</h2></div>;
    }
    return setFilters(newFilters);
  };

  return (
    <div>
      <FilterActive />
      <FormsFilterByNumber />
      {column && comparison && value
        && <button type="button" onClick={sendValues}>Adicionar Filtro</button>}
      {filters.length === 5 && sendValues()}
    </div>
  );
};

export default FilterAll;
