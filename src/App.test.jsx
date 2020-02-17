import React from 'react';
import { render, cleanup, waitForDomChange } from '@testing-library/react';
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

  test('loading testing', () => {
    const { getByText } = render(<App />)
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
