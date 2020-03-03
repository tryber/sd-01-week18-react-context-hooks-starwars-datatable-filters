import React, { useContext, useEffect } from 'react';
import FilterName from './FilterName';
import '../css/Table.css';
import {
  textColumns,
  creatorOfaTable,
  //comparisonCase,
} from '../service/functions';
import { StarWarsContext } from '../context/StarWarsContext';


export default function Table() {
  const {
    resultAPI, starWarsAPI, filter,
  } = useContext(StarWarsContext);
console.log('o que é isso? → ', filter);
  useEffect(() => {
    starWarsAPI();
  }, []);

  const dataResults = resultAPI.data.results ? resultAPI.data.results : []

  const teste = () => 
   ( <h1>
    teste
    {/* {dataResults && <Filter /> } */}
  </h1>)
  
  
  if (resultAPI.isFetching) {
    return <h1>LOADING...</h1>;
  }

  

  if (filter.name) {
    const dateFilter = dataResults.filter((planet) => planet.name.toUpperCase().includes(filter.name.toUpperCase()));
    teste()
    return creatorOfaTable(textColumns, dateFilter);
  }
  // if (filter.isFilter && filter) {
  //   const datafilter = comparisonCase(dataResults, filter);

  //   return creatorOfaTable(textColumns, datafilter);
  // }

  return creatorOfaTable(textColumns, dataResults);
}
