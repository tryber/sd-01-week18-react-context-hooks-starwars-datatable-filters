import React from 'react';
import PropTypes from 'prop-types';

const NumberRange = ({ numericFilter, setNumericFilter }) => (
  <input
    type="number" data-testid="number-input"
    onChange={(e) => setNumericFilter({ ...numericFilter, value: e.target.value })}
  />
);

NumberRange.propTypes = {
  numericFilter: PropTypes.shape({
    value: PropTypes.string.isRequired,
  }).isRequired,
  setNumericFilter: PropTypes.func.isRequired,
};

export default NumberRange;
