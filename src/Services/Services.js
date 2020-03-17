const SWAPI = 'https://swapi.co/api/planets';

function getSWAPI() {
  return fetch(SWAPI)
    .then((res) => res.json());
}

export default getSWAPI;
