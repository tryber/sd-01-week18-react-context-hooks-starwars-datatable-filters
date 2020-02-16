// import React from 'react';
// import { render, cleanup, waitForDomChange } from '@testing-library/react';
// import { planetsData, shortOrder, categories } from '../mockdata';
// import Table from './Table';

// beforeEach(() => {
//   jest.resetModules();
// });

// const getContext = (context = {languages: ['en', 'fr', 'es'], activeLanguage: 'en'}) => {
  
//   // Will then mock the LocalizeContext module being used in our LanguageSelector component
//   jest.doMock('./LocalizeContext', () => {
//     return {
//       LocalizeContext: {
//         Consumer: (props) => props.children(context)
//       }
//     }
//   });
  
//   // you need to re-require after calling jest.doMock.
//   // return the updated LanguageSelector module that now includes the mocked context
//   return require('./LanguageSelector').LanguageSelector;
// }; 

// test('should have a table content with those categories', () => {
//   const { debug } = render(<App />)
//   debug()
// })


// import React from 'react';
// import { render, cleanup, waitForDomChange } from '@testing-library/react';
// import { planetsData, shortOrder, categories } from './mockdata';
// import App from './App';

// // test("mock hook", () => {
// //   useContextMock.mockReturnValue({ data: null, isFetch: false, planets: null, categories: [] });
// //   const element = new ShallowRenderer().render(
// //     <MyComponent />
// //   );
// //   expect(element.props.children).toBe('Test Value');
// // });

// jest.mock('react', () => {
//   const ActualReact = require.requireActual('react')
//   let defaultValues = { data: null, isFetch: false, planets: null, categories: [] }
//   const setValues = (object) => { defaultValues = { ...object } }
//   return {
//     ...ActualReact,
//     useContext: () => ({ database: defaultValues, setDatabase: setValues }), // what you want to return when useContext get fired goes here
//   }
// })


// describe('Table Page', () => {
//   test('should have a table content with those categories', async () => {

//     // const defaultValue = { data: null, isFetch: false, planets: null, categories: [] };
//     // const { debug } = new TestRenderer.create(
//     //   <NameContext.Provider value={defaultValue} >
//     //     <MyComponent />
//     //   </NameContext.Provider>
//     // );
//     const { debug } = render(<App />)

//     debug()

//     await waitForDomChange();

//     debug()
//     // categories.forEach((eachCategory) => {
//     //   expect(getByTestId(eachCategory)).toBeInTheDocument();
//     // });
//   });

//   // test('should render a table content with an ascending alphabetical order in name category', () => {
//   //   const { debug, getByTestId } = renderWithRouter(
//   //     <Table
//   //       data={planetsData} shortOrder={shortOrder}
//   //     />);
//   //   const nameRows = [];
//   //   for (let index = 0; index < planetsData.length; index += 1) {
//   //     nameRows.push(getByTestId(`row${shortOrder.column + index}`).innerHTML);
//   //   }
//   //   console.log(nameRows);
//   //   debug();
//   // });
// });
// import React from 'react';
// import { render, cleanup, waitForDomChange } from '@testing-library/react';
// import { planetsData, shortOrder, categories } from './mockdata';
// import App from './App';

// // test("mock hook", () => {
// //   useContextMock.mockReturnValue({ data: null, isFetch: false, planets: null, categories: [] });
// //   const element = new ShallowRenderer().render(
// //     <MyComponent />
// //   );
// //   expect(element.props.children).toBe('Test Value');
// // });

// jest.mock('react', () => {
//   const ActualReact = require.requireActual('react')
//   let defaultValues = { data: null, isFetch: false, planets: null, categories: [] }
//   const setValues = (object) => { defaultValues = { ...object } }
//   return {
//     ...ActualReact,
//     useContext: () => ({ database: defaultValues, setDatabase: setValues }), // what you want to return when useContext get fired goes here
//   }
// })


// describe('Table Page', () => {
//   test('should have a table content with those categories', async () => {

//     // const defaultValue = { data: null, isFetch: false, planets: null, categories: [] };
//     // const { debug } = new TestRenderer.create(
//     //   <NameContext.Provider value={defaultValue} >
//     //     <MyComponent />
//     //   </NameContext.Provider>
//     // );
//     const { debug } = render(<App />)

//     debug()

//     await waitForDomChange();

//     debug()
//     // categories.forEach((eachCategory) => {
//     //   expect(getByTestId(eachCategory)).toBeInTheDocument();
//     // });
//   });

//   // test('should render a table content with an ascending alphabetical order in name category', () => {
//   //   const { debug, getByTestId } = renderWithRouter(
//   //     <Table
//   //       data={planetsData} shortOrder={shortOrder}
//   //     />);
//   //   const nameRows = [];
//   //   for (let index = 0; index < planetsData.length; index += 1) {
//   //     nameRows.push(getByTestId(`row${shortOrder.column + index}`).innerHTML);
//   //   }
//   //   console.log(nameRows);
//   //   debug();
//   // });
// });
