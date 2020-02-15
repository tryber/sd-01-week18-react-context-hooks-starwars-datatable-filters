import React from 'react';
import PropTypes from 'prop-types';

const handleClick = (numericFilter, setNumericFilter) => {
  const { column, comparison, value, available_categories, addFilter } = numericFilter;
  const categories = available_categories.filter((eachCategory) => eachCategory != column)
  const currentFilters = [...addFilter];
  currentFilters.push({ column, comparison, value });
  setNumericFilter({ addFilter: currentFilters, column: '', comparison: '', value: '', available_categories: categories });
};

const FilterButton = ({ numericFilter, setNumericFilter }) => (
  <button
    type="button"
    onClick={() => handleClick(numericFilter, setNumericFilter)}
  >Add Filter</button>
);

FilterButton.propTypes = {
  numericFilter: PropTypes.arrayOf(
    PropTypes.shape({
      availableCategories: PropTypes.string.isRequired,
    })).isRequired,
  setNumericFilter: PropTypes.func.isRequired,
};

export default FilterButton;
