import React from 'react';
import {
  render,
  waitForDomChange,
  fireEvent,
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

  test('test elements before dom change', () => {
    const { getByText, queryByPlaceholderText } = render(<Provider><App /></Provider>);
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

    const inputNumber = queryByPlaceholderText(/Filtrar por Valor/i);
    expect(inputNumber).toBeInTheDocument();
    expect(getByText(/Duração Orbital/i).tagName).toBe('OPTION');
  });

  test('filter the name with the input', async () => {
    afterEach(cleanup);
    const {
      getByText,
      queryByPlaceholderText,
      queryByText,
      queryByTestId,
      queryAllByTestId,
    } = render(<Provider><App /></Provider>);
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

    const inputName = queryByPlaceholderText(/Filtrar por nome/i);
    expect(inputName).toBeInTheDocument();

    fireEvent.change(inputName, { target: { value: 'aa' } });
    expect(getByText(`${planetsName[0]}`)).toBeInTheDocument();
    expect(queryByText(`${planetsName[1]}`)).not.toBeInTheDocument();
    expect(queryByText(`${planetsName[2]}`)).not.toBeInTheDocument();
    expect(queryByText(`${planetsName[3]}`)).not.toBeInTheDocument();
    fireEvent.change(inputName, { target: { value: 'AA' } });
    expect(getByText('Alderaan')).toBeInTheDocument();

    fireEvent.change(inputName, { target: { value: 'h' } });
    expect(getByText('Dagobah')).toBeInTheDocument();
    expect(getByText('Hoth')).toBeInTheDocument();

    fireEvent.change(inputName, { target: { value: 'hfff' } });
    expect(queryByTestId(/planets-name/i)).toBeNull();

    fireEvent.change(inputName, { target: { value: '' } });
    expect(queryAllByTestId(/planets-name/i).length).toBe(10);
  });
});

describe('ascending order and descending order', () => {
  afterEach(cleanup);

  test('column name with initial ascending and descending order', async () => {
    const { getByText, queryAllByTestId } = render(<Provider><App /></Provider>);
    await waitForDomChange();

    const planetsAscendingOrder = queryAllByTestId(/planets-name/i);
    expect(planetsAscendingOrder[0].innerHTML).toBe('Alderaan');
    expect(planetsAscendingOrder[1].innerHTML).toBe('Bespin');
    expect(planetsAscendingOrder[2].innerHTML).toBe('Coruscant');
    expect(planetsAscendingOrder[3].innerHTML).toBe('Dagobah');
    expect(planetsAscendingOrder[4].innerHTML).toBe('Endor');
    expect(planetsAscendingOrder[5].innerHTML).toBe('Geonosis');
    expect(planetsAscendingOrder[6].innerHTML).toBe('Hoth');
    expect(planetsAscendingOrder[7].innerHTML).toBe('Kamino');
    expect(planetsAscendingOrder[8].innerHTML).toBe('Naboo');
    expect(planetsAscendingOrder[9].innerHTML).toBe('Yavin IV');

    fireEvent.click(getByText(/name/i));
    const planetsDescendingOrder = queryAllByTestId(/planets-name/i);
    expect(planetsDescendingOrder[9].innerHTML).toBe('Alderaan');
    expect(planetsDescendingOrder[8].innerHTML).toBe('Bespin');
    expect(planetsDescendingOrder[7].innerHTML).toBe('Coruscant');
    expect(planetsDescendingOrder[6].innerHTML).toBe('Dagobah');
    expect(planetsDescendingOrder[5].innerHTML).toBe('Endor');
    expect(planetsDescendingOrder[4].innerHTML).toBe('Geonosis');
    expect(planetsDescendingOrder[3].innerHTML).toBe('Hoth');
    expect(planetsDescendingOrder[2].innerHTML).toBe('Kamino');
    expect(planetsDescendingOrder[1].innerHTML).toBe('Naboo');
    expect(planetsDescendingOrder[0].innerHTML).toBe('Yavin IV');
  });

  test('columns surface-water, population and orbital-period', async () => {
    afterEach(cleanup);
    const { getByText, queryAllByTestId } = render(<Provider><App /></Provider>);
    await waitForDomChange();

    const buttonPopulation = getByText(/population/i);
    const buttonSurfaceWater = getByText(/surface_water/i);
    const buttonOrbitalPeriod = getByText(/orbital_period/i);

    fireEvent.click(buttonPopulation);
    const populationDesc = queryAllByTestId(/population/i);
    expect(populationDesc[0].innerHTML).toBe('unknown');
    expect(populationDesc[9].innerHTML).toBe('1000');

    fireEvent.click(buttonPopulation);
    const populationAsc = queryAllByTestId(/population/i);
    expect(populationAsc[9].innerHTML).toBe('unknown');
    expect(populationAsc[0].innerHTML).toBe('1000');

    fireEvent.click(buttonSurfaceWater);
    const surfaceWaterDesc = queryAllByTestId(/surface-water/i);
    expect(surfaceWaterDesc[0].innerHTML).toBe('unknown');
    expect(surfaceWaterDesc[9].innerHTML).toBe('0');

    fireEvent.click(buttonSurfaceWater);
    const surfaceWaterAsc = queryAllByTestId(/surface-water/i);
    expect(surfaceWaterAsc[9].innerHTML).toBe('unknown');
    expect(surfaceWaterAsc[0].innerHTML).toBe('0');

    fireEvent.click(buttonOrbitalPeriod);
    const orbitalPeriodDesc = queryAllByTestId(/orbital-period/i);
    expect(orbitalPeriodDesc[0].innerHTML).toBe('5110');
    expect(orbitalPeriodDesc[9].innerHTML).toBe('256');

    fireEvent.click(buttonOrbitalPeriod);
    const orbitalPeriodAsc = queryAllByTestId(/orbital-period/i);
    expect(orbitalPeriodAsc[9].innerHTML).toBe('5110');
    expect(orbitalPeriodAsc[0].innerHTML).toBe('256');
  });
});

describe('filter number', () => {
  afterEach(cleanup);

  test('select dropdown column, comparison and filter with input', async () => {
    const {
      getByText,
      queryByPlaceholderText,
      getByTestId,
      queryAllByTestId,
    } = render(<Provider><App /></Provider>);
    await waitForDomChange();

    const dropdownColumn = getByTestId(/select-column/i);
    const dropdownComparison = getByTestId(/select-comparison/i);

    fireEvent.change(dropdownColumn, { target: { value: 'rotation_period' } });
    fireEvent.change(dropdownComparison, { target: { value: 'bigger' } });

    const inputNumberFilter = queryByPlaceholderText(/Filtrar por valor/i);
    fireEvent.change(inputNumberFilter, { target: { value: 26 } });

    const buttonIncludeFilter = getByText(/Adicionar Filtro/i);
    expect(buttonIncludeFilter).toBeInTheDocument();

    fireEvent.click(buttonIncludeFilter);
    expect(getByText(/Geonosis/i)).toBeInTheDocument();
    expect(getByText(/Kamino/i)).toBeInTheDocument();
    expect(queryAllByTestId(/planets-name/i).length).toBe(2);

    const activesFiltersRotation = getByText('rotation_period | bigger | 26');
    expect(activesFiltersRotation).toBeInTheDocument();

    fireEvent.change(dropdownColumn, { target: { value: 'orbital_period' } });
    fireEvent.change(inputNumberFilter, { target: { value: 300 } });
    fireEvent.click(buttonIncludeFilter);
    expect(queryAllByTestId(/planets-name/i).length).toBe(1);
    const activesFiltersPopulation = getByText('orbital_period | bigger | 300');
    expect(activesFiltersPopulation).toBeInTheDocument();

    const excludeFilter = queryAllByTestId(/exclude-filter/i);
    fireEvent.click(excludeFilter[1]);
    expect(queryAllByTestId(/planets-name/i).length).toBe(2);
    fireEvent.click(excludeFilter[0]);
    expect(queryAllByTestId(/planets-name/i).length).toBe(10);

    fireEvent.change(dropdownColumn, { target: { value: 'rotation_period' } });
    fireEvent.click(buttonIncludeFilter);

    fireEvent.change(dropdownColumn, { target: { value: 'orbital_period' } });
    fireEvent.click(buttonIncludeFilter);

    fireEvent.change(dropdownColumn, { target: { value: 'population' } });
    fireEvent.click(buttonIncludeFilter);

    fireEvent.change(dropdownColumn, { target: { value: 'diameter' } });
    fireEvent.click(buttonIncludeFilter);

    fireEvent.change(dropdownColumn, { target: { value: 'surface_water' } });
    fireEvent.click(buttonIncludeFilter);
    expect(getByText(/Todos os Filtros já foram selecionados/i)).toBeInTheDocument();
  });
});
