import React, { useContext } from 'react';
import { tablePrincipal, filterForName, filterForNumber, ascOrDescAlphabeticalOrder } from '../service/functions';
import { StarWarsContext } from '../context/StarWarsContext';
import HeaderOfStart from './HeaderOfStart';
import Loading from './Loading';
import FilterAll from './FilterAll';
import FilterName from './FilterName';
import OrderTable from './OrderTable';

export default function Table() {
  const {
    data,
    sortColumns,
    filters,
    filterName,
  } = useContext(StarWarsContext);
    
  const planetsFiltered = filterName ? filterForName(data, filterName) : data;
  
  const filterNumber = filterForNumber(planetsFiltered, filters);
  const sortedPlanets = ascOrDescAlphabeticalOrder(filterNumber, sortColumns.order, sortColumns.column, data);
  
  return (
    <div>
      <HeaderOfStart />
      <br/>
      <OrderTable/>
      <br/>
      <FilterName />
      <section>
        <FilterAll />
        <div>{data && tablePrincipal(sortedPlanets)}</div>
      </section>
    </div>
  );
}
