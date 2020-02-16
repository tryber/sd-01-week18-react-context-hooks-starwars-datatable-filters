import React from 'react';
import { render, cleanup, waitForDomChange } from '@testing-library/react';
import { planetsData, shortOrder, categories } from './mockdata';
import App from './App';
import * as services from './services';

// jest.mock('react', () => {
//   const ActualReact = require.requireActual('react')
//   let defaultValues = { data: null, isFetch: false, planets: null, categories: [] }
//   const setValues = (object) => { defaultValues = { ...object } }
//   return {
//     ...ActualReact,
//     useContext: () => ({ database: defaultValues, setDatabase: setValues }), // what you want to return when useContext get fired goes here
//   }
// })

let promise = new Promise(function(resolve, reject) {
  // the function is executed automatically when the promise is constructed

  // after 1 second signal that the job is done with the result "done"
  setTimeout(() => resolve("done"), 1000);
});


services.fetchingPlanets = jest.fn(() => new Promise((resolve) => setTimeout(() => resolve(planetsData), 3000)))

// jest.doMock('./services', () => (
//   {
//     ...(jest.requireActual('./services')),
//     fetchingPlanets: () => new Promise((resolve) => setTimeout(() => resolve(planetsData), 3000)),
//   }
// ))




test('should have a table content with those categories', async () => {
  const { debug } = render(<App />)
  // const hey = await services.fetchingPlanets()
  // console.log(hey)
  await waitForDomChange();
  debug()
});

