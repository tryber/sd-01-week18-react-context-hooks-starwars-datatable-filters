import React, { useContext, useState} from 'react';
import StarWarsContext from '../Context/StarWarsContext';
import '../Style/FilteredNumber.css';

const verifyFilter = (filters, value) => {
  const isFilter = filters.find((filterObj) => filterObj.select === value);
  if (isFilter) return false;
  return true;
};

const createFilter = (filter, removeFilter) => {
  return (
    <ul key={filter.select}>
      <ol>{`${filter.select} | ${filter.comparison} | ${filter.value}  `}</ol>
      <button type="button" onClick={() => removeFilter(filter)}>X</button>
    </ul>
  );
}
const showFilters = (filters, removeFilters) => {
  return filters.map((filter) => createFilter(filter, removeFilters));
}
const filterMain = (comparison, value, select, data) => {
  console.log('comparison', comparison);
  console.log('value', value);
  console.log('select', select);
  console.log('filterMain', data);

  if (comparison === '' || value === '' || select === '') {
    return alert('tá faltando dado aí!');
  }
  switch (comparison) {
    case 'Maior que':
      return data.filter((planet) => {
        return planet[select] > Number(value) && planet[select] !== 'unknown';
      });

    case 'Menor que':
      return data.filter((planet) => {
        return planet[select] < Number(value) && planet[select] !== 'unknown';
      });

    case 'Igual a':
      return data.filter((planet) => {
        return planet[select] === value && planet[select] !== 'unknown';
      });
    default:
      break;
  }
};

const FilteredNumber = () => {
  const [comparison, setComparison] = useState('');
  const [value, setValue] = useState('0');
  const [select, setSelect] = useState('');
  const [numericColumns, setFilters] = useState([]);
  const { data, fetchStarWars, setNewData } = useContext(StarWarsContext);

  console.log('data FilteredNumber', data);
  fetchStarWars();

  const setNumericColumns = (numericFilter) => {
    setFilters([...numericColumns, numericFilter]);
  };

  const removeNumericColumns = (numericFilter) => {
    const newFilters = ([...numericColumns.filter((filter) => filter !== numericFilter)]);
    return setFilters(newFilters);
  };

  return (
    <div className="content-filters">
      <div className="content-filter">
        <select className="select-comparison" onChange={(e) => setSelect(e.target.value)}>
          <option>Escolha sua opção</option>
          {verifyFilter(numericColumns, 'population') && <option value="population">population</option>}
          {verifyFilter(numericColumns, 'orbital_period') && <option value="orbital_period">orbital_period</option>}
          {verifyFilter(numericColumns, 'diameter') && <option value="diameter">diameter</option>}
          {verifyFilter(numericColumns, 'rotation_period') && <option value="rotation_period">rotation_period</option>}
          {verifyFilter(numericColumns, 'surface_water') && <option value="surface_water">surface_water</option>}
        </select>
        <div className="radio-coparison">
          <input
            data-testid="radio-comparison-maior"
            type="radio"
            name="comparison"
            value="Maior que"
            onClick={(e) => setComparison(e.target.value)}
          />
          Maior que
          <input
            data-testid="radio-comparison-menor"
            type="radio"
            name="comparison"
            value="Menor que"
            onClick={(e) => setComparison(e.target.value)}
          />
          Menor que
          <input
            data-testid="radio-comparison-igual"
            type="radio"
            name="comparison"
            value="Igual a"
            onClick={(e) => setComparison(e.target.value)}
          />
          Igual a
        </div>
        <input
          className="input-number-comparison"
          type="text"
          onChange={(e) => setValue(e.target.value)}
          placeholder="Coloque a quantidade aquii"
        />
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
      </div>
      <h3>{showFilters(numericColumns, removeNumericColumns)}</h3>
    </div>
  );
};

export default FilteredNumber;
