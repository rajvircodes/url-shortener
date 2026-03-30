import axios from "axios";

// One instance, one base URL — change it here if backend moves
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

export const shortenUrl = (originalUrl) =>
  API.post("/url/shorten", { originalUrl });