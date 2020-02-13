import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, waitForDomChange, getByTestId } from '@testing-library/react';
import { planetsData, shortOrder } from '../mockdata';
import { Table } from '../components/Table';

jest.mock('react-router-dom', () => {
	const originalModule = jest.requireActual('react-router-dom')
	return {
		...originalModule,
		BrowserRouter: ({ children }) => (<div> {children} </div>),
	}
});

const renderWithRouter = (ui, { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {}) => {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history,
  };
}

const categories = Object.keys(planetsData[0]).filter((category) => category !== 'residents');

describe('Table Page', () => {
	test('should have a table content with those categories', async () => {
		const { getByTestId } = renderWithRouter(<Table data={planetsData} shortOrder={shortOrder} />)
		categories.forEach((eachCategory) => {
			const regex = new RegExp(`${eachCategory}`, 'i');
			expect(getByTestId(regex)).toBeInTheDocument();
		});
	})
})
