import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const StarWarsContext = createContext();

const StarWarsProvider = ({ children }) => {
  const [resultAPI, setResultAPI] = useState({ data: [], isFetching: true, sucess: false });
  const [filter, setFilter] = useState([
    {
      column: '',
      comparison: '',
      value: '',
      name: '',
    },
  ]);

  const starWarsAPI = () => {
    fetch('https://swapi.co/api/planets/')
      .then((data) => data.json())
      .then((response) => setResultAPI({ data: response, isFetching: false, sucess: true }))
      .catch((error) => console.log(`Sorry, this is bad →→→ ${error} ←←←`));
  };

  const context = {
    resultAPI,
    filter,
    setFilter,
    starWarsAPI,
  };
  
  return <StarWarsContext.Provider value={context}>{children}</StarWarsContext.Provider>;
};

StarWarsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export { StarWarsContext, StarWarsProvider as Provider };
