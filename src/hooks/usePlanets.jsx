import { useEffect, useState, useContext } from 'react';
import { fetchingPlanets, shortingData } from '../services';
import { ReciperContext } from '../context';

const fetchPlanets = async (callback) => {
  const data = await fetchingPlanets();
  callback(data);
}

const usePlanets = () => {
  const [planets, setPlanets] = useState(null);

  const { database, setDatabase } = useContext(ReciperContext);

  useEffect(() => {
    fetchPlanets(setPlanets);
  }, []);

  useEffect(() => {
    if (planets) {
      const categories = Object.keys(planets.results[0]).filter((category) => category !== 'residents');
      setDatabase({ ...database, data: shortingData(planets.results, { column: 'name', order: 'ASC' }), planets: shortingData(planets.results, { column: 'name', order: 'ASC' }), categories });
    }
  }, [planets]);

};

export default usePlanets;
