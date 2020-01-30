import React, { useContext } from 'react';
// import Filter from './Filter';
import { StarWarsContext } from '../context/StarWarsContext';

function Table() {
  const { resultAPI } = useContext(StarWarsContext)
  // const capitalize = (word) => {
  //   const newWord = word.toLowerCase();
  //   return newWord && newWord[0].toUpperCase() + newWord.slice(1);
  // }

  // const switchOfTable = (data, filters) => {
  //   let dataFinal = null;
  //   switch (filters) {
  //     case filters !== '':

  //       dataFinal = data.filter((planet) => planet.name.toUpperCase().includes(filters.toUpperCase()));
  //       break;
  //     default:
  //       dataFinal = data;
  //       break;
  //   }
  //   return dataFinal.map((data) => bodyTableRow(data));
  // };

  // if (filters) {
  //   dataFinal = data.filter((planet) => planet.name.toUpperCase().includes(filters.toUpperCase()));
  // } else {
  //   dataFinal = data
  // }

  // return dataFinal.map((data) => this.bodyTableRow(data));

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
  return (
    <>
      <h1>StarWars Datatable with Filters</h1>
      <table>
        <thead>{headColumns()}</thead>
        <tbody>{resultAPI && bodyTableRow(resultAPI)}</tbody>
      </table>
    </>
  );
}
export default Table;
