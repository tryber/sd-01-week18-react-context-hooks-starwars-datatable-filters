import React, { useContext } from 'react';
import StarWarsContext from '../Context/StarWarsContext';

function renderTableData(data) {
  data.map((planets) => {
    const {
      name,
      diameter,
      climate,
      gravity,
      terrain,
    } = planets;

    return (
      <tr key={diameter}>
        <td>{name}</td>
        <td>{diameter}</td>
        <td>{climate}</td>
        <td>{gravity}</td>
        <td>{terrain}</td>
      </tr>
    );
  });
}

const Table = () => {
  const { data } = useContext(StarWarsContext);
  console.log(data);
  return (
    <div>
      {renderTableData(data)}
    </div>
  );
};


export default Table;
