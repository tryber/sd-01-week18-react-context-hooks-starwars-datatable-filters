import React, { useContext } from 'react';
import StarWarsContext from '../Context/StarWarsContext';
import '../Style/FilteredNumber.css';

const verifyFilter = (filters, value) => {
  const isFilter = filters.find((filterObj) => filterObj.select === value);
  if (isFilter) return false;
  return true;
};

const filterMain = (comparison, value, select, data) => {
  if (!comparison === '' || !value === '' || !select === '') {
    return alert('complete o filtro');
  }
  switch (comparison) {
    case 'Maior que':
      return data.filter(
        (planet) => planet[select] > Number(value) && planet[select] !== 'unknown',
      );
    case 'Menor que':
      return data.filter(
        (planet) => planet[select] < Number(value) && planet[select] !== 'unknown',
      );

    case 'Igual a':
      return data.filter(
        (planet) => planet[select] === value && planet[select] !== 'unknown',
      );
    default:
      break;
  }
  return false;
};

const createFilter = (
  filter, removeFilter, setNewData, comparison, value, select, data,
) => (
  <ul key={filter.select}>
    <ol>{`${filter.select} | ${filter.comparison} | ${filter.value}  `}</ol>
    <button
      type="button"
      onClick={
        () => removeFilter(
          filter,
          setNewData(setNewData(filterMain(comparison, value, select, data.planets))),
        )
      }
    >
    x
    </button>
  </ul>
);

const generateSelect = (
  numericColumns, setSelect,
) => (
  <select className="select-comparison" onChange={(e) => setSelect(e.target.value)}>
    <option>Escolha sua opção</option>
    {verifyFilter(numericColumns, 'population') && <option value="population">population</option>}
    {verifyFilter(numericColumns, 'orbital_period') && <option value="orbital_period">orbital_period</option>}
    {verifyFilter(numericColumns, 'diameter') && <option value="diameter">diameter</option>}
    {verifyFilter(numericColumns, 'rotation_period') && <option value="rotation_period">rotation_period</option>}
    {verifyFilter(numericColumns, 'surface_water') && <option value="surface_water">surface_water</option>}
  </select>
);

const generateRadio = (
  setComparison,
) => (
  <div className="radio-coparison">
    <label htmlFor="input-big">
      Maior que
      <input
        id="input-big"
        data-testid="radio-comparison-maior"
        type="radio"
        name="comparison"
        value="Maior que"
        onClick={(e) => setComparison(e.target.value)}
      />
    </label>
    <label htmlFor="input-less">
      Menor que
      <input
        data-testid="radio-comparison-menor"
        id="input-less"
        type="radio"
        name="comparison"
        value="Menor que"
        onClick={(e) => setComparison(e.target.value)}
      />
    </label>
    <label htmlFor="input-equal">
      Igual a
      <input
        data-testid="radio-comparison-igual" 
        id="input-equal"
        type="radio"
        name="comparison"
        value="Igual a"
        onClick={(e) => setComparison(e.target.value)}
      />
    </label>
  </div>
);


const generetaInputNumber = (
  setValue,
) => (
  <input
    className="input-number-comparison"
    type="text"
    onChange={(e) => setValue(e.target.value)}
    placeholder="Coloque a quantidade aqui"
  />
);


const generateButtonSearch = (
  setNumericColumns,
  select,
  comparison, value, setNewData, data,
) => (
  <button
    className="btn"
    type="button"
    onClick={() => {
      setNumericColumns({ select, comparison, value });
      setNewData(filterMain(comparison, value, select, data.planets));
    }}
  >
  filtrar
  </button>
);


const showFilters = (
  filters, removeFilters, setNewData, comparison, value, select, data,
) => filters.map((filter) => createFilter(
  filter,
  removeFilters,
  setNewData,
  comparison,
  value,
  select,
  data,
));


const FilteredNumber = () => {
  const {
    data, fetchStarWars, setNewData, comparison, setComparison,
    value, setValue, select, setSelect, numericColumns, setFilters,
  } = useContext(StarWarsContext);
  fetchStarWars();
  const setNumericColumns = (numericFilter) => {
    setFilters([...numericColumns, numericFilter]);
  };
  const removeNumericColumns = (numericFilter) => {
    const newFilters = ([...numericColumns.filter(
      (filter) => (filter !== numericFilter),
    )]);
    return setFilters(newFilters);
  };
  return (
    <div className="content-filters">
      <div className="content-filter">
        {generateSelect(numericColumns, setSelect)}
        {generateRadio(setComparison)}
        {generetaInputNumber(setValue)}
        {generateButtonSearch(setNumericColumns, select, comparison, value, setNewData, data)}
      </div>
      <h3>
        {showFilters(
          numericColumns, removeNumericColumns, setNewData, comparison, value, select, data,
        )}
      </h3>
    </div>
  );
};

export default FilteredNumber;
