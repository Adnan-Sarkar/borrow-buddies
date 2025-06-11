import React, { useState, useEffect, useCallback, useRef } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, usePathname } from "expo-router";
import * as Notifications from "expo-notifications";
import { getValidToken } from "@/utils/jwt-helper";
import { getUnreadNotificationCount } from "@/utils/notificationService";
import { COLORS } from "@/constants/Colors";

interface NotificationBadgeProps {
  dark?: boolean;
}

export default function NotificationBadge({
  dark = false,
}: NotificationBadgeProps) {
  const [unreadCount, setUnreadCount] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const currentPath = usePathname();
  const notificationListener = useRef<any>();

  // Check if user is authenticated and get unread count
  const loadData = useCallback(async () => {
    const token = await getValidToken();
    setIsAuthenticated(!!token);

    if (token) {
      const count = await getUnreadNotificationCount();
      setUnreadCount(count);
    } else {
      setUnreadCount(0);
    }
  }, []);

  // Load initial data
  useEffect(() => {
    loadData();

    const interval = setInterval(loadData, 60000);

    // Set up listener for new notifications
    notificationListener.current =
      Notifications.addNotificationReceivedListener(() => {
        loadData();
      });

    return () => {
      clearInterval(interval);
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      }
    };
  }, [loadData]);

  const handlePress = () => {
    router.push({
      pathname: "/(stack)/notifications",
      params: { from: currentPath },
    });
  };

  return (
    <TouchableOpacity
      className={`w-10 h-10 rounded-full items-center justify-center ${
        dark ? "bg-neutral-100" : "bg-white/20 backdrop-blur-lg"
      }`}
      onPress={handlePress}
    >
      <Ionicons
        name="notifications-outline"
        size={20}
        color={dark ? COLORS.NEUTRAL[800] : "white"}
      />
      {isAuthenticated && unreadCount > 0 && (
        <View className="absolute -top-1 -right-1 bg-red-500 rounded-full min-w-[18px] h-[18px] items-center justify-center px-1">
          <Text className="text-white text-xs font-bold">
            {unreadCount > 99 ? "99+" : unreadCount}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}
