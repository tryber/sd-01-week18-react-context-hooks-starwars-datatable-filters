const StarWarsAPI = 'https://swapi.co/api/planets/';

const SWAPI = () => {
  fetch(`${StarWarsAPI}`)
    .then((response) => response.json()
      .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json))));
};

export default SWAPI;
