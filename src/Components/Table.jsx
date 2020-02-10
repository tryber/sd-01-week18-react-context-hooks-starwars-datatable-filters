import React, { useContext } from 'react';
import StarWarsContext from '../Context/StarWarsContext';

const renderTableData = (data) => {
  return data.map((planets) => {
    const { name, diameter, climate, gravity, terrain, created } = planets;
    return (
      <tr key={created}>
        <td>{name}</td>
        <td>{diameter}</td>
        <td>{climate}</td>
        <td>{gravity}</td>
        <td>{terrain}</td>
      </tr>
    );
  });
};

export const Table = () => {
  const { data, setData} = useContext(StarWarsContext);

  return (
  <StarWarsContext.Consumer>
    {(context) => {
      {renderTableData(data.results)}
    }}
  </StarWarsContext.Consumer>
  )
}
