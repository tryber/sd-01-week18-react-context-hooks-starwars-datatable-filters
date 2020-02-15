import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ReciperContext } from '../context';
import ChooseColumn from './ChooseColumn';
import ComparisonSign from './ComparisonSign';
import NumberRange from './NumberRange';
import FilterButton from './FilterButton';
import DisplayFilterNum from './DisplayFilterNum';

import { filterNumber } from '../services';


const FilterNum = () => {
  const { database, setDatabase } = useContext(ReciperContext);
  const [numericFilter, setNumericFilter] = useState({ column: '', comparison: '', value: '', availableCategories: ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'], addFilter: [] })
  const { column, comparison, value, addFilter } = numericFilter;
  const { data } = database;

  useEffect(() => {
    if (data) {
      let dados = [...data]
      addFilter.map(({ column, comparison, value }) => dados = filterNumber(dados, column, comparison, value))
      setDatabase({ ...database, planets: dados })
    }
  }, [addFilter])

  return (
    <div>
      <h2>Filter Table By Number</h2>
      {addFilter.map((eachFilter, index) => <DisplayFilterNum key={eachFilter.column + index} filter={eachFilter} numericFilter={numericFilter} setNumericFilter={setNumericFilter} />)}
      <ChooseColumn numericFilter={numericFilter} setNumericFilter={setNumericFilter} />
      {column !== '' && <ComparisonSign numericFilter={numericFilter} setNumericFilter={setNumericFilter} />}
      {comparison !== '' && <NumberRange numericFilter={numericFilter} setNumericFilter={setNumericFilter} />}
      {value !== '' && <FilterButton numericFilter={numericFilter} setNumericFilter={setNumericFilter} />}
    </div>
  );

}

// FilterNum.propTypes = {
//   column: PropTypes.string,
//   comparison: PropTypes.string,
//   value: PropTypes.string,
// };

// FilterNum.defaultProps = {
//   column: '',
//   comparison: '',
//   value: '',
// };

export default FilterNum;
