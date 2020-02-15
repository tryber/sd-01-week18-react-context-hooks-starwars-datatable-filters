import React from 'react';
import PropTypes from 'prop-types';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, cleanup } from '@testing-library/react';
import { planetsData, shortOrder } from '../mockdata';
import { Table } from '../components/Table';

afterEach(cleanup);

const mockComponent = (children) => (
  <div> {children} </div>
);

jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');
  return {
    ...originalModule,
    BrowserRouter: ({ children }) => mockComponent(children),
  };
});

const renderWithRouter = (ui, { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {}) =>
  ({ ...render(<Router history={history}>{ui}</Router>), history });

const categories = Object.keys(planetsData[0]).filter((category) => category !== 'residents');

describe('Table Page', () => {
  test('should have a table content with those categories', async () => {
    const { getByTestId } = renderWithRouter(<Table data={planetsData} shortOrder={shortOrder} />);
    categories.forEach((eachCategory) => {
      expect(getByTestId(eachCategory)).toBeInTheDocument();
    });
  });

  test('should render a table content with an ascending alphabetical order in name category', () => {
    const { debug, getByTestId } = renderWithRouter(
      <Table
        data={planetsData} shortOrder={shortOrder}
      />);
    const nameRows = [];
    for (let index = 0; index < planetsData.length; index += 1) {
      nameRows.push(getByTestId(`row${shortOrder.column + index}`).innerHTML);
    }
    console.log(nameRows);
    debug();
  });
});

mockComponent.propTypes = {
  children: PropTypes.node.isRequired,
};
