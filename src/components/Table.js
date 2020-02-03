import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';
import './Table.css';


const BaseTable = () => {
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

const FullTable = (planet) => (
  <tr key={planet.name}>
    <td>{`${planet.name}`}</td>
    <td>{planet.orbital_period}</td>
    <td>{planet.diameter}</td>
    <td>{planet.climate}</td>
    <td>{planet.gravity}</td>
    <td>{planet.terrain}</td>
    <td>{planet.surface_water}</td>
    <td>{planet.population}</td>
    <td>{/*planet.films*/}</td>
    <td>{planet.created}</td>
    <td>{planet.edited}</td>
    <td>{planet.url}</td>
  </tr>
);

export default BaseTable;
