import React, { useContext } from 'react';
import { StarWarsContext } from '../context/StarWarsContext';

const SelectOfComparison = () => {
  const { setFilter, filter } = useContext(StarWarsContext);
  return (
    <select
      name="comparison"
      value={filter.comparison}
      onChange={(e) => setFilter({ comparison: e.target.value })}
      required
    >
      <option value="" disabled>
        SELECIONE
      </option>
      <option value="bigger">MAIOR QUE</option>
      <option value="smaller">MENOR QUE</option>
      <option value="equal">IGUAL Á</option>
    </select>
  );
};
export default SelectOfComparison