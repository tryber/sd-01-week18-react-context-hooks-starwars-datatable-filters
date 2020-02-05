import React from 'react';
import BaseTable from './components/Table';
import InputPlanetFilter from './filters/InputPlanetFilter';
import Dropdown from './filters/Dropdown';
import { Provider } from './context/StarWarsContext';
import './App.css';

function App() {
  return (
    <Provider>
      <InputPlanetFilter />
      <Dropdown />
      <BaseTable />
    </Provider>
  );
}

export default App;
