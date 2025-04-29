import { Stack } from "expo-router";
import Providers from "../lib/Provider";
import "../global.css";
import { AlertNotificationRoot } from "react-native-alert-notification";

export default function RootLayout() {
  return (
    <Providers>
      <AlertNotificationRoot theme="light">
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </AlertNotificationRoot>
    </Providers>
  );
}
