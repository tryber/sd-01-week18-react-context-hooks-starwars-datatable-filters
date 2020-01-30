import React, { useState } from 'react';
import PropTypes from 'prop-types';
import storeContext from './context';

function Provider({ children }) {
  const initialValue = {
    data: [],
    isFetching: true,
    sucess: false,
  };

  const [initialData, setInitialData] = useState(initialValue);

  function starWarsAPI() {
    fetch('https://swapi.co/api/planets/')
      .then((data) => data.json())
      .then((response) => setInitialData({ data: response, isFetching: false, sucess: true }))
      .catch((error) => alert(error));
  }

  const context = { initialData, starWarsAPI };
  return <storeContext.Provider value={context}>{children}</storeContext.Provider>;
}

Provider.propTypes = {
  children: PropTypes.arrayOf.isRequired,
};

export default Provider;
