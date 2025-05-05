import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

type DecodedToken = {
  exp: number;
  [key: string]: any;
};

// Check if a token has expired
export const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  } catch {
    return true;
  }
};

// Get a valid token
export const getValidToken = async (): Promise<string | null> => {
  try {
    const token = await AsyncStorage.getItem("authToken");

    // Return null if no token or token is expired
    if (!token || isTokenExpired(token)) {
      await AsyncStorage.removeItem("authToken");
      return null;
    }

    return token;
  } catch {
    return null;
  }
};

// Clear the stored token
export const clearToken = async (): Promise<void> => {
  await AsyncStorage.removeItem("authToken");
};
