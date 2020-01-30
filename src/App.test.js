import React from 'react';
import { render } from '@testing-library/react';
import App from './App';


describe('testing default paragraphs', () => {
  it('testing header', () => {
    const { getByText, getByTestId } = render(<App />);
    const filtersActive = getByText(/Filters active:/i);
    const chooseFilters = getByText(/Choose the column to filter:/i);
    const nameInput = getByTestId('nameInput');
    const column = getByTestId('column');
    const comparison = getByTestId('comparison');
    const comparisonValue = getByTestId('comparisonValue');
    expect(column).toBeInTheDocument();
    expect(comparison).toBeInTheDocument();
    expect(comparisonValue).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(chooseFilters).toBeInTheDocument();
    expect(filtersActive).toBeInTheDocument();
  });
});
