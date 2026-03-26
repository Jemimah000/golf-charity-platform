import axios from "axios";

// 🔥 AUTO SWITCH BASE URL
const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/api"
    : "https://golf-charity-platform-5wiu.onrender.com/api";

const API = axios.create({
  baseURL: BASE_URL,
});

// 🔐 attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;