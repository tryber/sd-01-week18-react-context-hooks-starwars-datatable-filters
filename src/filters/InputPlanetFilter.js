import React, { useContext } from 'react';
import { StarWarsContext } from '../context/StarWarsContext';


const InputPlanetFilter = () => {
  const { data, setFilterData } = useContext(StarWarsContext);
  const filterData = (value) => {
    setFilterData(data.planets.map((planet) => {
      if (planet.name.includes(value)) {
        console.log(planet.name);
        return planet.name; // retornar a tabela aqui
      }
      return data;
    }));
  };
  return (
    <div>
      <label>
        Tell me, which planet?
        <input onChange={(e) => filterData(e.target.value)} />
      </label>
    </div>
  );
};

export default InputPlanetFilter;
