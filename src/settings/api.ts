import axios from "axios";
import {
  API_BASE_URL,
  LOCATION_API_URL,
  FIREBASE_SERVER_URL,
  GOOGLE_AUTH_API_URL,
} from "./constant";

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

export const locationAxios = axios.create({
  baseURL: LOCATION_API_URL,
  timeout: 3000,
});

export const firebaseAxios = axios.create({
  baseURL: FIREBASE_SERVER_URL,
});

export const googleAuthAxios = axios.create({
  baseURL: GOOGLE_AUTH_API_URL,
});
