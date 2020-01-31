const StarWarsAPI = 'https://swapi.co/api/planets/';

const getAPIinfo = () => {
  fetch(`${StarWarsAPI}`)
    .then((response) => response.json()
      .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json))));
};

export default getAPIinfo;
