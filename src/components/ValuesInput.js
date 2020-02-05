import React, { useContext, useState } from 'react';
import storeContext from '../context';

function ValuesInput() {
  const [column, setColumn] = useState('');
  const [comparison, setComparison] = useState('Maior');
  const [value, setValue] = useState('');
  const {
    setValuesFilter,
    valuesFilter: { filters },
  } = useContext(storeContext);

  const completeColumns = [
    '',
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  function arrayOfColumns() {
    if (filters.length > 0) {
      const arrayOfUsedColumns = filters.map((filter) => filter.column);
      const arrayOfColumnsToUse = completeColumns.filter(
        (colum) => !arrayOfUsedColumns.includes(colum),
      );
      return arrayOfColumnsToUse;
    }
    return completeColumns;
  }

  function generateColumnOptions() {
    return arrayOfColumns().map((each) => (
      <option key={each} value={each}>
        {each}
      </option>
    ));
  }

  function updateStore() {
    const numericValues = { column, comparison, value };
    const newFilters = [...filters, { column, comparison, value }];
    if (column === '' || comparison === '' || value === '') {
      return null;
    }
    setValue('');
    setColumn('');
    return setValuesFilter({ numericValues, filters: newFilters });
  }

  function generateValuesInput() {
    return (
      <div>
        <label htmlFor="column">
          <select onChange={(e) => setColumn(e.target.value)} data-testid="column" id="column">
            {generateColumnOptions()}
          </select>
        </label>
        <select
          onChange={(e) => setComparison(e.target.value)}
          data-testid="comparison"
          id="comparison"
        >
          <option value="Maior">Maior que</option>
          <option value="Menor">Menor que</option>
          <option value="Igual">Igual</option>
        </select>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          data-testid="comparisonValue"
          id="comparisonValue"
          type="number"
          placeholder="Valor"
        />
        <button type="button" onClick={updateStore}>
          Adicionar filtro
        </button>
      </div>
    );
  }
  if (filters.length === 5) {
    return 'All filters are being used';
  }
  return (
    <div>
      Choose the column to filter:
      <div>{generateValuesInput()}</div>
    </div>
  );
}

export default ValuesInput;
