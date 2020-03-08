import React, { useContext } from 'react';
import { StarWarsContext } from '../context/StarWarsContext';

const SelectOfComparison = () => {
  const { setFilterComparison, filterComparison } = useContext(StarWarsContext);
  return (
    <select
      name="comparison"
      value={filterComparison}
      onChange={(e) => setFilterComparison(e.target.value)}
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

export default SelectOfComparison;
