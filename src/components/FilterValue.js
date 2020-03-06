import React, { useContext } from 'react';

import context from '../store/context';

const FilterValue = () => {
  const { setValue } = useContext(context);
  return (
    <input
      type="number"
      placeholder="Filtrar por Valor"
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default FilterValue;
