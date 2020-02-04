/* eslint-disable react/destructuring-assignment */
import React from 'react';
import storeContext from '../context';

class ValuesInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      column: '',
      comparison: '',
      value: '',
    };
  }

  arrayOfColumns() {
    const {
      valuesFilter: { filters },
    } = this.context;
    const completeColumns = [
      '',
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ];
    if (filters.length > 0) {
      const arrayOfUsedColumns = filters.map((filter) => filter.column);
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

  updateStore(state) {
    const { column, comparison, value } = state;
    const numericValues = { column, comparison, value };
    const filters = [...this.context.valuesFilter.filters, state];
    if (column === '' || comparison === '' || value === '') {
      return alert('dados não preenchidos');
    }
    this.setState({ column: '', comparison: '', value: '' });
    return this.context.setValuesFilter({ numericValues, filters });
  }

  changeState(event, id) {
    this.setState({
      [id]: event.target.value,
    });
  }

  generateValuesInput() {
    return (
      <div>
        <label htmlFor="column">
          <select onChange={(e) => this.changeState(e, 'column')} data-testid="column" id="column">
            {this.generateColumnOptions()}
          </select>
        </label>
        <select
          onChange={(e) => this.changeState(e, 'comparison')}
          data-testid="comparison"
          id="comparison"
        >
          <option value="" />
          <option value="Maior">Maior que</option>
          <option value="Menor">Menor que</option>
          <option value="Igual">Igual</option>
        </select>
        <input
          onChange={(e) => this.changeState(e, 'value')}
          data-testid="comparisonValue"
          id="comparisonValue"
          type="number"
          placeholder="Valor"
        />
        <button type="button" onClick={() => this.updateStore(this.state)}>
          Adicionar filtro
        </button>
      </div>
    );
  }

  render() {
    if (this.context.valuesFilter.filters.length === 5) {
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
