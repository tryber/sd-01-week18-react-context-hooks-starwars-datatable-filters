import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RemoveButton from './RemoveButton';
import { comparisonSing } from '../services';



const DisplayFilterNum = ({ filter, index, numericFilter, setNumericFilter }) => {
  const { column, value, comparison } = filter;
  return (
    <div style={{ display: 'flex' }}>
      <p>
        {column} |
            {comparisonSing(comparison)} |
            {value}
      </p>
      <RemoveButton column={column} numericFilter={numericFilter} setNumericFilter={setNumericFilter}/>
    </div>
  );
}

// DisplayFilterNum.propTypes = {
//   addFilter: PropTypes.arrayOf(PropTypes.shape({
//     value: PropTypes.string.isRequired,
//   })),
//   dispatchSomething: PropTypes.func.isRequired,
//   availableCategories: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
// };

// DisplayFilterNum.defaultProps = {
//   addFilter: [],
// };

export default DisplayFilterNum;
