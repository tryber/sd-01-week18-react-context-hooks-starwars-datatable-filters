import React, { createContext, useState, useEffect } from 'react';

import getPlanets from '../services/StarWarsApi';

const StarWarsContext = createContext();

const StarWarsProvider = ({ children }) => {
  const [getApiStarWars, setGetApiStarWars] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    getPlanets().then((planets) => setGetApiStarWars(planets));
    setIsFetching(true);
  }, []);

  const context = { getApiStarWars, isFetching };

  return (
    <StarWarsContext.Provider value={context}>
      {children}
    </StarWarsContext.Provider>
  );
};

StarWarsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { StarWarsContext, StarWarsProvider as Provider };

