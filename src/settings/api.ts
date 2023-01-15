import axios from "axios";
import { API_BASE_URL } from "./constant";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  params: {
    key: process.env.REACT_APP_API_KEY,
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.data?.error?.message) {
      // Preferably use error message from response.
      error.message = error.response.data.error.message;
    }
    return Promise.reject(error);
  }
);

export const appAxios = axiosInstance;
