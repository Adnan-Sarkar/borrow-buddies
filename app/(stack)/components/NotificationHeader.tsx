import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { COLORS } from "../../../constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface NotificationHeaderProps {
  onClearAll?: () => void;
}

const NotificationHeader = ({ onClearAll }: NotificationHeaderProps) => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const fromPath = params.from as string;

  // Handle back navigation to previous screen
  const handleBack = () => {
    if (fromPath) {
      router.push(fromPath as any);
    } else {
      router.back();
    }
  };

  return (
    <View
      className="bg-white border-b border-neutral-100"
      style={{ paddingTop: insets.top }}
    >
      <View className="flex-row items-center justify-between px-4 h-14">
        <TouchableOpacity
          className="w-10 h-10 items-center justify-center rounded-full"
          onPress={handleBack}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.NEUTRAL[900]} />
        </TouchableOpacity>

        <Text className="flex-1 text-center text-[17px] font-semibold text-neutral-900">
          Notifications
        </Text>

        {onClearAll ? (
          <TouchableOpacity
            className="w-10 h-10 items-center justify-center"
            onPress={onClearAll}
          >
            <Ionicons
              name="trash-outline"
              size={20}
              color={COLORS.NEUTRAL[700]}
            />
          </TouchableOpacity>
        ) : (
          <View className="w-10" />
        )}
      </View>
    </View>
  );
};

export default NotificationHeader;
