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

export async function getVehicles() {
  const response = await axios.get('/vehicles');
  return response.data;
}

export async function createVehicle(vehicle) {
  const response = await axios.post('/vehicles', vehicle);
  return response.data;
}

export async function saveVehicle(vehicle) {
  await axios.patch(`/vehicles/${vehicle.id}`, vehicle);
}

export async function deleteVehicle(vehicle) {
  await axios.delete(`/vehicles/${vehicle.id}`);
}

export async function getSellers() {
  const response = await axios.get('/sellers');
  return response.data;
}

export async function createSeller(seller) {
  const response = await axios.post('/sellers', seller);
  return response.data;
}

export async function saveSeller(seller) {
  await axios.patch(`/sellers/${seller.id}`, seller);
}

export async function deleteSeller(seller) {
  await axios.delete(`/sellers/${seller.id}`);
}

export async function getSales() {
  const response = await axios.get('/sales');
  return response.data;
}

export async function createSale(sale) {
  const response = await axios.post('/sales', sale);
  return response.data;
}

export async function login({ email, password }) {
  const response = await axios.post('/auth/login', { email, password });
  return response.data.token;
}
