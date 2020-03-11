import React, { useContext } from 'react';
import { StarWarsContext } from '../context/StarWarsContext';

import SelectOfColunm from './SelectOfColunm';
import SelectOfComparison from './SelectOfComparison';
import SelectOfInput from './SelectOfInput';
import FiltersIsActive from './FiltersIsActive';


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
    return setFilters(newFilters);
  };

  return (
    <div>
      <FiltersIsActive />
      <SelectOfColunm />
      <SelectOfComparison />
      <SelectOfInput />
      {column && comparison && value
        && <button type="button" onClick={sendValues}>Adicionar Filtro</button>}
      {filters.length === 5 && sendValues()}
    </div>
  );
};

export default FilterAll;