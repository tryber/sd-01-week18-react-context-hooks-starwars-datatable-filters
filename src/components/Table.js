import React, { useContext } from 'react';
import { StarWarsContext } from '../context/StarWarsContext';

import Loading from './Loading';
import './Table.css';
import ButtonSort from './ButtonSort';

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

function filterPlanetByName(data, filterPlanetName) {
  const nameFiltered = data.filter(({ name }) => name.toLowerCase().includes(filterPlanetName));
  return nameFiltered;
}

const comparisonCase = (filters, data) => (
  filters.reduce((previousList, filter, index) => {
    const { numeric_values: { column, value, comparison } } = filter;
    const planetList = (index === 0) ? data : previousList;
    const obj = {
      bigger: planetList.filter((planet) => Number(planet[column]) > value),
      less: planetList.filter((planet) => Number(planet[column]) < value),
      equal: planetList.filter((planet) => planet[column] === value),
    };
    return obj[comparison];
  }, [])
);

const filterNumericNumber = (planetsData, filters) => {
  if (filters.length !== 0) {
    return comparisonCase(filters, planetsData);
  }
  return planetsData;
};

const ascending = (planetsData, column) => (
  planetsData.sort((a, b) => {
    if (a[column] === 'unknown') return 1;
    if (b[column] === 'unknown') return -1;
    return Number(a[column]) - Number(b[column]);
  })
);

const sortAscending = (planetsData, isNumeric, column) => {
  if (!isNumeric) {
    return planetsData.sort((a, b) => {
      if (a[column] > b[column]) return 1;
      return -1;
    });
  }
  return ascending(planetsData, column);
};

const descending = (planetsData, column) => (
  planetsData.sort((a, b) => {
    if (a[column] === 'unknown') return -1;
    if (b[column] === 'unknown') return 1;
    return Number(b[column]) - Number(a[column]);
  })
);

const sortDescending = (planetsData, isNumeric, column) => {
  if (!isNumeric) {
    return planetsData.sort((a, b) => {
      if (a[column] > b[column]) return -1;
      return 1;
    });
  }
  return descending(planetsData, column);
};

const changeColumnOrder = (planetsData, column, order) => {
  const numericColumns = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];
  const isNumeric = numericColumns.includes(column);

  if (!column) return planetsData;
  if (order === 'ASC') return sortAscending(planetsData, isNumeric, column);
  return sortDescending(planetsData, isNumeric, column);
};

const Table = () => {
  const {
    isFetching,
    data,
    filterPlanetName,
    sortColumns: { column, order },
    filters,
  } = useContext(StarWarsContext);

  const planetsFiltered = filterPlanetName ? filterPlanetByName(data, filterPlanetName) : data;
  if (!isFetching) return <Loading />;
  const filterNumber = filterNumericNumber(planetsFiltered, filters);
  const sortedPlanets = changeColumnOrder(filterNumber, column, order);
  return (
    <table className="table-formatation">
      <ButtonSort />
      <thead>{generatingTableHeader(sortedPlanets)}</thead>
      <tbody>{sortedPlanets.map((planets) => generatingTableBody(planets))}</tbody>
    </table>
  );
};

export default Table;
