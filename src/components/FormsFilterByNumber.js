import React, { useContext } from 'react';
import { StarWarsContext } from '../context/StarWarsContext';

const verifySelect = (filters, valueChoice) => {
  const exists = filters.find((filterObj) => filterObj.numeric_values.column === valueChoice);
  if (exists) return false;
  return true;
};

const inputSelectColumn = (setColumn, filters) => (
  <label htmlFor="select-filter-column">
    <select data-testid="filter-column" name="column" onChange={(e) => setColumn(e.target.value)}>
      <option value="">Selecione</option>
      {verifySelect(filters, 'population') && <option value="population">População</option>}
      {verifySelect(filters, 'orbital_period') && <option value="orbital_period">Duração Orbital</option>}
      {verifySelect(filters, 'diameter') && <option value="diameter">Diâmetro</option>}
      {verifySelect(filters, 'rotation_period') && <option value="rotation_period">Duração da Rotação</option>}
      {verifySelect(filters, 'surface_water') && <option value="surface_water">Superfície da Água</option>}
    </select>
  </label>
);

const inputSelectComparison = (comparison, setComparison) => (
  <label htmlFor="filter-comparison">
    <select
      data-testid="filter-comparison"
      id="filter-comparison"
      value={comparison}
      onChange={(event) => setComparison(event.target.value)}
    >
      <option value="" disabled>Selecione uma Opção</option>
      <option value="greater-than">Maior que</option>
      <option value="less-than">Menor que</option>
      <option value="equal-to">Igual a</option>
    </select>
  </label>
);

const inputNumber = (value, setValue) => (
  <label htmlFor="filter-number">
    <input
      type="number"
      id="filter-number"
      value={value}
      placeholder="Insira o número"
      onChange={(event) => setValue(event.target.value)}
    />
  </label>
);

function FilterByNumber() {
  const {
    comparison,
    value,
    setColumn,
    setComparison,
    setValue,
    filters,
  } = useContext(StarWarsContext);

  return (
    <div>
      {inputSelectColumn(setColumn, filters)}
      {inputSelectComparison(comparison, setComparison)}
      {inputNumber(value, setValue)}
    </div>
  );
}

export default FilterByNumber;
