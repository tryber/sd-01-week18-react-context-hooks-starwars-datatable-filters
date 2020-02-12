import React, { useContext, useState } from 'react';
import { StarWarsContext } from '../context/StarWarsContext';
import { columns } from '../service/Comparisons';

function generateColumnOptions(value) {
  return value.map((each) => (
    <option key={each} value={each}>
      {each}
    </option>
  ));
}

export default function FiltersDropDown() {
  const { column, setColumn } = useState('');
  const { comparison, setComparison } = useState('');
  const { value, setValue } = useState('');

  const { setComparition } = useContext(StarWarsContext);

  return (
    <div>
      <label htmlFor="column">
        <select onChange={(e) => setColumn(e.target.value)} data-testid="column" id="column">
          {generateColumnOptions(columns)}
        </select>
      </label>
      <select
        onChange={(e) => setComparison(e.target.value)}
        data-testid="comparison"
        id="comparison"
      >
        <option value="bigger than">bigger than</option>
        <option value="less than">less than</option>
        <option value="equal to">equal to</option>
      </select>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        data-testid="comparisonValue"
        id="comparisonValue"
        type="number"
        placeholder="Valor"
      />
      <button type="button" onClick={() => setComparition(column, comparison, value)}>
        Adicionar filtro
      </button>
    </div>
  );
}
