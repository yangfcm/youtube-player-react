import axios from "axios";
import { API_BASE_URL } from "./constant";

export const appAxios = axios.create({
  baseURL: API_BASE_URL,
  params: {
    key: process.env.REACT_APP_API_KEY,
  },
});
