import React from 'react';
import './App.css';
import getSWAPI from './Services';

function App() {
  return (
    <div className="App">
      {getSWAPI().then((data) => console.log(data))}
    </div>
  );
}

export default App;
