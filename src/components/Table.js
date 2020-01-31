import { useContext } from 'react';

import { StarWarsContext } from '../context/StarWarsContext';

const Planets = () => {
  const { APIResult } = useContext(StarWarsContext);
  return (
    console.log(APIResult)
   )
}

export default Planets;
