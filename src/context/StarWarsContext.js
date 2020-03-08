import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const StarWarsContext = createContext();

const StarWarsProvider = ({ children }) => {
  const [resultAPI, setResultAPI] = useState({ data: [], isFetching: true, sucess: false });
  const [filterColunm, setFilterColunm] = useState('');
  const [filterComparison, setFilterComparison] = useState('');
  const [filtervalue, setFilterValue] = useState('');
  const [filtername, setFilterName] = useState('' );

  const [filters, setFilters] = useState([]);

  const starWarsAPI = () => {
    fetch('https://swapi.co/api/planets/')
      .then((data) => data.json())
      .then((response) => setResultAPI({ data: response, isFetching: false, sucess: true }))
      .catch((error) => alert(`Sorry, this is bad →→→ ${error} ←←←`));
  };

  const context = {
    filtername,
    setFilterName,
    filterColunm,
    setFilterColunm,
    filterComparison,
    setFilterComparison,
    filtervalue,
    setFilterValue,
    resultAPI,
    filters,
    setFilters,
    starWarsAPI,
  };

  return <StarWarsContext.Provider value={context}>{children}</StarWarsContext.Provider>;
};

StarWarsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export { StarWarsContext, StarWarsProvider as Provider };
