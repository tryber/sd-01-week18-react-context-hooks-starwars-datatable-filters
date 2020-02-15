import React, { useState, useContext, useEffect } from 'react';
import { ReciperContext } from '../context';




const handleClick = (numericFilter, setNumericFilter, database, setDatabase) => {
  const { column, comparison, value, available_categories, addFilter } = numericFilter;
  const categories = available_categories.filter((eachCategory) => eachCategory != column)

  const currentFilters = [...addFilter];
  currentFilters.push({ column, comparison, value });

  setNumericFilter({ addFilter: currentFilters, column: '', comparison: '', value: '', available_categories: categories });
}

const FilterButton = ({ numericFilter, setNumericFilter }) => {

  const { database, setDatabase } = useContext(ReciperContext);

  return (
    <button type="button" onClick={() => handleClick(numericFilter, setNumericFilter, database, setDatabase)}>
      Add Filter
      </button>
  );

}

// FilterButton.propTypes = {
//   dispatchSomething: PropTypes.func.isRequired,
//   resetFilter: PropTypes.func.isRequired,
//   column: PropTypes.func.isRequired,
//   comparison: PropTypes.func.isRequired,
//   value: PropTypes.func.isRequired,
//   available_categories: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
// };

export default FilterButton;
