import React, { useContext, useEffect } from 'react';
import Filter from './Filter';
import '../css/Table.css';
import { textColumns } from '../service/Comparisons';
import { StarWarsContext } from '../context/StarWarsContext';
import FiltersDropDown from './FiltersDropDown';

// const textColumns = [
//   'NOME',
//   'POPULAÇÃO',
//   'DURAÇÃO DA ORBITA',
//   'DIÂMENTRO',
//   'CLIMA',
//   'GRAVIDADE',
//   'SOLO',
//   'DURAÇÃO DA ROTAÇÃO',
//   'SUPERFÍCIE DE ÁGUA',
//   'FILMES',
//   'CRIADO',
//   'EDITADO',
//   'URL',
// ];

const bodyTableRow = (planet) => (
  <tr key={planet.name}>
    <td>{`${planet.name}`}</td>
    <td>{`${planet.population}`}</td>
    <td>{`${planet.orbital_period} Hours`}</td>
    <td>{`${planet.diameter} KM`}</td>
    <td>{`${planet.climate}`}</td>
    <td>{`${planet.gravity}`}</td>
    <td>{`${planet.terrain}`}</td>
    <td>{`${planet.rotation_period} Hours`}</td>
    <td>{`${planet.surface_water} %`}</td>
    <td>
      {planet.films.map((film) => (
        <div key={film}>{film}</div>
      ))}
    </td>
    <td>{`${planet.created}`}</td>
    <td>{`${planet.edited} %`}</td>
    <td>{`${planet.url} %`}</td>
  </tr>
);

const headColumns = (textColumns) => (
  <tr>
    {textColumns.map((textName) => (
      <th key={textName}>{textName}</th>
    ))}
  </tr>
);

const creatorOfaTable = (listTh, data) => (
  <div className="table">
    <h1>Tabela de dados StarWars com filtros</h1>
    <Filter />
    <FiltersDropDown />
    <table>
      <thead>{headColumns(listTh)}</thead>
      <tbody>{data.map((planets) => bodyTableRow(planets))}</tbody>
    </table>
  </div>
);

const switchOfComparition = (data, filter) => {
  const { column, comparison, value } = filter;

  switch (comparison) {
    case 'bigger than':
      return data.filter(
        (planet) => planet[column] > Number(value) && planet[column] !== 'unknown',
      );
    case 'less than':
      return data.filter(
        (planet) => planet[column] < Number(value) && planet[column] !== 'unknown',
      );
    case 'equal to':
      return data.filter((planet) => planet[column] === value && planet[column] !== 'unknown');
    default:
      return data;
  }
};

function Table() {
  const {
    resultAPI, starWarsAPI, filterName, comparition,
  } = useContext(StarWarsContext);

  console.log(comparition.column);

  const dataResults = resultAPI.data.results;

  useEffect(() => {
    starWarsAPI();
  }, []);

  if (resultAPI.isFetching) {
    return <h1>LOADING...</h1>;
  }

  if (filterName) {
    const dateFilter = dataResults.filter((planet) => planet.name.toUpperCase().includes(filterName.toUpperCase()));
    return creatorOfaTable(textColumns, dateFilter);
  }
  if (comparition.isFilter && comparition) {
    const dataComparition = switchOfComparition(dataResults, comparition);

    return creatorOfaTable(textColumns, dataComparition);
  }

  return creatorOfaTable(textColumns, dataResults);
}

export default Table;
