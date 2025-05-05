import { useEffect } from "react";
import { Slot, useRouter, useSegments } from "expo-router";
import Providers from "../lib/Provider";
import { useAppDispatch, useAppSelector } from "../redux/store";
import {
  setCredentials,
  clearCredentials,
} from "../redux/feature/auth/authSlice";
import "../global.css";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { StatusBar as RNStatusBar, View, Platform } from "react-native";
import Constants from "expo-constants";
import { getValidToken } from "../utils/jwt-helper";

export default function RootLayout() {
  if (Platform.OS === "android") {
    RNStatusBar.setBackgroundColor("black");
    RNStatusBar.setTranslucent(true);
  }

  return (
    <Providers>
      <View
        style={{
          flex: 1,
          paddingTop: Platform.OS === "ios" ? Constants.statusBarHeight : 0,
        }}
      >
        <ExpoStatusBar style="dark" />
        <RootLayoutNav />
      </View>
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
        const validToken = await getValidToken();

        if (validToken) {
          dispatch(setCredentials({ token: validToken }));
        } else {
          // If token is invalid or expired, clear credentials
          dispatch(clearCredentials());
        }
      } catch (error) {
        console.error("Failed to validate authentication token", error);
        dispatch(clearCredentials());
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
      router.replace("/(tabs)/home" as any);
    }
  }, [token, segments]);

  return <Slot />;
}
