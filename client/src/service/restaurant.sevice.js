import api from "./api";

const RESTO_API = import.meta.env.VITE_RESTO_API;

const getAllRestaurants = () => {
  return axios.get(`${BASE_URL}/restaurants`);
};

const getRestaurantById = async (id) => {
  return await api.get(`${RESTO_API}/${id}`);
};

const editRestaurantById = async (id, data) => {
  return await api.put(`${RESTO_API}/${id}`, data);
};

const insertRestaurant = async (data) => {
  return await api.post(RESTO_API, data);
};

const deleteRestaurant = async (id) => {
  return await api.delete(`${RESTO_API}/${id}`);
};

export default {
  getAllRestaurants,
  getRestaurantById,
  editRestaurantById,
  insertRestaurant,
  deleteRestaurant,
};
