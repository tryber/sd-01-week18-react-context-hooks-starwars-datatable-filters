import React from 'react';
import { render } from '@testing-library/react';
import App from './App';


describe('testing default paragraphs', () => {
  it('testing header', () => {
    const { getByText, getByTestId } = render(<App />);
    expect(getByTestId('column')).toBeInTheDocument();
    expect(getByTestId('comparison')).toBeInTheDocument();
    expect(getByTestId('comparisonValue')).toBeInTheDocument();
    expect(getByTestId('nameInput')).toBeInTheDocument();
    expect(getByText(/Choose the column to filter:/i)).toBeInTheDocument();
    expect(getByText(/Filters active:/i)).toBeInTheDocument();
  });
});
