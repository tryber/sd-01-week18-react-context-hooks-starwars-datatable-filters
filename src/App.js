import React from 'react';
import './App.css';
import Table from './components/Table';
import FilterName from'./components/FilterName';
import FilterSelect from'./components/FilterSelect';
import { Provider } from './context/StarWarsContext';

const componentMajor = (
  <div className="conteiner">
    <Provider>
      <FilterName />;
      <FilterSelect />;
      <Table />
    </Provider>
  </div>
);

const App = () => componentMajor;


export default App;
