import React from 'react';
import PropTypes from 'prop-types';

const NumberRange = ({ numericFilter, setNumericFilter }) => {
  return (
    <div>
      <input
        type="number"
        onChange={(e) => setNumericFilter({ ...numericFilter, value: e.target.value })}
      />
    </div>
  );
}

// NumberRange.propTypes = {
//   dispatchSomething: PropTypes.func.isRequired,
// };

export default NumberRange;
