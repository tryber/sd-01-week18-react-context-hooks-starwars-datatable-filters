import React from 'react';

const Table = () => {
  const headerTable = [
    'Name',
    'Rotation Period',
    'Orbital Period',
    'Diameter',
    'Climate',
    'Gravity',
    'Terrain',
    'Surface Water',
    'Population',
    'Films',
    'Created',
    'Edited',
    'Url',
  ];
  return (
    <tr>
      {headerTable.map((value) => <th key={value}>{value}</th>)}
    </tr>
  );
};

export default Table;
