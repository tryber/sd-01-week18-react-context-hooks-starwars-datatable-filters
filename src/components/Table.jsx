import React, { useContext } from 'react';
import { tablePrincipal, filterForName, filterForNumber } from '../service/functions';
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
  // console.log('aqui tem coragem ', sortColumns);
  const planetsFiltered = filterName ? filterForName(data, filterName) : data;
  // if (data) return <Loading />;
  const filterNumber = filterForNumber(planetsFiltered, filters);
  // const sortedPlanets = changeColumnOrder(filterNumber, column, order);
  return (
    <div>
      <HeaderOfStart />
      <br/>
      <OrderTable/>
      <br/>
      <FilterName />
      <section>
        <FilterAll />
        <div>{data && tablePrincipal(filterNumber)}</div>
      </section>
    </div>
  );
}
