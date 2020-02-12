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

function Table() {
  const {
    resultAPI, starWarsAPI, filter, comparition,
  } = useContext(StarWarsContext);
  const date = resultAPI.data.results;
  console.log(date);

  useEffect(() => {
    starWarsAPI();
  }, []);

  if (resultAPI.isFetching) {
    return <h1>LOADING...</h1>;
  }

  if (filter) {
    const dateFilter = date.filter((planet) => planet.name.toUpperCase().includes(filter.toUpperCase()));
    return creatorOfaTable(textColumns, dateFilter);
  }

  return creatorOfaTable(textColumns, date);
}

export default Table;
