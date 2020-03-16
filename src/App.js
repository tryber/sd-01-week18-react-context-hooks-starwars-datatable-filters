import React from 'react';
import { Provider } from './context/StarWarsContext';

import Table from './components/Table';
import FilterByName from './components/FormsFilterByName';
import Filters from './components/Filters';

import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h3>Filtros</h3>
        <Provider>
          <FilterByName />
          <Filters />
          <Table />
        </Provider>
      </header>
    </div>
  );
}

export default App;
