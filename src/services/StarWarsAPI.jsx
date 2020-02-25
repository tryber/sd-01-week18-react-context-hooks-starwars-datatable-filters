const STARWARS_API = 'https://swapi.co/api/planets/';

const getStarWarsPlanets = (action) => (
  fetch(STARWARS_API)
    .then((response) => (response.json()
      .then((data) => action(data.results))
    ))
);

export default getStarWarsPlanets;
