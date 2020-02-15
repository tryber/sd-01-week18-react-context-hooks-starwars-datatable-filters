import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const ReciperContext = createContext();

const ReciperProvider = ({ children }) => {
  const [database, setDatabase] = useState({
    data: null, isFetch: false, planets: null, categories: [],
  });

  const context = {
    database,
    setDatabase,
  };

  return (
    <ReciperContext.Provider value={context}>
      {children}
    </ReciperContext.Provider>
  );
};
export { ReciperContext, ReciperProvider as Provider };

ReciperProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
