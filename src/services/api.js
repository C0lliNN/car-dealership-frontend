import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

axios.defaults.baseURL = BASE_URL;

export async function getHomeInformation() {
  let responses = await Promise.all([
    axios.get('/vehicles'),
    axios.get('/sales'),
    axios.get('/sellers')
  ]);

  responses = responses.map((r) => r.data);

  return {
    vehicles: responses[0].length,
    sales: responses[1].length,
    sellers: responses[2].length
  };
}
