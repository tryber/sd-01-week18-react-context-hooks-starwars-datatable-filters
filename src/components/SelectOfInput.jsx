import React, { useContext } from 'react';
import { StarWarsContext } from '../context/StarWarsContext';

const SelectOfInput = () => {
  const { setValue } = useContext(StarWarsContext);
  return (
    <input
      type="number"
      placeholder="Filtrar por Valor"
      data-testid="SelectOfInput"
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default SelectOfInput;
