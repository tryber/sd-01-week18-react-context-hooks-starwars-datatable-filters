const SWAPI = "https://swapi.co/api/planets"

const getSWAPI = () => {
  fetch(SWAPI)
    .then((data) => data.json())
    .then((response) => response)
    .catch((error) => alert(error));
};

export default getSWAPI;
