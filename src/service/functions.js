import React from 'react'

export const textColumns = [
  'NOME',
  'POPULAÇÃO',
  'DURAÇÃO DA ORBITA',
  'DIÂMENTRO',
  'CLIMA',
  'GRAVIDADE',
  'SOLO',
  'DURAÇÃO DA ROTAÇÃO',
  'SUPERFÍCIE DE ÁGUA',
  'FILMES',
  'CRIADO',
  'EDITADO',
  'URL',
];

export const selectOfOrder = [
  'rotation_period',
  'orbital_period',
  'diameter',
  'climate',
  'gravity',
  'terrain',
  'surface_water',
  'population',
  'films',
  'edited',
  'url',
];

export const columns = [
  'Faça Sua Escolha',
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

export const selectIsTrueOrFalse = (filters, valueis) => {
  if (filters.numeric_values.find((filterObj) => filterObj.column === valueis)) return false;
  return true;
};

export const handleColumn = (event, set) => {
  set({ column: event.target.value });
};

export const handleComparison = (event, set) => {
  set({ comparison: event.target.value });
};

export const handleInput = (event,set) => {
  set({ value: event.target.value });
};

export const bodyTableRow = (planet) => (
  <tr key={planet.name}>
    <td>{planet.name}</td>
    <td>{planet.population}</td>
    <td>{planet.orbital_period}</td>
    <td>{planet.diameter}</td>
    <td>{planet.climate}</td>
    <td>{planet.gravity}</td>
    <td>{planet.terrain}</td>
    <td>{planet.rotation_period} </td>
    <td>{planet.surface_water}</td>
    <td>
      {planet.films.map((film) => (
        <div key={film}>{film}</div>
      ))}
    </td>
    <td>{planet.created}</td>
    <td>{planet.edited} </td>
    <td>{planet.url} </td>
  </tr>
);

export const headColumns = (textColumns) => (
  <tr>
    {textColumns.map((textName) => (
      <th key={textName}>{textName}</th>
    ))}
  </tr>
);

export const creatorOfaTable = (listTh, data, filterN, filterS) => (
  <div className="table">
    <h1>Tabela de dados StarWars com filtros</h1>
    {filterN}
    {filterS}
    <table>
      <thead>{headColumns(listTh)}</thead>
      <tbody>{data.map((planets) => bodyTableRow(planets))}</tbody>
    </table>
  </div>
);

export const chooseBiggest = (planets, filterOfForm) => planets.filter((data) => parseInt(data[filterOfForm.column], 10) > filterOfForm.value);

export const chooseSmallest = (planets, filterOfForm) => planets.filter((data) => parseInt(data[filterOfForm.column], 10) < filterOfForm.value);

export const chooseEqual = (planets, filterOfForm) => planets.filter((data) => data[filterOfForm.column] === filterOfForm.value);

export const comparisonCase = (filters, data) => filters.reduce((previous, filter, index) => {
  const dataComparison = index === 0 ? data : previous;
  switch (filter.comparison) {
    case 'bigger':
      return chooseBiggest(dataComparison, filter);
    case 'less':
      return chooseSmallest(dataComparison, filter);
    case 'equal':
      return chooseEqual(dataComparison, filter);
    default:
      return [];
  }
}, []);
