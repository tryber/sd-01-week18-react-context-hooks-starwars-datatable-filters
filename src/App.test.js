import React from 'react';
import { render, waitForDomChange, fireEvent, cleanup } from '@testing-library/react';
import App from './App';

const selectColumns = ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
const selectComparisons = ['Maior que', 'Menor que', 'Igual a'];
const titlesColumns = [
  'name', 'rotation_period',
  'orbital_period', 'diameter',
  'climate', 'gravity',
  'terrain', 'surface_water',
  'population', 'films',
  'created', 'edited',
  'url',
];
const planetsName = ['Alderaan', 'Bespin', 'Coruscant', 'Dagobah', 'Endor', 'Geonosis',
  'Hoth', 'Kamino', 'Naboo', 'Yavin IV',
];

describe('render filters inputs', () => {
  afterEach(cleanup);
  test('render filters table', () => {
    const { getByPlaceholderText } = render(<App />);
    const nameFilterInput = getByPlaceholderText(/Pesquise aqui/i);
    const valueFilterInput = getByPlaceholderText(/Coloque a quantidade aqui/i);
    const comparisonFilterInput = valueFilterInput.previousSibling;
    const selectFilterInput = comparisonFilterInput.previousSibling;
    expect(nameFilterInput).toBeInTheDocument();
    expect(selectFilterInput).toBeInTheDocument();
    expect(comparisonFilterInput).toBeInTheDocument();
    expect(valueFilterInput).toBeInTheDocument();
  });
});

describe('filter name', () => {
  afterEach(cleanup);
  test('test elements before dom change', () => {
    const { getByText, queryByPlaceholderText, getByLabelText} = render(<App />);
    selectColumns.forEach((column) => {
      expect(getByText(`${column}`)).toBeInTheDocument();
      expect(getByText(`${column}`).tagName).toBe('OPTION');
    });
    selectComparisons.forEach((comparison) => {
      expect(getByLabelText(`${comparison}`)).toBeInTheDocument();
      expect(getByLabelText(`${comparison}`).tagName).toBe('INPUT');
    });
    expect(getByText(/Loading.../i)).toBeInTheDocument();

    const inputNumber = queryByPlaceholderText(/Coloque a quantidade aqui/i);
    expect(inputNumber).toBeInTheDocument();
    expect(getByText(/orbital_period/i).tagName).toBe('OPTION');
  });

  test('filter the name with the input', async () => {
    afterEach(cleanup);
    const {
      getByText,
      queryByPlaceholderText,
      queryByText,
      queryByTestId,
      queryAllByTestId,
    } = render(<App />);
    await waitForDomChange();
    titlesColumns.forEach((title) => {
      console.log('title', title);

      expect(getByText(`${title}`)).toBe(2);
      expect(getByText(`${title}`).tagName).toBe('TH');
    });
    planetsName.forEach((name) => {
      expect(getByText(`${name}`)).toBeInTheDocument();
      expect(getByText(`${name}`).tagName).toBe('TD');
    });
  });
});
