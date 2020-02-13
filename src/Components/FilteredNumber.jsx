import React, { useContext, useEffect } from 'react';
import StarWarsContext from '../Context/StarWarsContext';


// const selectOfTag = (data, select) => {
//   console.log(data.map((planets) => {
//     return Object.entries(planets).map((value) => {
//       return value.filter((tag) => {
//         return tag === select;
//       });
//     });
//   }));
// };

const FilteredNumber = () => {
  const { setSelect, fetchStarWars } = useContext(StarWarsContext);
  fetchStarWars();

  // useEffect(() => {
  //   selectOfTag(data.planets, select);
  // }, [select]);

  return (
    <div>
      <select onChange={(e) => setSelect(e.target.value)}>
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      {/* <div>
        <input
          data-testid="radio-comparison-maior"
          type="radio"
          checked={value === 'Maior que'}
          name="comparison"
          value="Maior que"
          onClick={(e) => changeComparison(e.target.value)}
        />
        Maior que
        <input
          data-testid="radio-comparison-menor"
          type="radio"
          checked={value === 'Menor que'}
          name="comparison"
          value="Menor que"
          onClick={(e) => changeComparison(e.target.value)}
        />
        Menor que
        <input
          data-testid="radio-comparison-igual"
          type="radio"
          checked={value === 'Igual a'}
          name="comparison"
          value="Igual a"
          onClick={(e) => changeComparison(e.target.value)}
        />
        Igual a
      </div> */}
    </div>
  );
};

export default FilteredNumber;
