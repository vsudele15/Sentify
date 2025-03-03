import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

export const signup = (userData) => API.post("/auth/signup", userData);
export const login = (userData) => API.post("/auth/login", userData);
