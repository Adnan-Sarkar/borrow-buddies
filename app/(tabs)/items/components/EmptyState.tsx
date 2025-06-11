import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/Colors";

type EmptyStateProps = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
};

export default function EmptyState({
  icon,
  title,
  message,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <View className="flex-1 items-center justify-center p-6 mt-10">
      <View className="w-20 h-20 rounded-full bg-neutral-100 items-center justify-center mb-4">
        <Ionicons name={icon} size={36} color={COLORS.NEUTRAL[400]} />
      </View>
      <Text className="text-lg font-semibold text-neutral-800 mb-2 text-center">
        {title}
      </Text>
      <Text className="text-neutral-500 text-center mb-6">{message}</Text>
      
      {actionLabel && onAction && (
        <TouchableOpacity
          onPress={onAction}
          className="bg-primary-50 px-6 py-3 rounded-full"
        >
          <Text className="text-primary-600 font-medium">{actionLabel}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}