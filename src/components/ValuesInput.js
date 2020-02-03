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
    const { valuesFilter } = this.context;
    const completeColumns = [
      '',
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ];
    if (valuesFilter.length > 0) {
      const arrayOfUsedColumns = valuesFilter.map((column) => column.column);
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
    const numericValues = {
      column,
      comparison,
      value,
    };
    const formatFilter = { column, comparison, value };
    const columns = [...this.context.valuesFilter, formatFilter];
    if (column === '' || comparison === '' || value === '') {
      return alert('dados não preenchidos');
    }
    this.setState({ column: '' });
    return this.context.setValuesFilter({ numericValues, columns });
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
        <button onClick={() => this.updateStore(this.state)}>Adicionar filtro</button>
      </div>
    );
  }

  render() {
    if (this.context.valuesFilter === 5) {
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
