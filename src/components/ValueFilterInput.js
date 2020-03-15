import React, { useContext } from 'react';
import { PlanetsContext } from '../context/StarWarsContext';

function ValueFilterInput() {
  const { setFilterObj, numericFilterObj: { column, comparison } } = useContext(PlanetsContext);
  return (
    <input
      type="number"
      placeholder="Filtrar por Valor"
      onChange={(e) => setFilterObj({ column, comparison, value: e.target.value })}
    />
  );
}

export default ValueFilterInput;
