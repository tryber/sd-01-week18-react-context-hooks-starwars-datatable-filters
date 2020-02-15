import React, { useContext } from 'react';
import { ReciperContext } from '../context';
import usePlanets from '../hooks/usePlanets';

const renderTable = (categories, planets) => (
  <table>
    <thead>
      <tr>
        {categories.map((category) => <th key={category} data-testid={category}>{category}</th>)}
      </tr>
    </thead>
    <tbody>
      {planets.map((planet, index) => <tr key={planet.name}>
        {categories.map((key) => <td key={key} data-testid={`row${key + index}`}>{planet[key]}</td>)}
      </tr>)}
    </tbody>
  </table>
);

const Table = () => {
  const { database: { categories, planets, isFetch } } = useContext(ReciperContext);
  usePlanets();
  return (
    <div>
      {planets && !isFetch ? renderTable(categories, planets) : <p>Loading...</p>}
    </div>
  );
};

export default Table;
