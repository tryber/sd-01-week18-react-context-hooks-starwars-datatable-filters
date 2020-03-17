import React, { useContext } from 'react';
import StarWarsContext from '../Context/StarWarsContext';
import '../Style/Table.css';

const headOfTag = (data) => {
  return data.map((planets) => {
    return Object.keys(planets).filter((tag) => {
      return tag !== 'residents';
    });
  })[0];
};

const bodyOfTag = (data) => {
  return data.map((planets) => {
    return Object.values(planets).filter((value, index) => {
      return index !== 9;
    });
  });
};

const isStringASC = (a, b) => {
  if (a > b) return 1;
  return -1;
};

const isNumericASC = (a, b) => {
  if (a === 'unknown') return 1;
  if (b === 'unknown') return -1;
  if (Number(a) > Number(b)) return 1;
  if (Number(b) > Number(a)) return -1;
};

const changeOrderASC = (orderColumn, planet, isNumeric) => {
  return planet.sort(function compareASC(w, y) {
    const a = w[orderColumn.column];
    const b = y[orderColumn.column];
    if (!isNumeric) {
      return isStringASC(a, b);
    } return isNumericASC(a, b);
  });
};
const isStringDESC = (a, b) => {
  if (a > b) return -1;
  return 1;
};

const isNumericDESC = (a, b) => {
  if (a === 'unknown') return -1;
  if (b === 'unknown') return 1;
  if (Number(a) > Number(b)) return -1;
  if (Number(b) > Number(a)) return 1;
};

const changeOrderDESC = (orderColumn, planet, isNumeric) => {
  return planet.sort(function compareDESC(x, z) {
    const a = x[orderColumn.column];
    const b = z[orderColumn.column];
    if (!isNumeric) {
      return isStringDESC(a, b);
    } return isNumericDESC(a, b);
  });
};

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

const bodyTable = (data, filterText) => {
  return bodyOfTag(data).map((planet) => {
    (planet[0].includes(filterText));
    return (
      <tr key={planet[0]}>
        {planet.map((tag) => (
          <td key={tag}>{tag}</td>
        ))}
      </tr>
    );
  });
};

const generateTable = (data, filterText, setOrderColumn, orderColumn) => {
  console.log('generateTable', data);
  if (orderColumn.column !== '') {
    changeOrder(orderColumn, data);
  } return (
    <table>
      <thead>
        <tr>
          {headOfTag(data).map((tag) => {
            return (
              <th key={tag}>
                {tag}
                <select
                  onChange={(e) => setOrderColumn({ column: tag, order: e.target.value })}
                  key={tag}
                >
                  <option value="">{`option ${tag}`}</option>
                  <option value="ASC">ASC</option>
                  <option value="DESC">DESC</option>
                </select>
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>{bodyTable(data, filterText)}</tbody>
    </table>
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
