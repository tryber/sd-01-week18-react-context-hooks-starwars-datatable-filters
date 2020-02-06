const SWAPI = "https://swapi.co/api/planets"

const getSWAPI = () => {
  fetch(SWAPI)
    .then((data) => data.json())
    .then((response) => setData({ data: response, isFetching: false, sucess: true }))
    .catch((error) => alert(error));
}

export default getSWAPI;