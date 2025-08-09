import api from "./api";
const RESTO_API = import.meta.env.VITE_RESTO_API;

//get all restaurant
// const getAllRestaurants = async () => {
//   return await api.get(RESTO_API);
// };

const getAllRestaurants = () => api.get(RESTO_API);
//get restaurant by id
const getRestaurantById = async (id) => {
  return await api.get(`${RESTO_API}/${id}`);
};
//update restaurant by id
const editRestaurantById = async (id, restaurants) => {
  return await api.put(`${RESTO_API}/${id}`, restaurants);
};
//add restaurant
const insertRestaurant = async (restaurants) => {
  return await api.post(RESTO_API, restaurants);
};
//delete restaurant
const deleteRestaurant = async (id) => {
  return await api.delete(`${RESTO_API}/${id}`);
};
const RestaurantService = {
  getAllRestaurants,
  getRestaurantById,
  editRestaurantById,
  deleteRestaurant,
  insertRestaurant,
};

export default RestaurantService;
