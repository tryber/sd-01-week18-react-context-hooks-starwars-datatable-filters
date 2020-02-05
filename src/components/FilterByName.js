import React, { useContext } from 'react';
import { StarWarsContext } from '../context/StarWarsContext';

export default function Filter() {
  const { inputTextValue, setInputTextValue } = useContext(StarWarsContext);

  return (
    <div>
      <label htmlFor="input-text-value"> Filter by planet name:
        <input 
          type="text"
          id="input-text-value"
          value={inputTextValue}
          onChange={(event) => setInputTextValue(event.target.value.toLowerCase())}
        />
      </label>
    </div>
  );
}
