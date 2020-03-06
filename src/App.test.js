import React from 'react';
import {
  render,
  waitForDomChange,
  // fireEvent,
  cleanup,
} from '@testing-library/react';
import App from './App';
import Provider from './store/Provider';

const selectColumns = ['População', 'Duração Orbital', 'Diâmetro', 'Duração da Rotação', 'Superfície da Água'];
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

describe('filter name', () => {
  afterEach(cleanup);

  test('test elements before dom change', async () => {
    afterEach(cleanup);
    const { getByText } = render(<Provider><App /></Provider>);
    expect(getByText(/StarWars Datatable with Filters/i)).toBeInTheDocument();
    expect(getByText(/Filtros Ativos/i)).toBeInTheDocument();
    selectColumns.forEach((column) => {
      expect(getByText(`${column}`)).toBeInTheDocument();
      expect(getByText(`${column}`).tagName).toBe('OPTION');
    });
    selectComparisons.forEach((comparison) => {
      expect(getByText(`${comparison}`)).toBeInTheDocument();
      expect(getByText(`${comparison}`).tagName).toBe('OPTION');
    });
    expect(getByText(/Clique nos botões para ordenar a coluna por ordem crescente ou decrescente/i)).toBeInTheDocument();
    expect(getByText(/Loading.../i)).toBeInTheDocument();
    // expect(getByTestId(/planet-name-input/i)).toBeInTheDocument();
    // expect(getByText(//i)).toBeInTheDocument();
    // expect(getByText(//i)).toBeInTheDocument();
    expect(getByText(/Duração Orbital/i).tagName).toBe('OPTION');

    // FALTA FAZER O INPUT;
  });

  test('filter the name with the input', async () => {
    afterEach(cleanup);
    const { getByText } = render(<Provider><App /></Provider>);
    await waitForDomChange();
    expect(getByText(/Pesquise através do nome do Planeta/i)).toBeInTheDocument();
    titlesColumns.forEach((title) => {
      expect(getByText(`${title}`)).toBeInTheDocument();
      expect(getByText(`${title}`).tagName).toBe('BUTTON');
    });
    planetsName.forEach((name) => {
      expect(getByText(`${name}`)).toBeInTheDocument();
      expect(getByText(`${name}`).tagName).toBe('TD');
    });
    // fireEvent.change({ target: { value: 'aa' } });
  });
});
