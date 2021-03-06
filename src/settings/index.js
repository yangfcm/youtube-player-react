import axios from "axios";

export const apiBaseUrl = "https://www.googleapis.com/youtube/v3";

export const defAxios = axios.create({
  baseURL: apiBaseUrl,
  timeout: 10000,
  params: {
    key: process.env.REACT_APP_API_KEY,
  },
});

export const mainMenuItems = [
  { link: "/", exact: true, name: "Recommend", icon: "thumbs-up" },
  { link: "/channel", exact: false, name: "Subscriptions", icon: "user-plus" },
  { link: "/playlist", exact: false, name: "Play List", icon: "list" },
];

export const maxResults = 12;
