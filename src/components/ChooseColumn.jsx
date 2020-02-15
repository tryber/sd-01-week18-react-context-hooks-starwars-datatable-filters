import React from 'react';
import PropTypes from 'prop-types';

const renderContent = (numericFilter, setNumericFilter) => {
  if (numericFilter.available_categories.length >= 1) {
    return (
      <select
        key="categories" onChange={(e) => {
          if (e.target.value !== 'none') {
            setNumericFilter({ ...numericFilter, column: e.target.value });
          }
        }}
      >
        <option value="none" >Choose Column</option>
        {numericFilter.available_categories.sort().map((category) => (
          <option key={category} value={category} >{category}</option>
        ))}
      </select>
    );
  }
  return null;
}

const ChooseColumn = ({ numericFilter, setNumericFilter }) => {
  return (
    <div>
      {renderContent(numericFilter, setNumericFilter)}
    </div>
  );

}

// ChooseColumn.propTypes = {
//   dispatchSomething: PropTypes.func.isRequired,
//   available_categories: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
// };

export default ChooseColumn;
