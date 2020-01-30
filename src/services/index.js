import React, { useState } from 'react';

const initialValue = {
  data: [],
  isFetching: true,
  sucess: false,
};
const [initialData, setInitialData] = useState(initialValue);
function starWarsAPI() {
  fetch(`${API}`)
    .then((data) => data.json())
    .then((response) => setInitialData({ data: response, isFetching: false, sucess: true }))
    .catch((error) => alert(error));
}
const context = { initialData, starWarsAPI };

export default getStarWarsPlanets;
