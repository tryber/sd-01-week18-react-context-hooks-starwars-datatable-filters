import React from 'react';
import { render, cleanup, waitForDomChange, fireEvent } from '@testing-library/react';
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

  const testingShort = (key, getByTestId, shortPlanets) => {
    for (let i = 0; i < shortPlanets.length; i += 1) {
      expect(getByTestId(`row${key}${i}`).innerHTML).toBe(shortPlanets[i]);
    }
  }

  test('short order test', async () => {
    const { debug, getByTestId } = render(<App />);

    await waitForDomChange();

    fireEvent.click(getByTestId('short-dropdown'), { target: { value: categories[1] } })
    fireEvent.click(getByTestId('ASC-radio'));
    testingShort(categories[1], getByTestId, ['18', '23', '24', '24', '24', '26', '100']);

    fireEvent.click(getByTestId('short-dropdown'), { target: { value: categories[1] } })
    fireEvent.click(getByTestId('DSC-radio'));
    testingShort(categories[1], getByTestId, ['100', '26', '24', '24', '24', '23', '18']);

    fireEvent.click(getByTestId('short-dropdown'), { target: { value: categories[6] } })
    fireEvent.click(getByTestId('DSC-radio'));
    testingShort(categories[6], getByTestId,
      ['tundra, ice caves, mountain ranges', 'ocean', 'jungle, rainforests',
        'grassy hills, swamps, forests, mountains', 'grasslands, mountains',
        'forests, mountains, lakes', 'cityscape, mountains']);

    fireEvent.click(getByTestId('short-dropdown'), { target: { value: categories[6] } })
    fireEvent.click(getByTestId('ASC-radio'));
    testingShort(categories[6], getByTestId,
      ['cityscape, mountains', 'forests, mountains, lakes', 'grasslands, mountains',
        'grassy hills, swamps, forests, mountains', 'jungle, rainforests', 'ocean',
        'tundra, ice caves, mountain ranges']);
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
