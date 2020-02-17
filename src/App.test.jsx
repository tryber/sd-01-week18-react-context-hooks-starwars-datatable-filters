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

  const filterPlanets = (string) => (
    planetsData.results
      .filter(({ name }) => name.toLowerCase().includes(string.toLowerCase()))
      .map(({ name }) => name)
  );

  test('shearch bar text', async () => {
    const { getByTestId } = render(<App />);

    await waitForDomChange();

    fireEvent.change(getByTestId('search-bar'), { target: { value: 'moTher' } });

    const filterPlanetsI = filterPlanets('moTher');
    const renderPlanetsI = [];
    for (let i = 0; i < filterPlanetsI.length; i += 1) {
      renderPlanetsI.push(getByTestId(`rowname${i}`).innerHTML)
    };
    expect(renderPlanetsI.length).toBe(filterPlanetsI.length);
    for (let i = 0; i < filterPlanetsI.length; i += 1) {
      expect(filterPlanetsI.includes(renderPlanetsI[i])).toBeTruthy()
    };

    fireEvent.change(getByTestId('search-bar'), { target: { value: '' } });

    const filterPlanetsII = planetsData.results.map(({ name }) => name);
    const renderPlanetsII = [];
    for (let i = 0; i < filterPlanetsII.length; i += 1) {
      renderPlanetsII.push(getByTestId(`rowname${i}`).innerHTML)
    };
    expect(renderPlanetsII.length).toBe(filterPlanetsII.length);
    for (let i = 0; i < filterPlanetsII.length; i += 1) {
      expect(filterPlanetsII.includes(renderPlanetsII[i])).toBeTruthy()
    };

    fireEvent.change(getByTestId('search-bar'), { target: { value: 'aurora' } });

    const filterPlanetsIII = filterPlanets('aurora');
    const renderPlanetsIII = [];
    for (let i = 0; i < filterPlanetsIII.length; i += 1) {
      renderPlanetsIII.push(getByTestId(`rowname${i}`).innerHTML)
    };
    expect(renderPlanetsIII.length).toBe(filterPlanetsIII.length);
    for (let i = 0; i < filterPlanetsIII.length; i += 1) {
      expect(filterPlanetsIII.includes(renderPlanetsIII[i])).toBeTruthy()
    };
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
