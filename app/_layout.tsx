import { useEffect } from "react";
import { Slot, useRouter, useSegments } from "expo-router";
import Providers from "../lib/Provider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppDispatch, useAppSelector } from "../redux/store";
import {
  selectCurrentToken,
  setCredentials,
} from "../redux/feature/auth/authSlice";
import "../global.css";

export default function RootLayout() {
  return (
    <Providers>
      <RootLayoutNav />
    </Providers>
  );
}

function RootLayoutNav() {
  const router = useRouter();
  const segments = useSegments();
  const dispatch = useAppDispatch();

  const token = useAppSelector((state) => state.auth?.token);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("authToken");

        if (storedToken) {
          dispatch(setCredentials({ token: storedToken }));
        }
      } catch (error) {
        console.error("Failed to get authentication token", error);
      }
    };

    checkToken();
  }, []);

  useEffect(() => {
    const inAuthGroup = segments[0] === "auth";

    if (!token && !inAuthGroup) {
      // No token, redirect to login
      router.replace("/auth/login");
    } else if (token && inAuthGroup) {
      // has token, redirect to home
      router.replace("/(tabs)/home/index");
    }
  }, [token, segments]);

  return <Slot />;
}
