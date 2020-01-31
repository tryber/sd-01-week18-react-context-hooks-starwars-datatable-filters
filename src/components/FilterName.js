import React, { useContext } from 'react';
import { PlanetsContext } from '../context/PlanetsContext.js';


const FilterName = () => {
  const { filterName, setFilterName } = useContext(PlanetsContext);
  return (
    <div>
      <label htmlFor="filter-name">
        <input
          id="filter-name"
          type="text"
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
        />
      </label>
    </div>
  );
};


export default FilterName;
