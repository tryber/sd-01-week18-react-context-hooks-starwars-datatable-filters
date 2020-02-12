import { useContext } from "react";

import { StarWarsContext } from "../context/StarWarsContext";

function filterByPlanetName(data, filterPlanetName, setPlanetFiltered) {
  const nameFiltered = data.filter(({ name }) => name.toLowerCase().includes(filterPlanetName));
  return setPlanetFiltered(nameFiltered);
}

function Filters() {
  const { data, filterPlanetName, setPlanetFiltered } = useContext(StarWarsContext);

  if (filterPlanetName) {
    return filterByPlanetName(data, filterPlanetName, setPlanetFiltered)
  }
}

export default Filters;

// function findComparisons(data, filterNumberColumn, filterNumberComparison, filterNumberValue) {
//   switch (filterNumberComparison) {
//     case 'greater-than':
//       return data.filter(
//         (planet) => planet[filterNumberColumn] > Number(filterNumberValue) && planet[filterNumberColumn] !== 'unknown',
//       );
//     case 'less-than':
//       return data.filter(
//         (planet) => planet[filterNumberColumn] < Number(filterNumberValue) && planet[filterNumberColumn] !== 'unknown',
//       );
//     case 'equal-to':
//       return data.filter(
//         (planet) => planet[filterNumberColumn] === filterNumberValue && planet[filterNumberColumn] !== 'unknown'
//       );
//     default:
//       return false;
//   }
// }

// function Filters() {
//     const {data, filterPlanetName, setPlanetFiltered } = useContext(StarWarsContext);

//     const nameFiltered = data.filter(({ name }) => name.toLowerCase().includes(filterPlanetName)); 
//     return filterPlanetName ? setPlanetFiltered(nameFiltered) : setPlanetFiltered(data);
//   }

  // function filterByValue() {
  //   if ()
  // }

  // function Filters() {
  //   const {
  //     data,
  //     filters,
  //     filterPlanetName,
  //   } = useContext(StarWarsContext);

  //   const { column } = filters;
  //   console.log(column)
  //    FilterByName(data, filterPlanetName, filters)
  //   // return filterByValue()
  // }




