const SWAPI = 'https://swapi.co/api/planets';

const getSWAPI = () => {
  return fetch(SWAPI)
    .then((data) => data.json())
    .then((response) => response)
    .catch((error) => alert(error));
};

export default getSWAPI;
