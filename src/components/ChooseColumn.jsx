import React from 'react';
import PropTypes from 'prop-types';

const renderContent = (numericFilter, setNumericFilter) => {
  if (numericFilter.availableCategories.length >= 1) {
    return (
      <select
        key="categories" data-testid="column-dropdown"
        onChange={(e) => {
          if (e.target.value !== 'none') {
            setNumericFilter({ ...numericFilter, column: e.target.value });
          }
        }}
      >
        <option value="none" >Choose Column</option>
        {numericFilter.availableCategories.sort().map((category) => (
          <option key={category} value={category} >{category}</option>
        ))}
      </select>
    );
  }
  return null;
};

const ChooseColumn = ({ numericFilter, setNumericFilter }) => (
  <div>{renderContent(numericFilter, setNumericFilter)}</div>
);

ChooseColumn.propTypes = {
  numericFilter: PropTypes.shape({
    availableCategories: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  }).isRequired,
  setNumericFilter: PropTypes.func.isRequired,
};

export default ChooseColumn;
