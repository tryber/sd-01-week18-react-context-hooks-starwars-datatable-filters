const STARWARS_API = 'https://swapi.co/api/planets/';

const getStarWarsPlanets = (URL=STARWARS_API) => (
  fetch(URL)
    .then((response) => (
      response
        .json()
        .then((json) => (response.ok && Promise.resolve(json)))
    ))
);

export default getStarWarsPlanets;
