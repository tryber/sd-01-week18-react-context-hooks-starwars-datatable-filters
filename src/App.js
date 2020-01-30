import React from 'react';
import getStarWarsPlanets from './services/index';
import './App.css';

function App() {
  return (
    <div>{getStarWarsPlanets()}</div>
  );
}

export default App;
