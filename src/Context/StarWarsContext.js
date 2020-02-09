import React, {createContext, useState} from 'react';

export const StarWarsContext = createContext();

export const StarWarsContext = ({ children }) => {
  const [data, setData] = useState({ planets: [], sucess: false });

  const fetchStarWars = () => {
    if (data.sucess) return;
    getSWAPI()
    .then((value) => {
      setData({ planets: value.results, sucess: true });
    })
  }

  const context {
    data,
    setData,
  };

  return (
    <StarWarsContext.Provider value={context}>
      {children}
    </StarWarsContext.Provider>
  )
}
