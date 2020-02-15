import React from 'react';
import PropTypes from 'prop-types';
import RemoveButton from './RemoveButton';
import { comparisonSing } from '../services';

const DisplayFilterNum = ({ filter, numericFilter, setNumericFilter }) => {
  const { column, value, comparison } = filter;
  return (
    <div style={{ display: 'flex' }}>
      <p>{column} | {comparisonSing(comparison)} | {value}</p>
      <RemoveButton
        column={column}
        numericFilter={numericFilter}
        setNumericFilter={setNumericFilter}
      />
    </div>
  );
};

DisplayFilterNum.propTypes = {
  filter: PropTypes.shape({
    column: PropTypes.string.isRequired,
    comparison: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }).isRequired,
  numericFilter: PropTypes.objectOf(PropTypes.object),
  setNumericFilter: PropTypes.func.isRequired,
};

export default DisplayFilterNum;
