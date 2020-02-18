import React from 'react';
import { render, cleanup, waitForDomChange, fireEvent, wait } from '@testing-library/react';
import { planetsData, categories } from './mockdata';
import App from './App';
import * as services from './services';

afterEach(cleanup);

services.fetchingPlanets = jest.fn(() =>
  new Promise((resolve) => setTimeout(() => resolve(planetsData), 3000)));

const testingFn = (key, getByTestId, planets) => {
  for (let i = 0; i < planets.length; i += 1) {
    expect(getByTestId(`row${key}${i}`).innerHTML).toBe(planets[i]);
  }
}

describe('App', () => {
  test('render table categories', async () => {
    const { getByTestId } = render(<App />);

    await waitForDomChange();
    categories.forEach((eachCategory) => {
      expect(getByTestId(eachCategory)).toBeInTheDocument();
    });
  });

  test('render table ascending order data', async () => {
    const { getByTestId } = render(<App />);

    await waitForDomChange();

    const orderPlanets = planetsData.results.map(({ name }) => name).sort();
    for (let i = 0; i < orderPlanets.length; i += 1) {
      expect(getByTestId(`rowname${i}`).innerHTML).toBe(orderPlanets[i]);
    }
  });

  test('shearch bar', async () => {
    const { getByTestId } = render(<App />);

    await waitForDomChange();

    fireEvent.change(getByTestId('search-bar'), { target: { value: 'moTher' } });
    testingFn(categories[0], getByTestId, ['Mothermary', 'Mothership']);

    fireEvent.change(getByTestId('search-bar'), { target: { value: '' } });
    testingFn(categories[0], getByTestId, ['Anticapital', 'Delrey', 'Gaganás',
      'Hoth', 'Mothermary', 'Mothership', 'Swiftland']);

    fireEvent.change(getByTestId('search-bar'), { target: { value: 'aurora' } });
    testingFn(categories[0], getByTestId, []);

    fireEvent.change(getByTestId('search-bar'), { target: { value: 'a' } });
    testingFn(categories[0], getByTestId, ['Anticapital', 'Gaganás', 'Mothermary', 'Swiftland']);
  });



  test('short order', async () => {
    const { getByTestId, getByText } = render(<App />);

    expect(getByText(/Short Table/i)).toBeInTheDocument();

    await waitForDomChange();

    fireEvent.click(getByTestId('short-dropdown'), { target: { value: categories[1] } });
    fireEvent.click(getByTestId('ASC-radio'));
    testingFn(categories[1], getByTestId, ['18', '23', '24', '24', '24', '26', '100']);

    fireEvent.click(getByTestId('short-dropdown'), { target: { value: categories[1] } });
    fireEvent.click(getByTestId('DSC-radio'));
    testingFn(categories[1], getByTestId, ['100', '26', '24', '24', '24', '23', '18']);

    fireEvent.click(getByTestId('short-dropdown'), { target: { value: categories[6] } });
    fireEvent.click(getByTestId('DSC-radio'));
    testingFn(categories[6], getByTestId,
      ['tundra, ice caves, mountain ranges', 'ocean', 'jungle, rainforests',
        'grassy hills, swamps, forests, mountains', 'grasslands, mountains',
        'forests, mountains, lakes', 'cityscape, mountains']);

    fireEvent.click(getByTestId('short-dropdown'), { target: { value: categories[6] } });
    fireEvent.click(getByTestId('ASC-radio'));
    testingFn(categories[6], getByTestId,
      ['cityscape, mountains', 'forests, mountains, lakes', 'grasslands, mountains',
        'grassy hills, swamps, forests, mountains', 'jungle, rainforests', 'ocean',
        'tundra, ice caves, mountain ranges']);
  });

  test('filter number', async () => {
    const { getByTestId } = render(<App />);

    await waitForDomChange();

    fireEvent.change(getByTestId('column-dropdown'), { target: { value: categories[1] } });
    fireEvent.click(getByTestId('iqual-radio'));
    fireEvent.change(getByTestId('number-input'), { target: { value: '24' } });
    fireEvent.click(getByTestId('filter-button'));

    expect(getByTestId(`${categories[1]}iqual24`)).toBeInTheDocument();
    testingFn(categories[0], getByTestId, ['Delrey', 'Mothermary', 'Mothership']);

    fireEvent.change(getByTestId('column-dropdown'), { target: { value: categories[3] } });
    fireEvent.click(getByTestId('greater-radio'));
    fireEvent.change(getByTestId('number-input'), { target: { value: '10200' } });
    fireEvent.click(getByTestId('filter-button'));

    expect(getByTestId(`${categories[3]}greater10200`)).toBeInTheDocument();
    testingFn(categories[0], getByTestId, ['Delrey', 'Mothership']);

    fireEvent.change(getByTestId('column-dropdown'), { target: { value: categories[8] } });
    fireEvent.click(getByTestId('less-radio'));
    fireEvent.change(getByTestId('number-input'), { target: { value: '2000000001' } });
    fireEvent.click(getByTestId('filter-button'));

    expect(getByTestId(`${categories[8]}less2000000001`)).toBeInTheDocument();
    testingFn(categories[0], getByTestId, ['Mothership']);

    fireEvent.click(getByTestId(`remove-button-${categories[8]}`));

    testingFn(categories[0], getByTestId, ['Delrey', 'Mothership']);

    fireEvent.click(getByTestId(`remove-button-${categories[3]}`));

    testingFn(categories[0], getByTestId, ['Delrey', 'Mothermary', 'Mothership']);

    fireEvent.click(getByTestId(`remove-button-${categories[1]}`));

    testingFn(categories[0], getByTestId, ['Anticapital', 'Delrey', 'Gaganás',
      'Hoth', 'Mothermary', 'Mothership', 'Swiftland']);
  });


  test('filter num desapear', async () => {
    const { getByTestId, queryByTestId } = render(<App />);

    await waitForDomChange();

    fireEvent.change(getByTestId('column-dropdown'), { target: { value: 'none' } });
    fireEvent.change(getByTestId('column-dropdown'), { target: { value: categories[3] } });
    fireEvent.click(getByTestId('iqual-radio'));
    fireEvent.change(getByTestId('number-input'), { target: { value: '1' } });
    fireEvent.click(getByTestId('filter-button'));

    expect(getByTestId('column-dropdown')).toBeInTheDocument();

    fireEvent.change(getByTestId('column-dropdown'), { target: { value: categories[2] } });
    fireEvent.click(getByTestId('greater-radio'));
    fireEvent.change(getByTestId('number-input'), { target: { value: '1' } });
    fireEvent.click(getByTestId('filter-button'));

    expect(getByTestId('column-dropdown')).toBeInTheDocument();

    fireEvent.change(getByTestId('column-dropdown'), { target: { value: categories[8] } });
    fireEvent.click(getByTestId('less-radio'));
    fireEvent.change(getByTestId('number-input'), { target: { value: '1' } });
    fireEvent.click(getByTestId('filter-button'));
    expect(getByTestId('column-dropdown')).toBeInTheDocument();

    fireEvent.change(getByTestId('column-dropdown'), { target: { value: categories[1] } });
    fireEvent.click(getByTestId('less-radio'));
    fireEvent.change(getByTestId('number-input'), { target: { value: '1' } });
    fireEvent.click(getByTestId('filter-button'));

    expect(getByTestId('column-dropdown')).toBeInTheDocument();
    fireEvent.change(getByTestId('column-dropdown'), { target: { value: categories[7] } });
    fireEvent.click(getByTestId('less-radio'));
    fireEvent.change(getByTestId('number-input'), { target: { value: '1' } });
    fireEvent.click(getByTestId('filter-button'));

    expect(queryByTestId('column-dropdown')).toBeNull();
  });

  test('loading', () => {
    const { getByText } = render(<App />);
    expect(getByText('Loading...')).toBeInTheDocument();
  });
});
