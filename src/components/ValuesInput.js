/* eslint-disable react/destructuring-assignment */
import React from 'react';
import storeContext from '../context';

class ValuesInput extends React.Component {
  constructor(props) {
    super(props);
    this.updateStore = this.updateStore.bind(this);
  }

  arrayOfColumns() {
    const {
      valuesFilter: { columns },
    } = this.context;
    const completeColumns = [
      '',
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ];
    if (columns.length > 0) {
      const arrayOfUsedColumns = columns.map((column) => column.column);
      const arrayOfColumnsToUse = completeColumns.filter(
        (column) => !arrayOfUsedColumns.includes(column),
      );
      return arrayOfColumnsToUse;
    }
    return completeColumns;
  }

  generateColumnOptions() {
    return this.arrayOfColumns().map((each) => (
      <option key={each} value={each}>
        {each}
      </option>
    ));
  }

  updateStore() {
    const { column, comparison, value } = this.context;
    const numericValues = {
      column,
      comparison,
      value,
    };
    const formatFilter = { column, comparison, value };
    const columns = [...this.context.valuesFilter.columns, formatFilter];
    if (column === '' || comparison === '' || value === '') {
      return alert('dados não preenchidos');
    }
    this.context.setColumn({ column: '' });
    return this.context.setValuesFilter({ numericValues, columns });
  }

  changeState(event, id) {
    this.context[`set${id}`](event.target.value);
  }

  generateValuesInput() {
    return (
      <div>
        <label htmlFor="column">
          <select onChange={(e) => this.changeState(e, 'Column')} data-testid="column" id="column">
            {this.generateColumnOptions()}
          </select>
        </label>
        <select
          onChange={(e) => this.changeState(e, 'Comparison')}
          data-testid="comparison"
          id="comparison"
        >
          <option value="Maior">Maior que</option>
          <option value="Menor">Menor que</option>
          <option value="Igual">Igual</option>
        </select>
        <input
          onChange={(e) => this.changeState(e, 'Value')}
          data-testid="comparisonValue"
          id="comparisonValue"
          type="number"
          placeholder="Valor"
        />
        <button onClick={this.updateStore}>Adicionar filtro</button>
      </div>
    );
  }

  render() {
    if (this.context.valuesFilter.columns.length === 5) {
      return 'All filters are being used';
    }
    return (
      <div>
        Choose the column to filter:
        <div>{this.generateValuesInput()}</div>
      </div>
    );
  }
}

ValuesInput.contextType = storeContext;

export default ValuesInput;
