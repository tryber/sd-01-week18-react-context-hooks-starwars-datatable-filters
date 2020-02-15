import React, { useState, useContext, useEffect } from 'react';
import { ReciperContext } from '../context';
import { shortingData } from '../services';

const ShortTable = () => {
  const { database, setDatabase } = useContext(ReciperContext);

  const [shortOrder, setShortOrder] = useState({ column: 'name', order: 'ASC' });

  useEffect(() => {
    database.planets &&
      setDatabase({ ...database, planets: shortingData(database.planets, shortOrder) })
  }, []);

  useEffect(() => {
    database.planets &&
      setDatabase({ ...database, planets: shortingData(database.planets, shortOrder) })
  }, [shortOrder]);

  return (
    <div>
      <h2>Short Table</h2>
      <select key="order" onClick={(e) => setShortOrder({ ...shortOrder, column: e.target.value })}>
        {database.categories.map((EachCategory) =>
          <option key={EachCategory} value={EachCategory} >{EachCategory}</option>)}
      </select>
      <div>
        <div>
          <input
            type="radio" id="ASC" name="order" value="ASC"
            onClick={(e) => setShortOrder({ ...shortOrder, order: e.target.value })}
          />
          <label htmlFor="ASC">Upward que</label>
        </div>
        <div>
          <input
            type="radio" id="DESC" name="order" value="DESC"
            onClick={(e) => setShortOrder({ ...shortOrder, order: e.target.value })}
          />
          <label htmlFor="DESC">Downward</label>
        </div>
      </div>
    </div>
  );
};

export default ShortTable;
