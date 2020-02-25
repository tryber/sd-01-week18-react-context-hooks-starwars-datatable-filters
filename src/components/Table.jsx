import React, { useContext } from 'react';

import context from '../context/StarWarsContext';

const Table = () => {
  const { tablePlanets } = useContext(context);

  return (
    <div>
      {tablePlanets.map((planets, index) => {
        <tr key={index}>
          <td key={planets.name}>{planets.name}</td>
          <td key={planets.rotation_period}>{planets.rotation_period}</td>
          <td key={planets.orbital_period}>{planets.orbital_period}</td>
          <td key={planets.diameter}>{planets.diameter}</td>
          <td key={planets.climate}>{planets.climate}</td>
          <td key={planets.gravity}>{planets.gravity}</td>
          <td key={planets.terrain}>{planets.terrain}</td>
          <td key={planets.surface_water}>{planets.surface_water}</td>
          <td key={planets.population}>{planets.population}</td>
          <td key={planets.films}>{planets.films.map((films) => <p>{films}</p>)}</td>
          <td key={planets.created}>{planets.created}</td>
          <td key={planets.edited}>{planets.edited}</td>
          <td key={planets.url}>{planets.url}</td>
        </tr>
      })}

    </div>
  );
};

export default Table;
