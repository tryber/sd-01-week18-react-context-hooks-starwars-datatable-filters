import React from 'react';
import PropTypes from 'prop-types';

const handleClick = (column, numericFilter, setNumericFilter) => {
  const { addFilter, available_categories } = numericFilter;
  const categories = [...available_categories];
  categories.push(column);
  setNumericFilter({ ...numericFilter, available_categories: categories.sort(), addFilter: addFilter.filter((eachFilter) => eachFilter.column !== column) });
}

const RemoveButton = ({ column, numericFilter, setNumericFilter }) => {
  return (
    <button type="button" onClick={() => handleClick(column, numericFilter, setNumericFilter)}> X
      </button>
  );
}

RemoveButton.propTypes = {
  column: PropTypes.string.isRequired,
  numericFilter: PropTypes.shape({
    available_categories: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    addFilter: PropTypes.arrayOf(
      PropTypes.shape({
        column: PropTypes.string.isRequired,
        comparison: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
      })).isRequired,
  }).isRequired,
}

export default RemoveButton;
