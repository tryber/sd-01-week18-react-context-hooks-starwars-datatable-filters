import React, { useContext, useEffect } from 'react';
import { textColumns, creatorOfaTable, comparisonCase } from '../service/functions';
import { StarWarsContext } from '../context/StarWarsContext';
import '../css/Table.css';

export default function Table() {
  const {
    resultAPI, starWarsAPI, filters, filtername,
  } = useContext(StarWarsContext);

  useEffect(() => {
    starWarsAPI();
  }, []);

  const dataResults = resultAPI.data.results ? resultAPI.data.results : [];

  if (resultAPI.isFetching) {
    return <h1>LOADING...</h1>;
  }

  if (filtername) {
    const dateFilter = dataResults.filter((planet) => planet.name.toUpperCase().includes(filtername.toUpperCase()));
    return creatorOfaTable(textColumns, dateFilter);
  }
  

  if (filters.length !== 0) {
    const datafilter = comparisonCase(dataResults, filters);
    return creatorOfaTable(textColumns, datafilter);
  }

  return creatorOfaTable(textColumns, dataResults);
}
