import React, { useContext } from 'react';
import storeContext from '../context';

function FiltersActive() {
  const { valuesFilter, setValuesFilter } = useContext(storeContext);

  function removeFilter(filter) {
    const newFilters = valuesFilter.filter((filt) => filt.column !== filter.column);
    return setValuesFilter(newFilters);
  }

  function showFilters() {
    if (valuesFilter.length > 0) {
      return valuesFilter.map((filter) => (
        <div>
          <p key={filter.column}>{`${filter.column} - ${filter.comparison} - ${filter.value}`}</p>
          <button type="button" onClick={() => removeFilter(filter)}>
            X
          </button>
        </div>
      ));
    }
    return 'no filter';
  }

  return (
    <div>
      Filters active:
      {showFilters()}
    </div>
  );
}

export default FiltersActive;
