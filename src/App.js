import React from 'react';

import { Provider } from './context/StarWarsContext';
import Table from './components/Table';
import FilterByName from './components/FormsFilterByName';
import FilterByNumber from './components/FormsFilterByNumber';
import FilterPlanetsByName from './components/Filter';

import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Provider>
          <FilterByName />
          <FilterByNumber />
          <FilterPlanetsByName />
          <Table />
        </Provider>
      </header>
    </div>
  );
}

export default App;
