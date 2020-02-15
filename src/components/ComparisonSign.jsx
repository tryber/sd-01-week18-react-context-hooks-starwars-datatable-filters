import React from 'react';
import PropTypes from 'prop-types';


const ComparisonSign = ({ numericFilter, setNumericFilter }) => {
  return (
    <div>
      <div>
        <input
          type="radio" id="greater" name="sign" value="greater"
          onClick={(e) => setNumericFilter({ ...numericFilter, comparison: e.target.value })}
        />
        <label htmlFor="greater">Maior que</label>
      </div>
      <div>
        <input
          type="radio" id="less" name="sign" value="less"
          onClick={(e) => setNumericFilter({ ...numericFilter, comparison: e.target.value })}
        />
        <label htmlFor="less">Menor que</label>
      </div>
      <div>
        <input
          type="radio" id="iqual" name="sign" value="iqual"
          onClick={(e) => setNumericFilter({ ...numericFilter, comparison: e.target.value })}
        />
        <label htmlFor="iqual">Igual a</label>
      </div>
    </div>
  );
}

// ComparisonSign.propTypes = {
//   dispatchSomething: PropTypes.func.isRequired,
// };

export default ComparisonSign;
