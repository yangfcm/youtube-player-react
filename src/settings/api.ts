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

// Request interceptor to handle authentication
axiosInstance.interceptors.request.use(
  async (config) => {
    // Check if this endpoint needs authentication
    const needsAuth = ["/subscriptions", "/playlists", "/commentThreads"].some(
      (endpoint) => config.url?.includes(endpoint),
    );

    if (needsAuth) {
      const expiresAt = Number(localStorage.getItem("expiresAt"));
      const now = Date.now();

      // Check if token is expired or will expire soon (within 5 minutes)
      if (!expiresAt || now >= expiresAt || expiresAt - now < 5 * 60 * 1000) {
        console.warn("Token expired or expiring soon, may need refresh");
      }

      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = token;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.data?.error?.message) {
      error.message = error.response.data.error.message;
    }

    // Handle 401 Unauthorized - token expired
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      console.log("API call failed with 401, token may be expired");

      // Could trigger token refresh here if we have the refresh mechanism
      // For now, we'll let the app handle the invalid token state
      const expiresAt = Number(localStorage.getItem("expiresAt"));
      if (Date.now() >= expiresAt) {
        localStorage.removeItem("token");
        localStorage.removeItem("expiresAt");
        console.warn("Cleared expired tokens");
      }
    }

    return Promise.reject(error);
  },
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
