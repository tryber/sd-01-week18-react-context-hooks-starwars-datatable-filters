import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import context from '../store/context';
import FilterName from './FilterName';
import ButtonSort from './ButtonSort';

const Table = () => {
  const { data, filters: { name, column, order }, setFilters } = useContext(context);

  // const comparisonCase = (filters, data) => {
  //   return filters.reduce((previousList, filter, index) => {
  //     const planetList = (index === 0) ? data : previousList;
  //     const obj = {
  //       bigger: planetList.filter((planet) => Number(planet[filter.column]) > filter.value),
  //       less: planetList.filter((planet) => Number(planet[filter.column]) < filter.value),
  //       equal: planetList.filter((planet) => planet[filter.column] === filter.value),
  //     };
  //     return obj[filter.comparison];
  //   }, []);
  // };

  const tableStarWars = (data) => {
    if (!data) return <div>Loading...</div>;
    return (
      <tbody>
        {data.map((planets) => (
          <tr key={`Planeta: ${planets.name}`}>
            <td key={planets.name}>{planets.name}</td>
            <td key={planets.rotation_period}>{planets.rotation_period}</td>
            <td key={planets.orbital_period}>{planets.orbital_period}</td>
            <td key={planets.diameter}>{planets.diameter}</td>
            <td key={planets.climate}>{planets.climate}</td>
            <td key={planets.gravity}>{planets.gravity}</td>
            <td key={planets.terrain}>{planets.terrain}</td>
            <td key={planets.surface_water}>{planets.surface_water}</td>
            <td key={planets.population}>{planets.population}</td>
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
      return data.filter(({ name: planetName }) => planetName.toLowerCase().includes(textInput.toLowerCase()));
    }
    return data;
  };

  const sortAscending = (planetsData, isNumeric, column) => {
    // const { filters: { column } } = useContext(context);
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
  };

  const sortDescending = (planetsData, isNumeric, column) => {
    // const { filters: { column } } = useContext(context);
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
  };

  const changeColumnOrder = (planetsData, column, order) => {
    // const { filters: { column, order } } = useContext(context);
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

  // const filterNumericNumber = (planetsData) => {
  //   // const { numeric_values } = this.props;
  //   if (numeric_values.length !== 0) {
  //     return comparisonCase(numeric_values, planetsData);
  //   }
  //   return planetsData;
  // };


  const planetsFiltered = name ? filterPlanetByName(data, name) : data;
  // const filterNumber = filterNumericNumber(planetsFiltered);
  // const sortedPlanets = changeColumnOrder(filterNumber);
  if (!data) return <div>Loading...</div>;
  const sortedPlanets = changeColumnOrder(planetsFiltered, column, order);
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

// const mapStateToProps = ({
//   data: { data },
//   filters: { name, numeric_values },
//   sort: { sortTable },
// }) => ({
//   data,
//   name,
//   sortTable,
//   numeric_values,
// });

// Table.propTypes = {
//   data: PropTypes.arrayOf(PropTypes.shape({
//     name: PropTypes.string.isRequired,
//   })),
//   name: PropTypes.string,
//   numeric_values: PropTypes.arrayOf(PropTypes.shape({})),
//   sortTable: PropTypes.shape({
//     column: PropTypes.string.isRequired,
//     order: PropTypes.string.isRequired,
//   }).isRequired,
// };

// Table.defaultProps = {
//   data: [],
//   name: '',
//   numeric_values: [],
// };

export default Table;
