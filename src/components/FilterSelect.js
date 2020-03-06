import React, { useContext } from 'react';

import context from '../store/context';

const verifySelect = (filters, value) => {
  const exists = filters.find((filterObj) => filterObj.numeric_values.column === value);
  if (exists) return false;
  return true;
};

const FilterSelect = () => {
  const { setColumn, filters } = useContext(context);
  return (
    <select data-testid="select-column" name="column" onChange={(e) => setColumn(e.target.value)}>
      <option value="">Selecionar Opção</option>
      {verifySelect(filters, 'population') && <option value="population">População</option>}
      {verifySelect(filters, 'orbital_period') && <option value="orbital_period">Duração Orbital</option>}
      {verifySelect(filters, 'diameter') && <option value="diameter">Diâmetro</option>}
      {verifySelect(filters, 'rotation_period') && <option value="rotation_period">Duração da Rotação</option>}
      {verifySelect(filters, 'surface_water') && <option value="surface_water">Superfície da Água</option>}
    </select>
  );
};

export default FilterSelect;
