import React, { useContext } from 'react';
import StarWarsContext from '../Context/StarWarsContext';
import '../Style/Table.css';

const headOfTag = (
  data,
) => data.map(
  (planets) => Object.keys(planets).filter(
    (tag) => tag !== 'residents',
  ),
)[0];


const bodyOfTag = (
  data,
) => data.map(
  (planets) => Object.values(planets).filter(
    (value, index) => index !== 9,
  ),
);


const isStringASC = (a, b) => {
  if (a > b) return 1;
  return -1;
};

// const isNumericASC = (a, b) => {
//   if (a === 'unknown') return 1;
//   if (b === 'unknown') return -1;
//   if (Number(a) > Number(b)) return 1;
//   if (Number(b) > Number(a)) return -1;
// };

const isUndefinedASC = (a, b, isNumeric) => {
  switch (isNumeric) {
    case a === 'unknown':
      return 1;
    case b === 'unknown':
      return -1;
    default:
      break;
  } if (Number(a) > Number(b)) return 1;
  return -1;
};
const changeOrderASC = (
  orderColumn, planet, isNumeric,
) => planet.sort((w, y) => {
  const a = w[orderColumn.column];
  const b = y[orderColumn.column];
  if (!isNumeric) {
    return isStringASC(a, b);
  } return isUndefinedASC(a, b, isNumeric);
});

const isStringDESC = (a, b) => {
  if (a > b) return -1;
  return 1;
};


const isUndefinedDESC = (a, b, isNumeric) => {
  switch (isNumeric) {
    case a === 'unknown':
      return -1;
    case b === 'unknown':
      return 1;
    default:
      break;
  } if (Number(a) > Number(b)) return -1;
  return 1;
};

const changeOrderDESC = (
  orderColumn, planet, isNumeric,
) => planet.sort((x, z) => {
  const a = x[orderColumn.column];
  const b = z[orderColumn.column];
  if (!isNumeric) {
    return isStringDESC(a, b);
  } return isUndefinedDESC(a, b, isNumeric);
});


const changeOrder = (orderColumn, planet) => {
  const numericColumns = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];
  const isNumeric = numericColumns.includes(orderColumn.column);
  if (orderColumn.order === 'ASC') return changeOrderASC(orderColumn, planet, isNumeric);
  return changeOrderDESC(orderColumn, planet, isNumeric);
};

const bodyTable = (data, filterText) => bodyOfTag(data).map((planet) => {
  (planet[0].includes(filterText));
  return (
    <tr key={planet[0]}>
      {planet.map((tag) => (
        <td key={tag}>{tag}</td>
      ))}
    </tr>
  );
});

const generateTable = (data, filterText, setOrderColumn, orderColumn) => {
  console.log('generateTable', data);
  if (orderColumn.column !== '') {
    changeOrder(orderColumn, data);
  } return (
    <div>
      <h2 className="content-title">Tabela Starwars</h2>
      <table>
        <thead>
          <tr>
            {headOfTag(data).map(
              (tag) => (
                <th key={tag}>
                  {tag}
                  <select
                    onChange={(e) => setOrderColumn({ column: tag, order: e.target.value })}
                    key={tag}
                  >
                    <option value="">ESCOLHA UMA OPÇÂO</option>
                    <option value="ASC">ASC</option>
                    <option value="DESC">DESC</option>
                  </select>
                </th>
              ),
            )}
          </tr>
        </thead>
        <tbody>{bodyTable(data, filterText)}</tbody>
      </table>
    </div>
  );
};

const Table = () => {
  const
    {
      data,
      fetchStarWars,
      filterText,
      newData,
      orderColumn,
      setOrderColumn,
    } = useContext(
      StarWarsContext,
    );
  fetchStarWars();
  if (!data.sucess) {
    return <div>Loading...</div>;
  }
  if (newData) {
    if (newData.length === 0) {
      return <h1>nenhum planeta encontrado</h1>;
    }
    return <div>{generateTable(newData, filterText, setOrderColumn, orderColumn)}</div>;
  }
  return <div>{generateTable(data.planets, filterText, setOrderColumn, orderColumn)}</div>;
};

export default Table;
