export const SW_BASE_API = 'https://swapi.co/api/planets/';

export const getPlanets = () => (
  fetch(SW_BASE_API)
    .then((response) => (
      response.json().then((json) => response && Promise.resolve(json))))
);
