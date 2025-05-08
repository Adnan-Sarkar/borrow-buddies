import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../../../constants/Colors";

export interface ProfileMenuItemProps {
  icon: string;
  title: string;
  description: string;
  isLast?: boolean;
  iconBgColor?: string;
  iconColor?: string;
  onPress: () => void;
}

const ProfileMenuItem = ({
  icon,
  title,
  description,
  isLast = false,
  iconBgColor = COLORS.NEUTRAL[100],
  iconColor = COLORS.NEUTRAL[600],
  onPress,
}: ProfileMenuItemProps) => {
  return (
    <TouchableOpacity
      className={`flex-row items-center py-4 ${
        !isLast ? "border-b border-neutral-100" : ""
      }`}
      onPress={onPress}
    >
      <View
        className="w-10 h-10 rounded-full items-center justify-center"
        style={{ backgroundColor: iconBgColor }}
      >
        <Ionicons name={icon as any} size={20} color={iconColor} />
      </View>
      <View className="flex-1 ml-3">
        <Text className="text-neutral-800 font-medium">{title}</Text>
        <Text className="text-neutral-500 text-sm">{description}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={COLORS.NEUTRAL[400]} />
    </TouchableOpacity>
  );
};

export default ProfileMenuItem;
