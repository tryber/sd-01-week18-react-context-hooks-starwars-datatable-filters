import React from 'react';
import StarWarsContext from '../Context/StarWarsContext';

const renderTableData = () => {
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

export const Table = ({ children }) => {
  const context {
    data,
    setData,
  };

  return (
  <StarWarsContext.Consumer>
    {(context) => {
      {renderTableData}
    }}
  </StarWarsContext.Consumer>
  )
}
