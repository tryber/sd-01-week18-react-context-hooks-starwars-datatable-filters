import React from 'react';
import { render, waitForDomChange, fireEvent, cleanup } from '@testing-library/react';
import App from './App';

afterEach(cleanup);

test('todos os filtros de inputs', () => {
  const { getByPlaceholderText } = render(<App />);
  const nameFilterInput = getByPlaceholderText(/Pesquise aqui/i);
  const valueFilterInput = getByPlaceholderText(/Coloque a quantidade aqui/i);
  const comparisonFilterInput = valueFilterInput.previousSibling;
  const columnFilterInput = comparisonFilterInput.previousSibling;
  expect(nameFilterInput).toBeInTheDocument();
  expect(columnFilterInput).toBeInTheDocument();
  expect(comparisonFilterInput).toBeInTheDocument();
  expect(valueFilterInput).toBeInTheDocument();
});

