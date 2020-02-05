import React, { useContext } from 'react';
import { StarWarsContext } from '../context/StarWarsContext';

import Loading from './Loading'
import './Table.css';

const generatingTableHeader = () => {
  const titleHeader = [
    'Name',
    'Rotation Period',
    'Orbital Period',
    'Diamater',
    'Climate',
    'Gravity',
    'Terrain',
    'Surface Water',
    'Population',
    'Films',
    'Created',
    'Edited',
    'url',
  ];
  return (
    <tr>
      {titleHeader.map((textName) => (
        <th key={textName}>{textName}</th>
      ))}
    </tr>
  );
};

const generatingTableBody = (data) => (
  <tr key={data.name}>
    <td>{data.name}</td>
    <td>{data.rotation_period}</td>
    <td>{data.orbital_period}</td>
    <td>{data.diameter}</td>
    <td>{data.climate}</td>
    <td>{data.gravity}</td>
    <td>{data.terrain}</td>
    <td>{data.surface_water}</td>
    <td>{data.population}</td>
    <td>{data.films.map((film) => <div key={film}>{film}</div>)}</td>
    <td>{data.created}</td>
    <td>{data.edited}</td>
    <td>{data.url}</td>
  </tr>
);

const filterByName = (data, inputTextValue) => {
  if(inputTextValue) {
    return data.filter(({ name }) => name.toLowerCase().includes(inputTextValue));
  }
  return data;
}

const Planets = () => {
  const { data, isFetching, inputTextValue } = useContext(StarWarsContext);
  if (!isFetching) return <Loading />;
  
  const filter = filterByName(data, inputTextValue);
  console.log(filter);

  return (
    <div>
      <table className="table-formatation">
        <thead>{generatingTableHeader(data)}</thead>
        <tbody>{filter.map((data) => generatingTableBody(data))}</tbody>
      </table>
    </div>
  );
}

export default Planets;
