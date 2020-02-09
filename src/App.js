import React from 'react';
import './App.css';
import getSWAPI from './Services/Services';

function App() {
  getSWAPI().then((data) => (data));
  return (
    <div>
      oi
    </div>
  );
}

export default App;
