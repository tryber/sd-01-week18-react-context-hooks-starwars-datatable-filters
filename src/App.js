import React from 'react';
import './App.css';
import Table from './components/Table';
import { Provider } from './context/StarWarsContext';

const componentMajor = () => (
  <div className="conteiner">
    <Table />
  </div>
);

const App = () => <Provider>{componentMajor()}</Provider>;

export default App;
