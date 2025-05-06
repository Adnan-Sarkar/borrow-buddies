import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import { store } from "../redux/store";
import { baseApi } from "../redux/api/baseApi";

const BASE_URL = "http://192.168.0.108:3800/api";

export const uploadFormData = async (
  endpoint: string,
  formData: FormData,
  method: "POST" | "PATCH" = "POST",
  tagToInvalidate?: string,
  timeoutMs: number = 30000
) => {
  try {
    const token = await AsyncStorage.getItem("authToken");

    const url = `${BASE_URL}${endpoint}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    const response = await fetch(url, {
      method,
      headers: {
        Authorization: token || "",
      },
      body: formData,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `Error: ${response.status}`);
    }

    if (tagToInvalidate) {
      store.dispatch(
        baseApi.util.invalidateTags([{ type: tagToInvalidate as any }])
      );
    }

    return data;
  } catch (error: any) {
    console.error("Upload failed:", error);

    if (error.name === "AbortError") {
      throw new Error("Request timed out. Please try again.");
    } else if (error.message.includes("Network request failed")) {
      throw new Error("Network connection issue. Please check your internet.");
    } else {
      throw error;
    }
  }
};

export const createFileObject = (uri: string, type: string, name: string) => {
  const fileUri = Platform.OS === "android" ? uri : uri.replace("file://", "");

  return {
    uri: fileUri,
    type,
    name,
  };
};
