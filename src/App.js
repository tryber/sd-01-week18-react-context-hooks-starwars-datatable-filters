import React from 'react';
import BaseTable from './components/Table';
import {Provider} from './context/StarWarsContext';
import './App.css';

function App() {
  return (
    <Provider>
      <BaseTable />
    </Provider>
  );
}

export default App;
