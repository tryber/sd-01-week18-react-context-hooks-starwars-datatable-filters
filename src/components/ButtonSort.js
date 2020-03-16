import React, { useContext } from 'react';

import { StarWarsContext } from '../context/StarWarsContext';

function changeOrder(event) {
  if (event === 'ASC') return 'DESC';
  return 'ASC';
}

const TableHeader = () => {
  const { setSortColumns, sortColumns: { order } } = useContext(StarWarsContext);
  const titles = [
    'name', 'rotation_period',
    'orbital_period', 'diameter',
    'climate', 'gravity',
    'terrain', 'surface_water',
    'population', 'films',
    'created', 'edited',
    'url',
  ];

  return (
    <thead>
      <tr>
        {titles.map((title) => (
          <th key={title}>
            <button
              type="button"
              onClick={(e) => setSortColumns(
                { column: e.target.innerHTML, order: changeOrder(order) },
              )}
            >
              {title}
            </button>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
