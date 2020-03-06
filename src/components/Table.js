import React, { useContext } from 'react';

import context from '../store/context';
import FilterName from './FilterName';
import ButtonSort from './ButtonSort';

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

const tableStarWars = (data) => {
  if (!data) return <div>Loading...</div>;
  return (
    <tbody>
      {data.map((planets) => (
        <tr key={`Planeta: ${planets.name}`}>
          <td data-testid="planets-name" key={planets.name}>{planets.name}</td>
          <td key={planets.rotation_period}>{planets.rotation_period}</td>
          <td
            data-testid="orbital-period"
            key={planets.orbital_period}
          >
            {planets.orbital_period}
          </td>
          <td key={planets.diameter}>{planets.diameter}</td>
          <td key={planets.climate}>{planets.climate}</td>
          <td key={planets.gravity}>{planets.gravity}</td>
          <td key={planets.terrain}>{planets.terrain}</td>
          <td data-testid="surface-water" key={planets.surface_water}>{planets.surface_water}</td>
          <td data-testid="population" key={planets.population}>{planets.population}</td>
          <td key={planets.films}>{planets.films.map((films) => <p key={films}>{films}</p>)}</td>
          <td key={planets.created}>{planets.created}</td>
          <td key={planets.edited}>{planets.edited}</td>
          <td key={planets.url}>{planets.url}</td>
        </tr>
      ))}
    </tbody>
  );
};

const filterPlanetByName = (data, textInput) => {
  if (textInput) {
    return data.filter(({ name }) => name.toLowerCase().includes(textInput.toLowerCase()));
  }
  return data;
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

const filterNumericNumber = (planetsData, filters) => {
  if (filters.length !== 0) {
    return comparisonCase(filters, planetsData);
  }
  return planetsData;
};

const Table = () => {
  const {
    data,
    sortColumns: { column, order },
    filters,
    filterName,
  } = useContext(context);
  const planetsFiltered = filterName ? filterPlanetByName(data, filterName) : data;
  if (!data) return <div>Loading...</div>;
  const filterNumber = filterNumericNumber(planetsFiltered, filters);
  const sortedPlanets = changeColumnOrder(filterNumber, column, order);
  return (
    <section>
      <FilterName />
      <table>
        <ButtonSort />
        {data && tableStarWars(sortedPlanets)}
      </table>
    </section>
  );
};

export default Table;
