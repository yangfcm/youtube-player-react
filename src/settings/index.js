import axios from "axios";

export const apiBaseUrl = "https://www.googleapis.com/youtube/v3";

export const defAxios = axios.create({
  baseURL: apiBaseUrl,
  timeout: 10000
});

export const defaultName = "Fan Yang";
export const mainMenuItems = [
  { link: "/", exact: true, name: "Recommend" },
  { link: "/channel", exact: false, name: "Channel" },
  { link: "/playlist", exact: false, name: "Play List" }
];

export const maxResults = 12;
