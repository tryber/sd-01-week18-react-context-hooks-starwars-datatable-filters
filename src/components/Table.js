import React, { useContext, useEffect } from 'react';
import { StarWarsContext } from '../context/StarWarsContext';
import filterData from '../filters/InputPlanetFilter';
import Header from './Header';
import './Table.css';

const BaseTable = () => {
  const { IsReadyAPI, data } = useContext(StarWarsContext);

  useEffect(() => {
    IsReadyAPI();
  }, [IsReadyAPI]);

  const PlanetInfo = (planet) => (
    <tr key={planet.name}>
      <td>{`${planet.name}`}</td>
      <td>{`${planet.rotation_period}`}</td>
      <td>{planet.orbital_period}</td>
      <td>{planet.diameter}</td>
      <td>{planet.climate}</td>
      <td>{planet.gravity}</td>
      <td>{planet.terrain}</td>
      <td>{planet.surface_water}</td>
      <td>{planet.population}</td>
      <td>{planet.films.map((film) => <div key={film}>{film}</div>)}</td>
      <td>{planet.created}</td>
      <td>{planet.edited}</td>
      <td>{planet.url}</td>
    </tr>
  );

  return (
    <table>
      <tbody>
        <Header />
        {data.planets.map((planet) => PlanetInfo(planet))}
      </tbody>
    </table>
  );
};

export default BaseTable;
