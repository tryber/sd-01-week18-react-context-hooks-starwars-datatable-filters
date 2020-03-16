import React from 'react';
import {
  render,
  cleanup,
  waitForDomChange,
  fireEvent,
} from '@testing-library/react';

import App from './App';
import { Provider } from './context/StarWarsContext';

const colunasParaComparar = ['Maior que', 'Menor que', 'Igual a'];

const colunasParaFiltrar = [
  'População',
  'Duração Orbital',
  'Diâmetro',
  'Duração da Rotação',
  'Superfície da Água',
];

const nomeDasColunas = [
  'name',
  'rotation_period',
  'orbital_period',
  'diameter',
  'climate',
  'gravity',
  'terrain',
  'surface_water',
  'population',
  'films',
  'created',
  'edited',
  'url',
];

const nomeDosPlanetas = [
  'Alderaan',
  'Bespin',
  'Coruscant',
  'Dagobah',
  'Endor',
  'Geonosis',
  'Hoth',
  'Kamino',
  'Naboo',
  'Yavin IV',
];

describe('Testando os componentes que já iniciam com a página.', () => {
  afterEach(cleanup);

  test('Conteúdos já carregados.', () => {
    const { getByText } = render(<Provider><App /></Provider>);
    expect(getByText(/Filtros/i)).toBeInTheDocument();
    expect(getByText(/Nome do Planeta:/i)).toBeInTheDocument();

    colunasParaFiltrar.forEach((colunas) => {
      expect(getByText(`${colunas}`)).toBeInTheDocument();
      expect(getByText(`${colunas}`).tagName).toBe('OPTION');
    });

    colunasParaComparar.forEach((compararColunas) => {
      expect(getByText(`${compararColunas}`)).toBeInTheDocument();
      expect(getByText(`${compararColunas}`).tagName).toBe('OPTION');
    });
  });

  test('Filtragem pelo nome do planeta', async () => {
    const {
      getByText,
      queryByPlaceholderText,
      queryByTestId,
      queryAllByTestId,
    } = render(<Provider><App /></Provider>);

    await waitForDomChange();

    expect(getByText(/Filtros/i)).toBeInTheDocument();
    expect(getByText(/Nome do Planeta:/i)).toBeInTheDocument();

    nomeDasColunas.forEach((tiposColunas) => {
      expect(getByText(`${tiposColunas}`)).toBeInTheDocument();
      expect(getByText(`${tiposColunas}`).tagName).toBe('BUTTON');
    });
    nomeDosPlanetas.forEach((planetas) => {
      expect(getByText(`${planetas}`)).toBeInTheDocument();
      expect(getByText(`${planetas}`).tagName).toBe('TD');
    });

    const inputPlanet = queryByPlaceholderText(/Nome do Planeta/i);
    expect(inputPlanet).toBeInTheDocument();

    fireEvent.change(inputPlanet, { target: { value: 't' } });
    expect(getByText('Coruscant')).toBeInTheDocument();
    expect(getByText('Hoth')).toBeInTheDocument();

    fireEvent.change(inputPlanet, { target: { value: 'h' } });
    expect(getByText('Dagobah')).toBeInTheDocument();
    expect(getByText('Hoth')).toBeInTheDocument();

    fireEvent.change(inputPlanet, { target: { value: 'hh' } });
    expect(queryByTestId(/planets-name/i)).toBeNull();

    fireEvent.change(inputPlanet, { target: { value: '' } });
    expect(queryAllByTestId(/planets-name/i).length).toBe(10);
  });
});

describe('Testando ordem Ascendente e Descendente', () => {
  afterEach(cleanup);

  test('column name with initial ascending and descending order', async () => {
    const { getByText, queryAllByTestId } = render(<Provider><App /></Provider>);

    await waitForDomChange();

    const PlanetasAsc = queryAllByTestId(/planets-name/i);
    expect(PlanetasAsc[0].innerHTML).toBe('Alderaan');
    expect(PlanetasAsc[1].innerHTML).toBe('Bespin');
    expect(PlanetasAsc[2].innerHTML).toBe('Coruscant');
    expect(PlanetasAsc[3].innerHTML).toBe('Dagobah');
    expect(PlanetasAsc[4].innerHTML).toBe('Endor');
    expect(PlanetasAsc[5].innerHTML).toBe('Geonosis');
    expect(PlanetasAsc[6].innerHTML).toBe('Hoth');
    expect(PlanetasAsc[7].innerHTML).toBe('Kamino');
    expect(PlanetasAsc[8].innerHTML).toBe('Naboo');
    expect(PlanetasAsc[9].innerHTML).toBe('Yavin IV');

    fireEvent.click(getByText(/name/i));

    const planetasDesc = queryAllByTestId(/planets-name/i);
    expect(planetasDesc[9].innerHTML).toBe('Alderaan');
    expect(planetasDesc[8].innerHTML).toBe('Bespin');
    expect(planetasDesc[7].innerHTML).toBe('Coruscant');
    expect(planetasDesc[6].innerHTML).toBe('Dagobah');
    expect(planetasDesc[5].innerHTML).toBe('Endor');
    expect(planetasDesc[4].innerHTML).toBe('Geonosis');
    expect(planetasDesc[3].innerHTML).toBe('Hoth');
    expect(planetasDesc[2].innerHTML).toBe('Kamino');
    expect(planetasDesc[1].innerHTML).toBe('Naboo');
    expect(planetasDesc[0].innerHTML).toBe('Yavin IV');
  });
});

test('Testando o Ascendente e Descendente', async () => {
  afterEach(cleanup);

  const { getByText, queryAllByTestId } = render(<Provider><App /></Provider>);
  await waitForDomChange();

  const sortPopulation = getByText(/population/i);
  const sortSurfaceWater = getByText(/surface_water/i);

  fireEvent.click(sortPopulation);
  const populationDesc = queryAllByTestId(/population/i);
  expect(populationDesc[0].innerHTML).toBe('unknown');
  expect(populationDesc[9].innerHTML).toBe('1000');

  fireEvent.click(sortPopulation);
  const populationAsc = queryAllByTestId(/population/i);
  expect(populationAsc[9].innerHTML).toBe('unknown');
  expect(populationAsc[0].innerHTML).toBe('1000');

  fireEvent.click(sortSurfaceWater);
  const surfaceWaterDesc = queryAllByTestId(/surface-water/i);
  expect(surfaceWaterDesc[0].innerHTML).toBe('unknown');
  expect(surfaceWaterDesc[9].innerHTML).toBe('0');

  fireEvent.click(sortSurfaceWater);
  const surfaceWaterAsc = queryAllByTestId(/surface-water/i);
  expect(surfaceWaterAsc[9].innerHTML).toBe('unknown');
  expect(surfaceWaterAsc[0].innerHTML).toBe('0');
});

test('Filtragem por números', async () => {
  const {
    getByText,
    getByTestId,
    queryByPlaceholderText,
    queryAllByTestId,
  } = render(<Provider><App /></Provider>);

  await waitForDomChange();

  const selectColumn = getByTestId(/filter-column/i);
  const selectComparison = getByTestId(/filter-comparison/i);

  fireEvent.change(selectColumn, { target: { value: 'population' } });
  fireEvent.change(selectComparison, { target: { value: 'less-than' } });

  const inputValue = queryByPlaceholderText(/Insira o número/i);
  fireEvent.change(inputValue, { target: { value: 6500000 } });

  const Filtrar = getByText(/Adicionar Filtro/i);
  expect(Filtrar).toBeInTheDocument();

  fireEvent.click(Filtrar);
  expect(getByText('Bespin')).toBeInTheDocument();
  expect(getByText('Yavin IV')).toBeInTheDocument();
  expect(queryAllByTestId(/planets-name/i).length).toBe(2);

  const filtrosAtivos = getByText(/population | less-than | 6500000/i);
  expect(filtrosAtivos).toBeInTheDocument();

  fireEvent.change(selectColumn, { target: { value: 'diameter' } });
  fireEvent.change(selectComparison, { target: { value: 'equal-to' } });
  fireEvent.change(inputValue, { target: { value: 118000 } });

  expect(getByText('Bespin')).toBeInTheDocument();

  const excludeFilter = queryAllByTestId(/exclude-filter/i);
  fireEvent.click(excludeFilter[0]);
  expect(queryAllByTestId(/planets-name/i).length).toBe(10);

  fireEvent.change(selectColumn, { target: { value: 'rotation_period' } });
  fireEvent.click(Filtrar);

  fireEvent.change(selectColumn, { target: { value: 'orbital_period' } });
  fireEvent.click(Filtrar);

  fireEvent.change(selectColumn, { target: { value: 'population' } });
  fireEvent.click(Filtrar);

  fireEvent.change(selectColumn, { target: { value: 'diameter' } });
  fireEvent.click(Filtrar);

  fireEvent.change(selectColumn, { target: { value: 'surface_water' } });
  fireEvent.click(Filtrar);
  expect(getByText(/Todos os Filtros já foram selecionados/i)).toBeInTheDocument();
});
