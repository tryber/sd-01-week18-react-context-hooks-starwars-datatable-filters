import React, { useContext, useEffect } from 'react';
import { PlanetsContext } from '../context/StarWarsContext';
import TableHeader from './TableHeader';

function sortAscending(planetsData, isNumeric, column) {
  if (!isNumeric) {
    return planetsData.sort((a, b) => {
      if (a[column] > b[column]) return 1;
      if (b[column] > a[column]) return -1;
      return 0;
    });
  }
  return planetsData.sort((a, b) => {
    if (a[column] === 'unknown') return 1;
    if (b[column] === 'unknown') return -1;
    return Number(a[column]) - Number(b[column]);
  });
}

function sortDescending(planetsData, isNumeric, column) {
  if (!isNumeric) {
    return planetsData.sort((a, b) => {
      if (a[column] > b[column]) return -1;
      if (b[column] > a[column]) return 1;
      return 0;
    });
  }
  return planetsData.sort((a, b) => {
    if (a[column] === 'unknown') return -1;
    if (b[column] === 'unknown') return 1;
    return Number(b[column]) - Number(a[column]);
  });
}

function changeColumnOrder(planetsData, sortColumn) {
  const { column, order } = sortColumn;
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
}

function comparisonCase(filters, data) {
  return filters.reduce((previousList, filter, index) => {
    const planetList = (index === 0) ? data : previousList;
    const obj = {
      bigger: planetList.filter((planet) => Number(planet[filter.column]) > filter.value),
      less: planetList.filter((planet) => Number(planet[filter.column]) < filter.value),
      equal: planetList.filter((planet) => planet[filter.column] === filter.value),
    };
    return obj[filter.comparison];
  }, []);
}

function filterNumericNumber(planetsData, numericFilters) {
  if (numericFilters.length !== 0) {
    return comparisonCase(numericFilters, planetsData);
  }
  return planetsData;
}

function filterPlanetsName(data, name) {
  if (name) {
    return data.filter((planet) => planet.name.toUpperCase().includes(name.toUpperCase()));
  }
  return data;
}

function createRows(planet) {
  return (
    <tr key={planet.name}>
      <td>{planet.name}</td>
      <td>{planet.population}</td>
      <td>{planet.orbital_period}</td>
      <td>{planet.diameter}</td>
      <td>{planet.climate}</td>
      <td>{planet.gravity}</td>
      <td>{planet.terrain}</td>
      <td>{planet.rotation_period}</td>
      <td>{planet.surface_water}</td>
      <td>{planet.films.map((film) => <div key={film}>{film}</div>)}</td>
      <td>{planet.created}</td>
      <td>{planet.edited}</td>
      <td>{planet.url}</td>
    </tr>
  );
}

function Table() {
  const {
    planetsData: { data, isFetching },
    numericFilters,
    nameFilter,
    fetchPlanets,
    sortColumn,
  } = useContext(PlanetsContext);
  const filteredPlanets = (data)
    ? filterNumericNumber(filterPlanetsName(data, nameFilter), numericFilters)
    : false;
  const sortedPlanets = changeColumnOrder(filteredPlanets, sortColumn);

  useEffect(() => {
    fetchPlanets();
  });

  return (
    <div className="table">
      {isFetching && <p>Loading...</p>}
      <p>Para ordenar basta clicar em cima do titulo da coluna desejada.</p>
      <table>
        <tbody>
          <TableHeader />
          {sortedPlanets && sortedPlanets.map((planet) => createRows(planet))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
