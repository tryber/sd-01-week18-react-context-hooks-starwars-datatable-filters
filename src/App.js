import React from 'react';
import { Provider } from './context';
import FilterText from './components/FilterText';
import FilterNum from './components/FilterNum';
import Table from './components/Table';
import ShortTable from './components/ShortTable';

const App = () => (
  <div>
    <Provider>
      <FilterText />
      <ShortTable />
      <FilterNum />
      <Table />
    </Provider>
  </div>
);


export default App;
