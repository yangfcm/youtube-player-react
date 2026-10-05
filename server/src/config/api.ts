import axios from "axios";

const YOUTUBE_API_URL = "https://www.googleapis.com/youtube/v3";
const HEADER_REFERER = "http://localhost:3000";

export const appAxios = axios.create({
  baseURL: YOUTUBE_API_URL,
  params: {
    key: process.env.YOUTUBE_API_KEY as string,
  },
  headers: {
    Referer: HEADER_REFERER,
  },
});
