import api from "./api";

const RESTO_API = import.meta.env.VITE_RESTO_API;

// GET all restaurants
const getAllRestaurants = async () => await api.get(`${RESTO_API}`);

// GET by ID
const getRestaurantById = async (id) => api.get(`${RESTO_API}/${id}`);

// UPDATE by ID
const editRestaurantById = async (id, restaurant) =>
  api.put(`${RESTO_API}/${id}`, restaurant);

// ADD new restaurant
const insertRestaurant = async (restaurant) =>
  api.post(`${RESTO_API}`, restaurant);

// DELETE by ID
const deleteRestaurant = async (id) => api.delete(`${RESTO_API}/${id}`);

const restaurantService = {
  getAllRestaurants,
  getRestaurantById,
  editRestaurantById,
  insertRestaurant,
  deleteRestaurant,
};

export default restaurantService;
