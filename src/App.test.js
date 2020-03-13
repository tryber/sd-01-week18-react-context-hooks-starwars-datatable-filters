import React, { useContext } from 'react';
import { render, waitForDomChange, fireEvent, cleanup } from '@testing-library/react';
import App from './App';
import Provider from './context/StarWarsContext';
import Loading from './components/Loading';

const clear = () =>
  afterEach(function() {
    cleanup();
  });

describe('Test inicial para ver o jest funcionando', () => {
  test('O componente App tem qu renderizar com o texto "LOADING"', () => {
    const { getByText } = render(<Loading />);
    const linkElement = getByText(/LOADING/i);
    expect(linkElement).toBeInTheDocument();
  });
  clear();
});

describe('Começando os testes', () => {
  clear();
  it('Verificando se o table ta renderizado', () => {
    const { getByText } = render(
      <Provider>
        <App />
      </Provider>,
    );
    expect(getByText(/StarWars Datatable with Filters/i)).toBeInTheDocument();
  });
});
