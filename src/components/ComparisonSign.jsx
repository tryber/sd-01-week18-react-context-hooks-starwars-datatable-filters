import React from 'react';
import PropTypes from 'prop-types';


const ComparisonSign = ({ numericFilter, setNumericFilter }) => (
  <div>
    <div>
      <input
        type="radio" id="greater" name="sign" value="greater" data-testid="greater-radio"
        onClick={(e) => setNumericFilter({ ...numericFilter, comparison: e.target.value })}
      />
      <label htmlFor="greater">Maior que</label>
    </div>
    <div>
      <input
        type="radio" id="less" name="sign" value="less" data-testid="less-radio"
        onClick={(e) => setNumericFilter({ ...numericFilter, comparison: e.target.value })}
      />
      <label htmlFor="less">Menor que</label>
    </div>
    <div>
      <input
        type="radio" id="iqual" name="sign" value="iqual" data-testid="iqual-radio"
        onClick={(e) => setNumericFilter({ ...numericFilter, comparison: e.target.value })}
      />
      <label htmlFor="iqual">Igual a</label>
    </div>
  </div>
);

ComparisonSign.propTypes = {
  numericFilter: PropTypes.shape({
    comparison: PropTypes.string.isRequired,
  }).isRequired,
  setNumericFilter: PropTypes.func.isRequired,
};

export default ComparisonSign;
