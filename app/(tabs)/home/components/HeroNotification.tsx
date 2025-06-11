import { View } from "react-native";
import React from "react";
import Logo from "@/components/common/Logo";
import NotificationBadge from "@/components/common/NotificationBadge";

export default function HeroNotification() {
  return (
    <View className="flex-row items-center justify-between">
      <Logo />
      <NotificationBadge />
    </View>
  );
}
