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

const changeOrder = (orderColumn, planet) => {
  const asc = 'ASC';
  if (orderColumn.order === asc) {
    return planet.sort(function compareASC(y, w) {
      const a = y[orderColumn.column];
      const b = w[orderColumn.column];
      if (a === 'unknown') return 1;
      if (b === 'unknown') return -1;
      if (Number(a) > Number(b)) {
        console.log('a>', a);
        console.log('b>', b);
        return 1;
      }
      if (Number(b) > Number(a)) {
        return -1;
      }
    });
  }
  return planet.sort(function compareDESC(x, z) {
    const a = x[orderColumn.column].toUpperCase();
    const b = z[orderColumn.column].toUpperCase();
    if (a === 'unknown') return -1;
    if (b === 'unknown') return 1;
    if (Number(a) > Number(b)) {
      return -1;
    }
    if (Number(b) > Number(a)) {
      return 1;
    }
  });
};

const bodyTable = (data, filterText) => {
  return bodyOfTag(data).map((planet) => {
    if (planet[0].includes(filterText)) {
      return (
        <tr key={planet[0]}>
          {planet.map((tag) => (
            <td key={tag}>{tag}</td>
          ))}
        </tr>
      );
    }
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
                <select onChange={(e) => setOrderColumn({ column: tag, order: e.target.value })} key={tag}>
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
