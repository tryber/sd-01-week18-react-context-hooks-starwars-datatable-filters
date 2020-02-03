import React, { useContext } from 'react';
import { StarWarsContext } from '../context/StarWarsContext';
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

  const Header = () => (
    <tr>
      {headerTable.map((value) => <th key={value}>{value}</th>)}
    </tr>
  );

  const { planetsFullInfo } = useContext(StarWarsContext);

  const PlanetsInfo = (planet) => (
    <tr key={planet.name}>
      <td>{`${planet.name}`}</td>
      <td>{planet.orbital_period}</td>
      <td>{planet.diameter}</td>
      <td>{planet.climate}</td>
      <td>{planet.gravity}</td>
      <td>{planet.terrain}</td>
      <td>{planet.surface_water}</td>
      <td>{planet.population}</td>
      <td>{planet.films.map((film) => <div>{film}</div>)}</td>
      <td>{planet.created}</td>
      <td>{planet.edited}</td>
      <td>{planet.url}</td>
    </tr>
  );

  return (
    <table>
      <tbody>
        {Header()}
        {PlanetsInfo(planetsFullInfo)}
      </tbody>
    </table>
  );
};

export default BaseTable;
