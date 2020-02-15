import { useEffect, useState, useContext } from 'react';
import { ReciperContext } from '../context';
import { fetchingPlanets } from '../services';

const usePlanetsFilter = () => {
    const [planets, setPlanets] = useState(null);

    const { setDatabase } = useContext(ReciperContext);

    useEffect(async () => {
        const data = await fetchingPlanets();
        setPlanets(data);
    }, []);

    return planets;
};

export default usePlanetsFilter;
