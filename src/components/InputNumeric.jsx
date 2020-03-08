import React, { useContext } from 'react';
import { StarWarsContext } from '../context/StarWarsContext';

const InputNumeric = () => {
  const { setFilterValue, filtervalue } = useContext(StarWarsContext);
  return (
    <input
      type="number"
      value={filtervalue}
      placeholder="Valor numérico"
      onChange={(e) => setFilterValue(e.target.value)}
    />
  );
};

export default InputNumeric;