import React, { useContext } from 'react';
import { StarWarsContext } from '../context/StarWarsContext';

export default function Filter() {
  const { inputTextValue, setInputTextValue } = useContext(StarWarsContext);

  return (
    <div>
      <label htmlFor="input-text-value"> Filtrar:
        <input id="input-text-value"
          type="text"
          value={inputTextValue}
          onChange={(event) => setInputTextValue(event.target.value)}
        />
      </label>
    </div>
  )
}
