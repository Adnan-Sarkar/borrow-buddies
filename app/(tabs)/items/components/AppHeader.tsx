import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../../../constants/Colors";
import NotificationBadge from "@/components/common/NotificationBadge";

type AppHeaderProps = {
  onMenuPress: () => void;
};

const AppHeader = ({ onMenuPress }: AppHeaderProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="bg-white border-b border-neutral-100"
      style={{ paddingTop: insets.top }}
    >
      <View className="flex-row items-center justify-between px-5 py-4">
        {/* Menu Button */}
        <TouchableOpacity
          onPress={onMenuPress}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="menu-outline" size={28} color={COLORS.NEUTRAL[900]} />
        </TouchableOpacity>

        <View className="flex-1 items-center">
          <Text className="text-xl font-bold text-neutral-900">
            Sharing Hub
          </Text>
        </View>

        {/* Notifications */}
        <NotificationBadge dark={true} />
      </View>
    </View>
  );
};

export default AppHeader;
