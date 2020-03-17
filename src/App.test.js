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
});

describe('ascending order and descending order', () => {
  afterEach(cleanup);

  test('column name with initial ascending and descending order', async () => {
    const { getByText, queryAllByTestId, queryByTestId } = render(<App />);
    await waitForDomChange();

    const planetsAscendingOrder = queryAllByTestId(/planets-0/i);
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
    const selectName = queryByTestId(/select-0/i);
    fireEvent.change(selectName, { target: { value: 'DESC' } });
    const planetsDescendingOrder = queryAllByTestId(/planets-0/i);
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
    const { queryAllByTestId, queryByTestId } = render(<App />);
    await waitForDomChange();
    const selectPopulation = queryByTestId(/select-8/i);
    const selectSurfaceWater = queryByTestId(/select-7/i);
    const selectOrbitalPeriod = queryByTestId(/select-2/i);

    fireEvent.change(selectPopulation, { target: { value: 'DESC' } });
    const populationDesc = queryAllByTestId(/planets-8/i);
    expect(populationDesc[0].innerHTML).toBe('unknown');
    expect(populationDesc[9].innerHTML).toBe('1000');

    fireEvent.change(selectPopulation, { target: { value: 'ASC' } });
    const populationAsc = queryAllByTestId(/planets-8/i);
    expect(populationAsc[9].innerHTML).toBe('unknown');
    expect(populationAsc[0].innerHTML).toBe('1000');

    fireEvent.change(selectSurfaceWater, { target: { value: 'DESC' } });
    const surfaceWaterDesc = queryAllByTestId(/planets-7/i);
    expect(surfaceWaterDesc[0].innerHTML).toBe('unknown');
    expect(surfaceWaterDesc[9].innerHTML).toBe('0');

    fireEvent.change(selectSurfaceWater, { target: { value: 'ASC' } });
    const surfaceWaterAsc = queryAllByTestId(/planets-7/i);
    expect(surfaceWaterAsc[9].innerHTML).toBe('unknown');
    expect(surfaceWaterAsc[0].innerHTML).toBe('0');

    fireEvent.change(selectOrbitalPeriod, { target: { value: 'DESC' } });
    const orbitalPeriodDesc = queryAllByTestId(/planets-2/i);
    expect(orbitalPeriodDesc[0].innerHTML).toBe('5110');
    expect(orbitalPeriodDesc[9].innerHTML).toBe('256');

    fireEvent.change(selectOrbitalPeriod, { target: { value: 'ASC' } });
    const orbitalPeriodAsc = queryAllByTestId(/planets-2/i);
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
    } = render(<App />);
    await waitForDomChange();

    const dropdownColumn = getByTestId(/select-column/i);
    const radioComparisonBig = getByTestId(/radio-comparison-maior/i);
    const radioComparisonLess = getByTestId(/radio-comparison-menor/i);
    const radioComparisonEqual = getByTestId(/radio-comparison-igual/i);

    fireEvent.change(dropdownColumn, { target: { value: 'rotation_period' } });
    fireEvent.click(radioComparisonBig);

    const inputNumberFilter = queryByPlaceholderText(/Coloque a quantidade aqui/i);
    fireEvent.change(inputNumberFilter, { target: { value: 26 } });

    const buttonIncludeFilter = getByText(/filtrar/i);
    expect(buttonIncludeFilter).toBeInTheDocument();

    fireEvent.click(buttonIncludeFilter);
    expect(getByText(/Geonosis/i)).toBeInTheDocument();
    expect(getByText(/Kamino/i)).toBeInTheDocument();
    expect(queryAllByTestId(/planets-0/i).length).toBe(2);

    const activesFiltersRotation = getByText('rotation_period | Maior que | 26');
    expect(activesFiltersRotation).toBeInTheDocument();

    fireEvent.change(dropdownColumn, { target: { value: 'orbital_period' } });
    fireEvent.change(inputNumberFilter, { target: { value: 5000 } });
    fireEvent.click(buttonIncludeFilter);
    expect(queryAllByTestId(/planets-0/i).length).toBe(1);
    const activesFiltersPopulation = getByText('orbital_period | Maior que | 5000');
    expect(activesFiltersPopulation).toBeInTheDocument();

    const excludeFilter = queryAllByTestId(/remove-filter/i);
    fireEvent.click(excludeFilter[1]);
    fireEvent.click(excludeFilter[0]);
    expect(queryAllByTestId(/planets-0/i).length).toBe(10);

    fireEvent.change(dropdownColumn, { target: { value: 'rotation_period' } });
    fireEvent.click(radioComparisonEqual);
    fireEvent.change(inputNumberFilter, { target: { value: 1000 } });
    fireEvent.click(buttonIncludeFilter);

    fireEvent.change(dropdownColumn, { target: { value: 'diameter' } });
    fireEvent.click(radioComparisonBig);
    fireEvent.change(inputNumberFilter, { target: { value: 500 } });
    fireEvent.click(buttonIncludeFilter);

    fireEvent.change(dropdownColumn, { target: { value: 'population' } });
    fireEvent.click(radioComparisonLess);
    fireEvent.change(inputNumberFilter, { target: { value: 1000 } });
    fireEvent.click(buttonIncludeFilter);

    expect(getByText(/nenhum planeta encontrado/i)).toBeInTheDocument();
  });
});

afterEach(cleanup);
test('filter the name with the input', async () => {
  const {
    getByText,
    getAllByText,
    queryByPlaceholderText,
    queryByText,
    queryByTestId,
    queryAllByTestId,
  } = render(<App />);
  await waitForDomChange();
  titlesColumns.forEach((title) => {
    const titlePerfect = getAllByText(`${title}`)[1] || getByText(`${title}`);
    expect(titlePerfect).toBeInTheDocument();
    expect(titlePerfect.tagName).toBe('TH');
  });
  planetsName.forEach((name) => {
    expect(getByText(`${name}`)).toBeInTheDocument();
    expect(getByText(`${name}`).tagName).toBe('TD');
  });
  const inputName = queryByPlaceholderText(/Pesquise aqui/i);
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
  expect(queryByTestId(/planets-0/i)).toBeNull();

  fireEvent.change(inputName, { target: { value: '' } });
  expect(queryAllByTestId(/planets-0/i).length).toBe(10);
});