import React, { useContext } from 'react';
import { PlanetsContext } from '../context/PlanetsContext.js';

const saveFilter = (AllFilters, filter, index, setFilters, removeFilters) => {
  const { column, comparison, value } = filter;
  const columnsProperties = {
    population: 'Populção',
    orbital_period: 'Periodo de Orbita',
    diameter: 'Diametro',
    rotation_period: 'Periodo de Rotação',
    surface_water: 'Superficie de Água',
  };

  return (
    <div key={column}>
      <p>
        {`${columnsProperties[column]}| ${comparison} | ${value} `}
      </p>
      <input type="button" value="X" onClick={() => removeFilters(AllFilters, index, setFilters)} />
    </div>
  );
};

const removeFilters = (AllFilters, removeIndex, setFilters) => {
  setFilters([...AllFilters.filter((filter, index) => (index !== removeIndex))]);
};

const FiltersActive = () => {
  const { filters, setFilters } = useContext(PlanetsContext);
  return (
    <div>
      {
        filters &&
        filters.map((filter, index) => saveFilter(
          filters,
          filter,
          index,
          setFilters,
          removeFilters,
          filters,
        ))
      }
    </div>
  );
};

export default FiltersActive;
