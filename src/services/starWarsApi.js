const STARWARS_API = 'https://swapi.co/api/planets/';

const getStarWarsPlanets = (fetch, URL = STARWARS_API) => (
  fetch(URL)
    .then((response) => response.json())
        .then((data) => data.results)
);

console.log(getStarWarsPlanets())
export default getStarWarsPlanets;
