import React, {
  createContext,
  useState,
  useEffect,
} from 'react';
import getSWAPI from '../Services/Services';

const StarWarsContext = createContext();

const StarWarsProvider = ({ children }) => {
  const [data, setData] = useState([{ planets: [], sucess: false }]);

  useEffect(() => {
    if (data.sucess) return;
    getSWAPI()
      .then((response) => {
        setData({ planets: response.results, sucess: true });
      });
  }, []);

  const context = {
    data,
    setData,
  };

  return (
    <StarWarsContext.Provider value={context}>
      {children}
    </StarWarsContext.Provider>
  );
};

export { StarWarsContext, StarWarsProvider as Provider };
