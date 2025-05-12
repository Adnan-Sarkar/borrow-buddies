import axios from "axios";
import type { AxiosInstance, AxiosResponse } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { ApiResponse } from "../types/api.types";

const BASE_URL = "http://192.168.0.108:3800/api";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (token) {
        config.headers["Authorization"] = `${token}`;
      }
    } catch (error) {
      console.error("Error getting token for request:", error);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
axiosInstance.interceptors.response.use(
  <T>(response: AxiosResponse<ApiResponse<T> | T>): AxiosResponse<T> => {
    const { data } = response;

    // Check if response follows the standard API structure
    if (
      data &&
      typeof data === "object" &&
      "success" in data &&
      "statusCode" in data &&
      "message" in data &&
      "data" in data
    ) {
      return response as AxiosResponse<T>;
    }

    return response as AxiosResponse<T>;
  },
  async (error) => {
    // Handle token expiry or other errors
    // if (error.response?.status === 401) {
    //   await AsyncStorage.removeItem("authToken");
    // }

    return Promise.reject(error);
  }
);

export default axiosInstance;
