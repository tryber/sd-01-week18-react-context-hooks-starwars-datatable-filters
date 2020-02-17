import React from 'react';
import { render, cleanup, waitForDomChange, fireEvent, wait } from '@testing-library/react';
import { planetsData, shortOrder, categories } from './mockdata';
import App from './App';
import * as services from './services';

afterEach(cleanup);

services.fetchingPlanets = jest.fn(() =>
  new Promise((resolve) => setTimeout(() => resolve(planetsData), 3000)));

describe('async', () => {
  test('testing receive data by categories', async () => {
    const { getByTestId } = render(<App />);

    await waitForDomChange();
    categories.forEach((eachCategory) => {
      expect(getByTestId(eachCategory)).toBeInTheDocument();
    });
  });

  test('testing ascending order data', async () => {
    const { getByTestId } = render(<App />);

    await waitForDomChange();

    const orderPlanets = planetsData.results.map(({ name }) => name).sort();
    for (let i = 0; i < orderPlanets.length; i += 1) {
      expect(getByTestId(`rowname${i}`).innerHTML).toBe(orderPlanets[i]);
    }
  });

  const testingFn = (key, getByTestId, planets) => {
    for (let i = 0; i < planets.length; i += 1) {
      expect(getByTestId(`row${key}${i}`).innerHTML).toBe(planets[i]);
    }
  }

  const testingShearch = (getByTestId, filterPlanets) => {
    const renderPlanets = [];
    for (let i = 0; i < filterPlanets.length; i += 1) {
      renderPlanets.push(getByTestId(`rowname${i}`).innerHTML)
    };
    expect(renderPlanets.length).toBe(filterPlanets.length);
    for (let i = 0; i < filterPlanets.length; i += 1) {
      expect(filterPlanets.includes(renderPlanets[i])).toBeTruthy()
    };
  }

  test('shearch bar text', async () => {
    const { getByTestId } = render(<App />);

    await waitForDomChange();

    fireEvent.change(getByTestId('search-bar'), { target: { value: 'moTher' } });
    testingShearch(getByTestId, ['Mothership', 'Mothermary']);

    fireEvent.change(getByTestId('search-bar'), { target: { value: '' } });
    testingShearch(getByTestId, planetsData.results.map(({ name }) => name));

    fireEvent.change(getByTestId('search-bar'), { target: { value: 'aurora' } });
    testingShearch(getByTestId, []);

    fireEvent.change(getByTestId('search-bar'), { target: { value: 'a' } });
    testingShearch(getByTestId, ['Mothermary', 'Anticapital', 'Gaganás', 'Swiftland']);
  });



  test('short order test', async () => {
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

  test('filter num test', async () => {
    const { debug, getByTestId, getByText, container } = render(<App />);

    await waitForDomChange();

    fireEvent.change(getByTestId('column-dropdown'), { target: { value: categories[1] } });
    fireEvent.click(getByTestId('iqual-radio'));
    fireEvent.change(getByTestId('number-input'), { target: { value: '24' } });
    fireEvent.click(getByTestId('filter-button'));

    testingFn(categories[0], getByTestId, ['Delrey', 'Mothermary', 'Mothership']);

    fireEvent.change(getByTestId('column-dropdown'), { target: { value: categories[3] } });
    fireEvent.click(getByTestId('less-radio'));
    fireEvent.change(getByTestId('number-input'), { target: { value: '10200' } });
    fireEvent.click(getByTestId('filter-button'));

    // testingFn(categories[0], getByTestId, ['Anticapital', 'Hoth']);

    const test = planetsData.results.map(({ [categories[1]]: value, [categories[0]]: name, [categories[3]]: hey }) => `${name}${value}${hey}`)
    console.log(test)


  });



  test('loading testing', () => {
    const { getByText } = render(<App />);
    expect(getByText('Loading...')).toBeInTheDocument();
  });


})



// test('loading testing', () => {
//   const { getByText } = render(<App />)
//   expect(getByText('Loading...')).toBeInTheDocument();
// });

// const pHTMLall = Object.keys(container.querySelectorAll('td')).map(key => container.querySelectorAll('td')[key]);
    //   const pContainer = pHTMLall.map(pHTMLeach => pHTMLeach.innerHTML);

    //   console.log(pContainer)
