import React from 'react';
import {
  cleanup,
  render,
  waitForDomChange,
  fireEvent,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';

afterEach(cleanup);
it('renders all filters inputs', () => {
  const { getByPlaceholderText } = render(<Provider store={store}><App /></Provider>);
  const nameFilterInput = getByPlaceholderText(/Filtrar pelo Nome/i);
  const valueFilterInput = getByPlaceholderText(/Filtrar por Valor/i);
  const comparisonFilterInput = valueFilterInput.previousSibling;
  const columnFilterInput = comparisonFilterInput.previousSibling;

  expect(nameFilterInput).toBeInTheDocument();
  expect(columnFilterInput).toBeInTheDocument();
  expect(comparisonFilterInput).toBeInTheDocument();
  expect(valueFilterInput).toBeInTheDocument();
});

it('render all table header titles', () => {
  const { getByText } = render(<Provider store={store}><App /></Provider>);
  const tableBody = getByText(/Para ordenar basta clicar em cima do titulo da coluna desejada./i).nextSibling.firstChild;
  const tableTitles = tableBody.firstChild;
  expect(tableTitles.childElementCount).toBe(13);
});

it('render loading text while planets loads', async () => {
  const { getByText } = render(<Provider store={store}><App /></Provider>);
  const loading = getByText(/Para ordenar basta clicar em cima do titulo da coluna desejada./i).previousSibling;
  expect(loading).toBeInTheDocument();
  await waitForDomChange();
  expect(loading).not.toBeInTheDocument();
});

it('render all planets', async () => {
  const { getByText } = render(<Provider store={store}><App /></Provider>);
  const tableBody = getByText(/Para ordenar basta clicar em cima do titulo da coluna desejada./i).nextSibling.firstChild;
  await waitForDomChange();
  expect(tableBody.childElementCount).toBe(11);
});

it('render filtered planets according to name filter', async () => {
  const { getByText, getByPlaceholderText } = render(<Provider store={store}><App /></Provider>);
  const nameFilterInput = getByPlaceholderText(/Filtrar pelo Nome/i);
  const tableBody = getByText(/Para ordenar basta clicar em cima do titulo da coluna desejada./i).nextSibling.firstChild;
  await waitForDomChange();
  expect(tableBody.childElementCount).toBe(11);
  fireEvent.change(nameFilterInput, { target: { value: 'Alderaan' } });
  expect(tableBody.childElementCount).toBe(2);
  fireEvent.change(nameFilterInput, { target: { value: 'teste' } });
  expect(tableBody.childElementCount).toBe(1);
  fireEvent.change(nameFilterInput, { target: { value: 'E' } });
  expect(tableBody.childElementCount).toBe(5);
  fireEvent.change(nameFilterInput, { target: { value: '' } });
  expect(tableBody.childElementCount).toBe(11);
});

it('render filtered planets according to numeric filters', async () => {
  const { getByText, getByPlaceholderText } = render(<Provider store={store}><App /></Provider>);
  const valueFilterInput = getByPlaceholderText(/Filtrar por Valor/i);
  const comparisonFilterInput = valueFilterInput.previousSibling;
  const columnFilterInput = comparisonFilterInput.previousSibling;
  const tableBody = getByText(/Para ordenar basta clicar em cima do titulo da coluna desejada./i).nextSibling.firstChild;
  await waitForDomChange();
  expect(tableBody.childElementCount).toBe(11);
  fireEvent.click(columnFilterInput);
  fireEvent.click(getByText(/População/i));
  fireEvent.click(comparisonFilterInput);
  fireEvent.click(getByText(/Maior que/i));
  fireEvent.change(valueFilterInput, { target: { value: 1000 } });
  await waitForDomChange();
  const addFilterBtn = valueFilterInput.nextSibling;
  fireEvent.click(addFilterBtn);
  expect(tableBody.childElementCount).toBe(8);
});
