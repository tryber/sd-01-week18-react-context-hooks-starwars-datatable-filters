const STAR_WARS_API = 'https://swapi.co/api/planets/';

const getStarWarsPlanets = () => fetch(STAR_WARS_API)
  .then((response) => response.json())
  .then((data) => data.results);

export default getStarWarsPlanets;
