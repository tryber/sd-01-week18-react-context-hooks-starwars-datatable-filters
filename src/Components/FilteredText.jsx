import React, { useContext } from 'react';
import StarWarsContext from '../Context/StarWarsContext';

const FilteredText = () => {
  const { setfilterText } = useContext(StarWarsContext);

  return (
    <div>
      <input
        type="text"
        onChange={(e) => setfilterText(e.target.value)}
        placeholder="Pesquise aqui"
      />
    </div>
  );

};

export default FilteredText;
