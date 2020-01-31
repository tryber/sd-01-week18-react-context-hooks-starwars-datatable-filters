/* eslint-disable react/destructuring-assignment */
import React from 'react';
import storeContext from '../context';

class Filters extends React.Component {
  static findComparisons(valueFilter, data) {
    const { column, comparison, value } = valueFilter;
    switch (comparison) {
      case 'Maior':
        return data.filter(
          (planet) => planet[column] > Number(value) && planet[column] !== 'unknown',
        );
      case 'Menor':
        return data.filter(
          (planet) => planet[column] < Number(value) && planet[column] !== 'unknown',
        );
      case 'Igual':
        return data.filter((planet) => planet[column] === value && planet[column] !== 'unknown');
      default:
        return false;
    }
  }

  static filterByValues(data, valueFilter) {
    if (valueFilter) {
      const result = Filters.findComparisons(valueFilter, data);
      return result;
    }
    return data;
  }

  filterByName(data, valueFilter) {
    const { nameFilter } = this.context;
    if (nameFilter) {
      return Filters.filterByValues(
        data.filter((planet) => planet.name.includes(nameFilter)),
        valueFilter,
      );
    }
    return Filters.filterByValues(data, valueFilter);
  }

  removeFilter(filter) {
    const actualFilter = this.context.valuesFilter.columns;
    const newFilters = actualFilter.filter((filt) => filt.column !== filter.column);
    this.context.setFinalFilter(newFilters);
    this.showFilters(this.context.initialData.data.results, newFilters);
  }

  showFilters(data, filtersActive) {
    if (filtersActive.length > 0) {
      const finalData = filtersActive.reduce((acc, filter, index) => {
        const array = index === 0 ? data : acc;
        return this.filterByName(array, filter);
      }, []);
      this.context.setFinalFilter(finalData);
      return filtersActive.map((filter) => (
        <div>
          <p key={filter.column}>{`${filter.column} - ${filter.comparison} - ${filter.value}`}</p>
          <button type="button" onClick={() => this.removeFilter(filter)}>
            X
          </button>
        </div>
      ));
    }
    this.context.setFinalFilter(this.filterByName(data));
    return 'no filter';
  }

  render() {
    return (
      <div>
        <p>Filters active:</p>
        <div>
          {this.showFilters(
            this.context.initialData.data.results,
            this.context.valuesFilter.columns,
          )}
        </div>
      </div>
    );
  }
}

Filters.contextType = storeContext;
export default Filters;
