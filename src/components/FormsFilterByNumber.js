import React, { useContext } from 'react';
import { StarWarsContext } from '../context/StarWarsContext';

function FilterByNumber() {
  const {
    filters: { column, comparison, numberValue },
    filters,
    setFilters,
  } = useContext(StarWarsContext);

  const inputSelectColumn = () => (
    <label htmlFor="select-filter-column">
      <select
        id="select-filter-column"
        value={column}
        onChange={(event) => setFilters({...filters, column: event.target.value})}
      >
        <option value="" disabled>Select the Option</option>
        <option value="population">Population</option>
        <option value="orbital_period">Orbital Period</option>
        <option value="diameter">Diameter</option>
        <option value="rotation_period">Rotation Period</option>
        <option value="surface_water">Surface Water</option>
      </select>
    </label>
  );

  const inputSelectComparison = () => (
    <label htmlFor="select-filter-comparison">
      <select
        id="select-filter-comparison"
        value={comparison}
        onChange={(event) => setFilters({...filters, comparison: event.target.value})}
      >
        <option value="" disabled>Select the Option</option>
        <option value="greater-than">Maior que</option>
        <option value="less-than">Menor que</option>
        <option value="equal-to">Igual a</option>
      </select>
    </label>
  );

  const inputNumber = () => (
    <label htmlFor="filter-number">
      <input
        type="number"
        id="filter-number"
        value={numberValue}
        onChange={(event) => setFilters({...filters, numberValue: event.target.value})}
      />
    </label>
  );

  return (
    <div>
      {inputSelectColumn()}
      {inputSelectComparison()}
      {inputNumber()}
    </div>
  );
}

export default FilterByNumber;
