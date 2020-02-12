import React, { useContext } from 'react';
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
  const { setComparition, comparition } = useContext(StarWarsContext);

  return (
    <div>
      <label htmlFor="column">
        <select onChange={(e) => setComparition({ column: e.target.value })} data-testid="column">
          {generateColumnOptions(columns)}
        </select>
      </label>
      <select
        onChange={(e) => setComparition({ comparison: e.target.value })}
        data-testid="comparison"
        id="comparison"
      >
        <option>Faça sua Escolha</option>
        <option value="bigger than">bigger than</option>
        <option value="less than">less than</option>
        <option value="equal to">equal to</option>
      </select>
      <input
        onChange={(e) => setComparition({ value: e.target.value })}
        data-testid="comparisonValue"
        id="comparisonValue"
        type="number"
        placeholder="Qual é o número?"
      />
      <button type="button" onClick={() => setComparition({ isFilter: !comparition.isFilter })}>
        Adicionar filtro
      </button>
    </div>
  );
}
