import axios from 'axios';

async function getPlanets() {
  const API = 'swapi.co/api/planets/';
  try {
    const responseAPI = await axios({
      url: `${API}`,
      method: 'GET',
    });
    return responseAPI;
  } catch (e) {
    console.log(e);
  }
}

export default getPlanets;
