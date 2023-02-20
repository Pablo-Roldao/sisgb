import axios from "axios";

const api = axios.create({
  baseURL: "https://sisgb-api.vercel.app",
});

export default api;