import React, { useContext } from 'react';

import context from '../store/context';

const FilterName = () => {
  const { filters: { name }, setFilters } = useContext(context);

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(event) => setFilters({ name: event.target.value })}
      />
      Pesquise através do nome do Planeta
    </div>
  );
};

export default FilterName;
