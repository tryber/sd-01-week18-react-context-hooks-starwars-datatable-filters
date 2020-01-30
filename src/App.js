import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import Store from './store';
import TextInput from './components/TextInput';
import ValuesInput from './components/ValuesInput';
import Filters from './components/Filters';
import Table from './components/Table';

function App() {
  return (
    <div>
      <Provider store={Store}>
        <Filters />
        <ValuesInput />
        <TextInput />
        <Table />
      </Provider>
    </div>
  );
}

export default App;
