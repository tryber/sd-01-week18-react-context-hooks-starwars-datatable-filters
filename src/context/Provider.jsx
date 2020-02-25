import React, { useState } from 'react';
import PropTypes from 'prop-types';
import context from './StarWarsContext';

const Provider = ({ children }) => {
  const [tablePlanets, setTablePlanets] = useState();

  const storeContext = {
    tablePlanets,
    setTablePlanets,
  };

  return <context.Provider value={storeContext}>{children}</context.Provider>;
};

export default Provider;

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
