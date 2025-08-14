import api from "./api";
import TokenService from "./token.service.js";

const API_URL = import.meta.env.VITE_AUT_API;

const register = async (username, fullName, email, password) => {
  return api.post(API_URL + "/register", {
    username,
    fullName,
    email,
    password,
  });
};

const login = async (username, password) => {
  const response = await api.post(API_URL + "/signin", { username, password });
  //saveing user data to local storage
  if (!response.data.token) {
    return response;
  }
  TokenService.setUser(response.data);
  return response;
};

const logout = () => {
  TokenService.removeUser();
};

const AuthService = {
  register,
  login,
  logout,
};

export default AuthService;
