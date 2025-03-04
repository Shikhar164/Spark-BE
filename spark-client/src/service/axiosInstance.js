import axios from "axios";
import eventEmitter from "../eventEmitter";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL, // Replace with your API base URL
  timeout: 10000, // Set timeout limit
});

// Function to save token to localStorage
const saveToken = (token) => {
  if (token) {
    localStorage.setItem("token", token);
  }
};

// Function to clear token from localStorage
export const clearToken = () => {
  localStorage.removeItem("token");
  delete axiosInstance.defaults.headers.Authorization;
};

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    eventEmitter.emit("loading", true); // Emit "loading" event
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    eventEmitter.emit("loading", false); // Emit "loading" event
    Promise.reject(error)
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    eventEmitter.emit("loading", false); // Emit "loading" event
    if (response.data?.token) {
      saveToken(response.data.token);
    }
    return response;
  },
  (error) => {
    eventEmitter.emit("loading", false); // Emit "loading" event
    if (error.response?.status === 401) {
      clearToken();
    }
    return Promise.reject(error);
  }
);

// Utility Functions for API Calls (Including Multipart Support)
const api = {
  get: (url, params = {}) => axiosInstance.get(url, { params }),

  post: (url, data, isFormData = false) =>
    axiosInstance.post(url, data, {
      headers: isFormData ? { "Content-Type": "multipart/form-data" } : { "Content-Type": "application/json" },
    }),

  put: (url, data, isFormData = false) =>
    axiosInstance.put(url, data, {
      headers: isFormData ? { "Content-Type": "multipart/form-data" } : { "Content-Type": "application/json" },
    }),

  delete: (url) => axiosInstance.delete(url),
};

export default api;