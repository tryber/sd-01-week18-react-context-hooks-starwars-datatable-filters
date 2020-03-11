import React from 'react';

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

const changeForN = (isNumber) => (+isNumber ? parseInt(isNumber, 10) : isNumber);

const isTrue = (data, key) => {
  data.sort((a, b) => {
    if (changeForN(a[key]) > changeForN(b[key])) return 1;
    if (changeForN(b[key]) > changeForN(a[key])) return -1;
    return 0;
  });
  return data;
};

function sortAsc(data, key, isUnder) {
  let results;
  if (isUnder) {
    results = isTrue(data, key);
  }
  return results;
}

const isFalse = (data, key) => {
  data.sort((a, b) => {
    if (changeForN(a[key]) < changeForN(b[key])) return 1;
    if (changeForN(b[key]) < changeForN(a[key])) return -1;
    return 0;
  });
  return data;
};

function sortDesc(data, key, isUnder) {
  let results;
  if (isUnder) {
    results = isFalse(data, key);
  }
  return results;
}

const ascOrDescAlphabeticalOrder = (planets, condition, key, isTrust) => {
  switch (condition) {
    case 'ASC':
      return sortAsc(planets, key, isTrust);
    default:
      return sortDesc(planets, key, isTrust);
  }
};


export const selectIsTrueOrFalse = (filters, values) => {
  if (filters.find((filterObj) => filterObj.numeric_values.column === values)) return false;
  return true;
};

export const chooseBiggest = (planets, fcolumn, value) => planets.filter((data) => parseInt(data[fcolumn], 10) > value);

export const chooseSmallest = (planets, fcolumn, value) => planets.filter((data) => parseInt(data[fcolumn], 10) < value);

export const chooseEqual = (planets, fcolumn, value) => planets.filter((data) => data[fcolumn] === value);

export const comparisonCase = (filters, data) => filters.reduce((previous, filter, index) => {
  const {
    numeric_values: { column, value, comparison },
  } = filter;
  const dataComparison = index === 0 ? data : previous;
  switch (comparison) {
    case 'bigger':
      return chooseBiggest(dataComparison, column, value);
    case 'less':
      return chooseSmallest(dataComparison, column, value);
    case 'equal':
      return chooseEqual(dataComparison, column, value);
    default:
      return [];
  }
}, []);


export const filterForName = (data, textInput) => {
  if (textInput) {
    return data.filter(({ name }) => name.toLowerCase().includes(textInput.toLowerCase()));
  }
  return data;
};

export const filterForNumber = (planetsData, filters) => {
  if (filters.length !== 0) {
    return comparisonCase(filters, planetsData);
  }
  return planetsData;
};

const headColumns = (textColumns) => (
  <tr>
    {textColumns.map((textName) => (
      <th key={textName}>{textName}</th>
    ))}
  </tr>
);


export const tablePrincipal = (data) =>

  (
    <table>
      <thead>{headColumns(textColumns)}</thead>
      <tbody>
        {data.map((planet) => (
          <tr key={`Planeta: ${planet.name}`}>
            <td>{planet.name}</td>
            <td>{planet.population}</td>
            <td>{planet.orbital_period}</td>
            <td>{planet.diameter}</td>
            <td>{planet.climate}</td>
            <td>{planet.gravity}</td>
            <td>{planet.terrain}</td>
            <td>{planet.rotation_period}</td>
            <td>{planet.surface_water}</td>
            <td>
              {planet.films.map((films) => (
                <p key={films}>{films}</p>
              ))}
            </td>
            <td>{planet.created}</td>
            <td>{planet.edited}</td>
            <td>{planet.url}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

export const removePlanetFilters = (filterObj, setFilters, filters) => {
  const newFilters = filters.filter((filter) => filter.numeric_values.column !== filterObj.column);
  return setFilters(newFilters);
};

export const createFilter = (filterObj, setFilters, filters) => (
  <p key={filterObj.column}>
    {`${filterObj.column} | ${filterObj.comparison} | ${filterObj.value}`}
    <button
      data-testid="exclude-filter"
      type="button"
      onClick={() => removePlanetFilters(filterObj, setFilters, filters)}
    >
      X
    </button>
  </p>
);

export const showActiveFilters = (filters, setFilters) => filters.map((filter) => createFilter(filter.numeric_values, setFilters, filters));
