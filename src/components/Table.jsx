import React, { useContext, useEffect } from 'react';
import FilterName from './FilterName';
import FilterSelect from './FilterSelect';
import {
  textColumns,
  creatorOfaTable,
  // comparisonCase,
} from '../service/functions';
import { StarWarsContext } from '../context/StarWarsContext';
import '../css/Table.css';

export default function Table() {
  const { resultAPI, starWarsAPI, filter, filtername } = useContext(StarWarsContext);
  // console.log('o que é isso? → ', filter);

  useEffect(() => {
    starWarsAPI();
  }, []);

  const dataResults = resultAPI.data.results ? resultAPI.data.results : [];

  if (resultAPI.isFetching) {
    return <h1>LOADING...</h1>;
  }

  if (filtername.name) {
    const dateFilter = dataResults.filter((planet) => planet.name.toUpperCase().includes(filtername.name.toUpperCase()));
    return creatorOfaTable(textColumns, dateFilter);
  }
  // if (filter.isFilter && filter) {
  //   const datafilter = comparisonCase(dataResults, filter);

  //   return creatorOfaTable(textColumns, datafilter);
  // }

  return creatorOfaTable(textColumns, dataResults);
}
