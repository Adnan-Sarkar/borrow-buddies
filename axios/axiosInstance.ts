import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Update the BASE_URL with your actual IP address
const BASE_URL = "http://192.168.0.108:3800/api"; // Your actual IP address
// For Android emulator you can also use: "http://10.0.2.2:3800/api"
// For iOS simulator use: "http://localhost:3800/api"

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Request interceptor to include auth token in requests
axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Error getting token for request:", error);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle common errors
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized errors (token expired)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      await AsyncStorage.removeItem("authToken");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
