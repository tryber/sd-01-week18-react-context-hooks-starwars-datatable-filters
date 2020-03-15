import React, { useContext } from 'react';
import { PlanetsContext } from '../context/StarWarsContext';

function TableHeader() {
  const { setColumnSort } = useContext(PlanetsContext);
  const titles = [
    'name',
    'population',
    'orbital_period',
    'diameter',
    'climate',
    'gravity',
    'terrain',
    'rotation_period',
    'surface_water',
    'films',
    'created',
    'edited',
    'url',
  ];

  return (
    <tr>
      {titles.map((title) => (
        <th key={title}>
          <button type="button" onClick={(e) => setColumnSort(e.target.innerHTML)}>{title}</button>
        </th>
      ))}
    </tr>
  );
}

export default TableHeader;
