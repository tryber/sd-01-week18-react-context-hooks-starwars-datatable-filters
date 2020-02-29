const STAR_WARS_API = 'https://swapi.co/api/planets/';

const getStarWarsPlanets = (action) => fetch(STAR_WARS_API)
  .then((response) => response.json())
  .then((data) => action(data.results));

export default getStarWarsPlanets;
