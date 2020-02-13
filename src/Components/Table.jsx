import React, { useContext, useEffect } from 'react';
import StarWarsContext from '../Context/StarWarsContext';

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

const bodyTable = (data, filterText) => {
  return bodyOfTag(data).map((planet) => {
    if (planet[0].toLowerCase().includes(filterText)) {
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

const selectOfTag = (data, select) => {
  data.map((planets) => {
    return Object.entries(planets).map((value) => {
      return value.filter((tag) => {
        return tag === select;
      });
    });
  });
};

const generateTable = (data, filterText, select) => {
  return (
    <table>
      <thead>
        <tr>
          {headOfTag(data).map((tag) => {
            return (<th key={tag}>{tag}</th>);
          })}
        </tr>
      </thead>
      <tbody>
        {bodyTable(data, filterText)}
      </tbody>
    </table>
  );
};

const Table = () => {
  const { data, select, fetchStarWars, filterText, selectOfTag } = useContext(StarWarsContext);
  fetchStarWars();

  useEffect(() => {
    selectOfTag(data.planets, select);
  }, [select]);

  if (!data.sucess) {
    return <div>Loading...</div>;
  }

  return <div>{generateTable(data.planets, filterText, select)}</div>;
};

export default Table;
