import React, { useContext } from 'react';
import { StarWarsContext } from '../context/StarWarsContext';

const SelectOfColunm = () => {
  const { setFilterColunm, filterColunm } = useContext(StarWarsContext);
  return (
    <select
      name="column"
      value={filterColunm}
      onChange={(e) => setFilterColunm(e.target.value)}
      required
    >
      <option value="" disabled>
        Selecionar Opção
      </option>
      <option value="population">População</option>
      <option value="orbital_period">Duração Orbital</option>
      <option value="diameter">Diâmetro</option>
      <option value="rotation_period">Duração da Rotação</option>
      <option value="surface_water">Superfície da Água</option>
    </select>
  );
};

export default SelectOfColunm;
