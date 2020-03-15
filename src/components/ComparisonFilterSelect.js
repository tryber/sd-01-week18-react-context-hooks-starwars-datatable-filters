import React, { useContext } from 'react';
import { PlanetsContext } from '../context/StarWarsContext';

function ComparisonFilterSelect() {
  const { setFilterObj, numericFilterObj: { column, value } } = useContext(PlanetsContext);
  return (
    <select
      name="type"
      defaultValue=""
      onChange={(e) => setFilterObj({ column, comparison: e.target.value, value })}
    >
      <option value="" disabled>Selecionar Opção</option>
      <option value="bigger">Maior que</option>
      <option value="less">Menor que</option>
      <option value="equal">Igual a</option>
    </select>
  );
}

export default ComparisonFilterSelect;
