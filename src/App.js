import React from 'react';

import FilterText from './components/FilterText';
import FilterNum from './components/FilterNum';
import Table from './components/Table';
import DisplayFilterNum from './components/DisplayFilterNum';
import ShortTable from './components/ShortTable';

const App = () => {
  return (
    <div>
      <FilterText />
      <ShortTable />
      <FilterNum />
      <Table />
    </div>
  );
}

export default App;
