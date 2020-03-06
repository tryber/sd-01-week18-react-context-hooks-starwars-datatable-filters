import React, { useContext } from 'react';

import context from '../store/context';

const FilterName = () => {
  const { filterName, setFilterName } = useContext(context);

  return (
    <div>
      <input
        type="text"
        placeholder="Filtrar por nome"
        value={filterName}
        data-testid="planet-name-input"
        onChange={(event) => setFilterName(event.target.value)}
      />
      Pesquise através do nome do Planeta
    </div>
  );
};

export default FilterName;
