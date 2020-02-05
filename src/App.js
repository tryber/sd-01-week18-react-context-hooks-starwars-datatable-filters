import React from 'react';

import { Provider } from './context/StarWarsContext';
import Table from './components/Table';
import FilterByName from './components/FilterByName';

import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Provider>
          <Table />
          <FilterByName />
        </Provider>
      </header>
    </div>
  );
}

export default App;
