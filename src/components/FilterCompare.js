import React, { useContext } from 'react';

import context from '../store/context';

const FilterCompare = () => {
  const { setComparison } = useContext(context);
  return (
    <select
      data-testid="select-comparison"
      name="type"
      defaultValue=""
      onChange={(e) => setComparison(e.target.value)}
    >
      <option value="" disabled>Selecionar Opção</option>
      <option value="bigger">Maior que</option>
      <option value="less">Menor que</option>
      <option value="equal">Igual a</option>
    </select>
  );
};

export default FilterCompare;
