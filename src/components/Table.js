import React, { useContext } from 'react';
import Filter from './Filter';
import { StarWarsContext } from '../context/StarWarsContext';

function Table() {
  const { resultAPI, isFetching } = useContext(StarWarsContext);
  console.log('teste', resultAPI.results);
  // const capitalize = (word) => {
  //   const newWord = word.toLowerCase();
  //   return newWord && newWord[0].toUpperCase() + newWord.slice(1);
  // }

  const headColumns = () => {
    const textColumns = [
      'NOME',
      'POPULAÇÃO',
      'DURAÇÃO DA ORBITA',
      'DIÂMENTRO',
      'CLIMA',
      'GRAVIDADE',
      'SOLO',
      'DURAÇÃO DA ROTAÇÃO',
      'SUPERFÍCIE DE ÁGUA',
    ];
    return (
      <tr>
        {textColumns.map((textName) => (
          <th key={textName}>{textName}</th>
        ))}
      </tr>
    );
  };

  const bodyTableRow = (planets) => (
    <tr key={planets.name}>
      <td>{planets.name}</td>
      <td>{planets.population}</td>
      <td>{planets.orbital_period}</td>
      <td>{planets.diameter}</td>
      <td>{planets.climate}</td>
      <td>{planets.gravity}</td>
      <td>{planets.terrain}</td>
      <td>{planets.rotation_period}</td>
      <td>{planets.surface_water}</td>
    </tr>
  );
  const switchOfTable = (data, filters) => {
    let dataFinal = null;
    if (filters) {
      dataFinal = data.filter((planet) => planet.name.toUpperCase().includes(filters.toUpperCase()));
    } else {
      dataFinal = data;
    }

    return dataFinal.map((date) => bodyTableRow(date));
  };
  return (
    <>
      <h1>StarWars Datatable with Filters</h1>
      <div>{Filter}</div>
      <table>
        <thead>{headColumns()}</thead>
        <tbody>{isFetching && switchOfTable(resultAPI)}</tbody>
      </table>
    </>
  );
}
export default Table;
