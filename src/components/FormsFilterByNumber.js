import React, { useContext } from 'react';
import { StarWarsContext } from '../context/StarWarsContext';

function FilterByNumber() {
  const {
    filterNumberColumn,
    setFilterNumberColumn,
    filterNumberComparison,
    setFilterNumberComparison,
    filterNumberValue,
    setFilterNumberValue,
  } = useContext(StarWarsContext);

  const inputSelectColumn = () => (
    <label htmlFor="select-filter-column">
      Select The Column:
      <select
        id="select-filter-column"
        value={filterNumberColumn}
        onChange={(e) => setFilterNumberColumn(e.target.value)}
      >
        <option value={null} disabled>Select the Column</option>
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
      Select the Comparison
      <select
        id="select-filter-comparison"
        value={filterNumberComparison}
        onChange={(e) => setFilterNumberComparison(e.target.value)}
      >
        <option value="greater-than">Maior que</option>
        <option value="less-than">Menor que</option>
        <option value="equal-to">Igual a</option>
      </select>
    </label>
  );

  const inputNumber = () => (
    <label htmlFor="filter-number">
      Select The Number for Filter:
      <input
        type="number"
        id="filter-number"
        value={filterNumberValue}
        onChange={(e) => setFilterNumberValue(e.target.value)}
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
