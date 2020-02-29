import React, { useState } from 'react';
import PropTypes from 'prop-types';
import context from './context';

const Provider = ({ children }) => {
  const [data, setData] = useState();
  const [filters, setFilters] = useState({ name: '', column: 'name', order: 'ASC' });
  // const [sort, setSort] = useState('ASC');

  const storeContext = {
    data,
    setData,
    filters,
    setFilters,
    // sort,
    // setSort,
  };

  return <context.Provider value={storeContext}>{children}</context.Provider>;
};

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
