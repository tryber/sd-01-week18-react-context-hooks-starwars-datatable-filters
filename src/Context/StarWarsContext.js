import React, {createContext, useState} from 'react';

export const StarWarsContext = createContext();

export const StarWarsProvider = ({ children }) => {
  const [data, setData] = useState([{ planets: [], sucess: false }]);

  useEffect(() => {
    if (data.sucess) return;
    getSWAPI()
    .then((response) => {
      setData({ planets: response.results, sucess: true });
    })
  }, [])

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
