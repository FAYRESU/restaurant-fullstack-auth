import axios from "axios";
import TokenService from "./token.service";
const baseURL = import.meta.env.VITE_BASE_URL; 


const instance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add interceptor to request object
instance.interceptors.request.use(
  (config) => {
    // Get the token and check if it exists
    const token = TokenService.getLocalAccessToken();
    if (token) {
      // Encode the token before setting the header to handle special characters
      config.headers["x-access-token"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;