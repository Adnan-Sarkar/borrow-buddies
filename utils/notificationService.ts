import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import Constants from "expo-constants";
import { getValidToken } from "./jwt-helper";

// Register for push notifications
export async function registerForPushNotificationsAsync() {
  let token;

  if (!Device.isDevice) {
    console.log("Physical device is required for push notifications");
    return null;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    console.log("Failed to get push token permission!");
    return null;
  }

  try {
    // For development in Expo Go
    if (__DEV__) {
      token = await Notifications.getExpoPushTokenAsync();
    } else {
      // For production or development build
      token = await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig?.extra?.eas?.projectId,
      });
    }

    console.log(`Expo Push Token: ${token.data}`);
    return token;
  } catch (error) {
    console.error("Error getting push token:", error);
    return null;
  }
}

// Set up notification handlers
export function setupNotificationListeners(
  onNotificationReceived: (notification: Notifications.Notification) => void,
  onNotificationResponse: (response: Notifications.NotificationResponse) => void
) {
  // Handle received notifications
  const receivedSubscription = Notifications.addNotificationReceivedListener(
    onNotificationReceived
  );

  // Handle notification responses
  const responseSubscription =
    Notifications.addNotificationResponseReceivedListener(
      onNotificationResponse
    );

  return {
    remove: () => {
      receivedSubscription.remove();
      responseSubscription.remove();
    },
  };
}

// Send push token to backend
export async function sendPushTokenToBackend(pushToken: any) {
  try {
    const authToken = await getValidToken();

    if (!authToken) {
      console.log("No valid auth token found");
      return null;
    }

    console.log("Sending push token to backend");

    const response = await fetch(
      "http://192.168.0.108:3800/api/notifications/register-device",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authToken,
        },
        body: JSON.stringify({
          token: typeof pushToken === "string" ? pushToken : pushToken.data,
          platform: Platform.OS,
          device: Device.modelName || Platform.OS,
        }),
      }
    );

    if (response.status === 401) {
      console.log("Authentication error: Please log in again");
      return null;
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error saving push token:", error);
    return null;
  }
}

// Modify these functions to work with your API

export async function getUserNotifications(
  page: number = 1,
  limit: number = 20
): Promise<{ data: any[]; meta: any } | null> {
  try {
    const token = await getValidToken();

    if (!token) {
      return null;
    }

    const response = await fetch(
      `http://192.168.0.108:3800/api/notifications?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return null;
  }
}

export async function getUnreadNotificationCount(): Promise<number> {
  try {
    const token = await getValidToken();

    if (!token) {
      return 0;
    }

    const response = await fetch(
      "http://192.168.0.108:3800/api/notifications/unread-count",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result.data?.count || 0;
  } catch (error) {
    console.error("Error fetching unread count:", error);
    return 0;
  }
}

export async function markNotificationAsRead(
  notificationId: string
): Promise<boolean> {
  try {
    const token = await getValidToken();

    if (!token) {
      return false;
    }

    const response = await fetch(
      `http://192.168.0.108:3800/api/notifications/${notificationId}/read`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error("Error marking notification as read:", error);
    return false;
  }
}

export async function markAllNotificationsAsRead(): Promise<boolean> {
  try {
    const token = await getValidToken();

    if (!token) {
      return false;
    }

    const response = await fetch(
      "http://192.168.0.108:3800/api/notifications/read-all",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error("Error marking all notifications as read:", error);
    return false;
  }
}
