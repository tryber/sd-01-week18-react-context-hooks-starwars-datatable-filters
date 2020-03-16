const SWAPI = 'https://swapi.co/api/planets';

function getSWAPI() {
  return fetch(SWAPI)
    .then((res) => res.json())
    .catch((error) => alert(error));
}

export default getSWAPI;
