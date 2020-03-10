import React, { useState, useContext, useEffect } from 'react';
import { ReciperContext } from '../context';
import { shortingData } from '../services';

const renderContent = (database, shortOrder, setShortOrder) => (
  <div>
    <h2>Short Table</h2>
    <select
      key="order" data-testid="short-dropdown"
      onClick={(e) => setShortOrder({ ...shortOrder, column: e.target.value })}
    >
      {database.categories.map((EachCategory) =>
        <option key={EachCategory} value={EachCategory} >{EachCategory}</option>)}
    </select>
    <div>
      <div>
        <input
          type="radio" id="ASC" name="order" value="ASC" data-testid="ASC-radio"
          onClick={(e) => setShortOrder({ ...shortOrder, order: e.target.value })}
        />
        <label htmlFor="ASC">Upward que</label>
      </div>
      <div>
        <input
          type="radio" id="DSC" name="order" value="DSC" data-testid="DSC-radio"
          onClick={(e) => setShortOrder({ ...shortOrder, order: e.target.value })}
        />
        <label htmlFor="DSC">Downward</label>
      </div>
    </div>
  </div>
);

const ShortTable = () => {
  const { database, setDatabase } = useContext(ReciperContext);
  const [shortOrder, setShortOrder] = useState({ column: 'name', order: 'ASC' });

  useEffect(() => {
    if (database.planets) {
      setDatabase({ ...database, planets: shortingData(database.planets, shortOrder) });
    }
  }, [shortOrder]);

  return renderContent(database, shortOrder, setShortOrder);
};

export default ShortTable;
