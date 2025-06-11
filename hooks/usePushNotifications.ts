import { useState, useEffect, useRef, useCallback } from "react";
import * as Notifications from "expo-notifications";
import { useRouter } from "expo-router";
import { Platform } from "react-native";
import * as Device from "expo-device";
import Constants from "expo-constants";
import { getValidToken } from "../utils/jwt-helper";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export function usePushNotifications() {
  const [expoPushToken, setExpoPushToken] =
    useState<Notifications.ExpoPushToken | null>(null);
  const [notification, setNotification] =
    useState<Notifications.Notification | null>(null);
  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();
  const router = useRouter();

  useEffect(() => {
    // Register for push notifications
    registerForPushNotificationsAsync().then((token) => {
      setExpoPushToken(token);
      sendPushTokenToBackend(token);
    });

    // Listen for incoming notifications
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    // Listen for notification responses
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        router.push("/(stack)/notifications");
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, [router]);

  // Schedule a test notification
  const scheduleTestNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Test Notification",
        body: "This is a test notification",
        data: { screen: "/(stack)/notifications" },
      },
      trigger: { seconds: 2 } as any,
    });
  };

  return {
    expoPushToken,
    notification,
    scheduleTestNotification,
  };
}

// Register for push notifications
async function registerForPushNotificationsAsync() {
  let token;

  if (!Device.isDevice) {
    console.log("Must use physical device for Push Notifications");
    return null;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    console.log("Failed to get push token for push notification!");
    return null;
  }

  try {
    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    token = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig?.extra?.eas?.projectId,
    });

    return token;
  } catch (error) {
    console.error("Error getting push token:", error);
    return null;
  }
}

// Send push token to backend
async function sendPushTokenToBackend(
  pushToken: Notifications.ExpoPushToken | null
) {
  if (!pushToken) return;

  try {
    const token = await getValidToken();

    if (!token) return;

    const response = await fetch(
      "http://192.168.0.108:3800/api/notifications/register-device",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          token: pushToken.data,
          platform: Platform.OS,
          device: Device.modelName || Platform.OS,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error("Failed to send push token:", error);
  }
}
