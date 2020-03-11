import React from 'react';
import './App.css';
import Table from './components/Table';
import { Provider } from './context/StarWarsContext';

const componentMajor = (
  <div className="conteiner">
    <Provider>
      <Table />
    </Provider>
  </div>
);

const App = () => componentMajor;

export default App;
