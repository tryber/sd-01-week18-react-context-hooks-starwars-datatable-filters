import React from 'react';
import './App.css';
import StarWarsProvider from './Context/StarWarsContext';
import Table from './Components/Table';

function App() {
  return (
    <StarWarsProvider>
      <Table />
    </StarWarsProvider>
  );
}

export default App;
