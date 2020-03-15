import React from 'react';
import {
  render, waitForDomChange, fireEvent, cleanup, getRoles,
} from '@testing-library/react';
import App from './App';
import { Provider } from './context/StarWarsContext';
import Loading from './components/Loading';

const clear = () => afterEach(() => cleanup());

describe('Test inicial para ver o jest funcionando', () => {
  test('O componente App tem qu renderizar com o texto "LOADING"', () => {
    const { getByText } = render(<Loading />);
    const linkElement = getByText(/LOADING/i);
    expect(linkElement).toBeInTheDocument();
    clear();
  });
});

describe('Começando os testes', () => {
  clear();
  test('Verificando se o table ta renderizado', () => {
    const { getByText, queryByText } = render(
      <Provider>
        <App />
      </Provider>,
    );
    
    expect(getByText(/Escolha para ordenar/i)).toBeInTheDocument();
    expect(getByText(/Ordem Crescente/i)).toBeInTheDocument();
    expect(getByText(/Ordem Decrescente/i)).toBeInTheDocument();
    expect(getByText(/Enviar Filtro/i)).toBeInTheDocument();
    expect(queryByText(/Adicionar Filtro/i)).not.toBeInTheDocument();
    clear();
  });
});

describe('Vê se tem a table com os valores lá', () => {
  clear();
  test('Verificar se tem todas as th e td no table', async () => {
    const { queryAllByTestId, queryByText } = render(
      <Provider>
        <App />
      </Provider>,
    );
    await waitForDomChange();
    expect(queryByText(/StarWars Datatable with Filters/i)).toBeInTheDocument();
    expect(queryAllByTestId('tagsTD').length).toBe(130);
    expect(queryAllByTestId('tagsTH').length).toBe(13);
    clear();
  });
});

describe('Verificando se a table tá com os nomes lá', () => {
  clear();
  test('Verificar Geonosis, Hoth, Kamino', async () => {
    const { getByText } = render(
      <Provider>
        <App />
      </Provider>,
    );
    await waitForDomChange();
    expect(getByText(/Geonosis/i)).toBeInTheDocument();
    expect(getByText(/Hoth/i)).toBeInTheDocument();
    expect(getByText(/Kamino/i)).toBeInTheDocument();
    clear();
  });
});

describe('Input de tex', () => {
  clear();
  test('Colocando o texto Be para ver se retorna o Bespin', async () => {
    const {
      getByTestId, queryAllByTestId, getByText, queryByText,
    } = render(
      <Provider>
        <App />
      </Provider>,
    );
    await waitForDomChange();
    
    fireEvent.change(getByTestId('planet-name-input'), { target: { value: 'Be' } });
    expect(queryByText(/Alderaan/i)).not.toBeInTheDocument();
    expect(getByText(/Bespin/i)).toBeInTheDocument();
    expect(queryAllByTestId('tagsTD').length).toBe(13);
    expect(queryAllByTestId('tagsTH').length).toBe(13);
    clear();
  });
});

describe('Teste de filtro', () => {
  clear();
  test('filtro polpulação, maior que, 1000', async () => {
    const {
      getByTestId, queryAllByTestId, queryByText, getByText,
    } = render(
      <Provider>
        <App />
      </Provider>,
    );
    await waitForDomChange();
    
    expect(queryByText(/Adicionar Filtro/i)).not.toBeInTheDocument();

    fireEvent.change(getByTestId('SelectOfColunm'), { target: { value: 'population' } });
    fireEvent.change(getByTestId('SelectOfComparison'), { target: { value: 'bigger' } });

    fireEvent.change(getByTestId('SelectOfInput'), { target: { value: '1000' } });

    expect(queryByText(/Adicionar Filtro/i)).toBeInTheDocument();

    fireEvent.click(getByText(/Adicionar Filtro/i));

    expect(queryByText(/Alderaan/i)).toBeInTheDocument();
    expect(queryByText(/Kamino/i)).toBeInTheDocument();
    expect(queryByText(/Hoth/i)).not.toBeInTheDocument();

    expect(queryByText(/population | bigger | 1000/i)).toBeInTheDocument();
    expect(queryByText(/X/i)).toBeInTheDocument();

    expect(queryAllByTestId('tagsTD').length).toBe(91);
    expect(queryAllByTestId('tagsTH').length).toBe(13);

    clear();
  });
});

describe('Testando multiplos filtros', () => {
  clear();
  test(`filtro polpulação, maior que, 10000 
  mais o filtro SUPERFÍCIE DE ÁGUA, menor que 1000 
  alem do filtro diametro, menor que, 1130`, async () => {
    const { getByTestId, queryByText, getByText } = render(
      <Provider>
        <App />
      </Provider>,
    );
    await waitForDomChange();

    fireEvent.change(getByTestId('SelectOfColunm'), { target: { value: 'population' } });
    fireEvent.change(getByTestId('SelectOfComparison'), { target: { value: 'bigger' } });
    fireEvent.change(getByTestId('SelectOfInput'), { target: { value: '10000' } });
    fireEvent.click(getByText(/Adicionar Filtro/i));

    fireEvent.change(getByTestId('SelectOfColunm'), { target: { value: 'surface_water' } });
    fireEvent.change(getByTestId('SelectOfComparison'), { target: { value: 'less' } });
    fireEvent.change(getByTestId('SelectOfInput'), { target: { value: '1000' } });
    fireEvent.click(getByText(/Adicionar Filtro/i));

    fireEvent.change(getByTestId('SelectOfColunm'), { target: { value: 'diameter' } });
    fireEvent.change(getByTestId('SelectOfComparison'), { target: { value: 'less' } });
    fireEvent.change(getByTestId('SelectOfInput'), { target: { value: '11370' } });
    fireEvent.click(getByText(/Adicionar Filtro/i));

    expect(queryByText(/Endor/i)).toBeInTheDocument();
    expect(queryByText(/temperate/i)).toBeInTheDocument();
    expect(queryByText(/forests, mountains, lakes/i)).toBeInTheDocument();

    clear();
  });
});

describe('Testando se dá para tirar os filtros', () => {
  clear();
  test('Clicando no x apos ter algum filtro já selecionado', async () => {
    const { getByTestId, queryByText, getByText } = render(
      <Provider>
        <App />
      </Provider>,
    );
    await waitForDomChange();

    fireEvent.change(getByTestId('SelectOfColunm'), { target: { value: 'surface_water' } });
    fireEvent.change(getByTestId('SelectOfComparison'), { target: { value: 'equal' } });
    fireEvent.change(getByTestId('SelectOfInput'), { target: { value: '40' } });
    fireEvent.click(getByText(/Adicionar Filtro/i));

    expect(queryByText(/X/i)).toBeInTheDocument();

    expect(queryByText(/2000000000/i)).toBeInTheDocument();
    expect(queryByText(/surface_water | equal | 40/i)).toBeInTheDocument();
    expect(queryByText(/Endor/i)).not.toBeInTheDocument();

    fireEvent.click(getByText(/X/i));

    expect(queryByText(/X/i)).not.toBeInTheDocument();

    expect(queryByText(/surface_water | equal | 40/i)).not.toBeInTheDocument();
    expect(queryByText(/Endor/i)).toBeInTheDocument();

    clear();
  });
});

describe('Olhando agora a ordem', () => {
  afterEach(cleanup);

  test('Primeiro ascendente...', async () => {
    const { getByText, getByTestId } = render(
      <Provider>
        <App />
      </Provider>,
    );
    await waitForDomChange();
    const planetsName = [
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

    fireEvent.change(getByTestId('order-select'), { target: { value: 'name' } });

    fireEvent.click(getByText(/Enviar Filtro/i));

    for (let i = 0; i < planetsName.length; i += 1) {
      const answer = planetsName[i];
      expect(getByTestId(`${i}`).children[0].innerHTML).toBe(answer);
    }
  });

  test('Agora, descendente... ', async () => {
    const { getByText, getByTestId } = render(
      <Provider>
        <App />
      </Provider>,
    );
    await waitForDomChange();
    const planetsName = [
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
    const planetsNameReverse = planetsName.reverse();

    const radio = getByTestId('order-radio');

    fireEvent.click(radio, { target: { value: 'DESC' } });

    expect(radio.value).toBe('DESC');

    fireEvent.click(getByText(/Enviar Filtro/i));

    for (let i = 0; i < planetsNameReverse.length; i += 1) {
      const answer = planetsNameReverse[i];
      expect(getByTestId(`${i}`).children[0].innerHTML).toBe(answer);
    }
  });
});

describe('Testando agora se o input tá funcionado', () => {
  test('Testando clicks simultaneos ', async () => {
    const { getByTestId } = render(
      <Provider>
        <App />
      </Provider>,
    );
   

    const radio1 = getByTestId('order-radio');
    
    const radio2 = getByTestId('order-radio2');
    fireEvent.click(radio1, { target: { value: 'DESC' } });

    expect(radio1.value).toBe('DESC');

    fireEvent.click(radio2, { target: { value: 'ASC' } });

    expect(radio2.value).toBe('ASC');
  });
})
