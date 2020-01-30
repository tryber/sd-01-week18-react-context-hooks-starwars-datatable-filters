import React from 'react';
import './App.css';
import Table from './components/Table';
import Provider from './context/StarWarsContext';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Provider>
          <Table />
        </Provider>
      </header>
    </div>
  );
}

export default App;
