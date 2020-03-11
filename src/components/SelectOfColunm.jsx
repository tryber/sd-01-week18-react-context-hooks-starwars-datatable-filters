import React, { useContext } from 'react';
import { StarWarsContext } from '../context/StarWarsContext';
import { selectIsTrueOrFalse } from '../service/functions';

const SelectOfColunm = () => {
  const { setColumn, filters } = useContext(StarWarsContext);
  return (
    <select name="column" onChange={(e) => setColumn(e.target.value)}>
      <option value="">Selecionar Opção</option>
      {selectIsTrueOrFalse(filters, 'population') && <option value="population">População</option>}
      {selectIsTrueOrFalse(filters, 'orbital_period') && <option value="orbital_period">Duração Orbital</option>}
      {selectIsTrueOrFalse(filters, 'diameter') && <option value="diameter">Diâmetro</option>}
      {selectIsTrueOrFalse(filters, 'rotation_period') && <option value="rotation_period">Duração da Rotação</option>}
      {selectIsTrueOrFalse(filters, 'surface_water') && <option value="surface_water">Superfície da Água</option>}
    </select>
  );
};

export default SelectOfColunm;
