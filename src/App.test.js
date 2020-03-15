import React from 'react';
import {
  render,
  waitForDomChange,
  fireEvent,
  cleanup,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';

afterEach(cleanup);

test('renders all filters inputs', () => {
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

test('render all table header titles', () => {
  const { getByText } = render(<Provider store={store}><App /></Provider>);
  const tableBody = getByText(/Para ordenar basta clicar em cima do titulo da coluna desejada./i).nextSibling.firstChild;
  const tableTitles = tableBody.firstChild;
  expect(tableTitles.childElementCount).toBe(13);
});

test('render loading text while planets loads', async () => {
  const { getByText } = render(<Provider store={store}><App /></Provider>);
  const loading = getByText(/Para ordenar basta clicar em cima do titulo da coluna desejada./i).previousSibling;
  expect(loading).toBeInTheDocument();
  await waitForDomChange();
  expect(loading).not.toBeInTheDocument();
});

test('render all planets', async () => {
  const { getByText } = render(<Provider store={store}><App /></Provider>);
  await waitForDomChange();
  const tableBody = getByText(/Para ordenar basta clicar em cima do titulo da coluna desejada./i).nextSibling.firstChild;
  expect(tableBody.childElementCount).toBe(11);
});

test('render filtered planets according to name filter', async () => {
  const { getByText, getByPlaceholderText } = render(<Provider store={store}><App /></Provider>);
  await waitForDomChange();

  const nameFilterInput = getByPlaceholderText(/Filtrar pelo Nome/i);
  const tableBody = getByText(/Para ordenar basta clicar em cima do titulo da coluna desejada./i).nextSibling.firstChild;
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

test('render filtered planets according to numeric filters', async () => {
  const { getByText, getByPlaceholderText } = render(<Provider store={store}><App /></Provider>);
  await waitForDomChange();

  const valueFilterInput = getByPlaceholderText(/Filtrar por Valor/i);
  const comparisonFilterInput = valueFilterInput.previousSibling;
  const columnFilterInput = comparisonFilterInput.previousSibling;
  const tableBody = getByText(/Para ordenar basta clicar em cima do titulo da coluna desejada./i).nextSibling.firstChild;
  expect(tableBody.childElementCount).toBe(11);

  fireEvent.click(columnFilterInput);
  fireEvent.change(columnFilterInput, { target: { value: 'population' } });
  fireEvent.click(comparisonFilterInput);
  fireEvent.change(comparisonFilterInput, { target: { value: 'bigger' } });
  fireEvent.change(valueFilterInput, { target: { value: 1000 } });
  expect(columnFilterInput.value).toBe('population');
  expect(comparisonFilterInput.value).toBe('bigger');
  expect(valueFilterInput.value).toBe('1000');

  const addFilterBtn = valueFilterInput.nextSibling;
  fireEvent.click(addFilterBtn);
  expect(tableBody.childElementCount).toBe(8);
});

test('shows the actives numeric filters', async () => {
  const { getByText, getByPlaceholderText } = render(<Provider store={store}><App /></Provider>);
  await waitForDomChange();

  const valueFilterInput = getByPlaceholderText(/Filtrar por Valor/i);
  const comparisonFilterInput = valueFilterInput.previousSibling;
  const columnFilterInput = comparisonFilterInput.previousSibling;
  const tableBody = getByText(/Para ordenar basta clicar em cima do titulo da coluna desejada./i).nextSibling.firstChild;
  expect(tableBody.childElementCount).toBe(11);

  fireEvent.click(columnFilterInput);
  fireEvent.change(columnFilterInput, { target: { value: 'diameter' } });
  fireEvent.click(comparisonFilterInput);
  fireEvent.change(comparisonFilterInput, { target: { value: 'equal' } });
  fireEvent.change(valueFilterInput, { target: { value: 12500 } });
  expect(columnFilterInput.value).toBe('diameter');
  expect(comparisonFilterInput.value).toBe('equal');
  expect(valueFilterInput.value).toBe('12500');

  const addFilterBtn = valueFilterInput.nextSibling;
  fireEvent.click(addFilterBtn);
  expect(tableBody.childElementCount).toBe(2);

  const activeFilters = getByText(/Filtros Ativos/i).parentElement;
  expect(activeFilters.childElementCount).toBe(2);
});
