import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../../constants/Colors";

const EmptyNotificationsState = () => {
  return (
    <View className="flex-1 justify-center items-center p-8">
      <Ionicons
        name="notifications-off-outline"
        size={64}
        color={COLORS.NEUTRAL[300]}
      />
      <Text className="text-xl font-semibold text-neutral-700 mt-4 mb-2">
        No notifications yet
      </Text>
      <Text className="text-neutral-500 text-center">
        When you get notifications, they will appear here
      </Text>
    </View>
  );
};

export default EmptyNotificationsState;
