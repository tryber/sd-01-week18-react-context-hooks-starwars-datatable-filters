import React from 'react';
import storeContext from '../context';
import './table.css';

class Table extends React.Component {
  static arrayOfTags(data) {
    return Object.entries(data[0])
      .map((tag) => tag[0])
      .filter((name) => name !== 'residents');
  }

  static generateTableHead(data) {
    const tags = Table.arrayOfTags(data);
    if (data.length > 0) {
      return (
        <table>
          <thead>
            <tr>
              {tags.map((tag) => (
                <th key={`${tag}1`}>{tag}</th>
              ))}
            </tr>
          </thead>
          <tbody>{Table.generateTableBody(data, tags)}</tbody>
        </table>
      );
    }
    return <p>Planeta não encontrado</p>;
  }

  static generateTableBody(data, arrayOfTags) {
    return data.map((planet) => (
      <tr key={planet.diameter}>
        {arrayOfTags.map((tag) => (
          <td key={tag}>{planet[tag]}</td>
        ))}
      </tr>
    ));
  }

  componentDidMount() {
    this.context.starWarsAPI();
  }

  render() {
    if (this.context.initialData.isFetching) {
      return <p>LOADING...</p>;
    }
    if (this.context.initialData.sucess) {
      if (this.context.filteredData) {
        return Table.generateTableHead(this.context.filteredData);
      }
      return Table.generateTableHead(this.context.initialData.data.results);
    }
    return <div>ERROR</div>;
  }
}

Table.contextType = storeContext;
export default Table;
