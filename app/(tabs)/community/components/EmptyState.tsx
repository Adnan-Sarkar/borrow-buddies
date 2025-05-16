import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../../../constants/Colors";

interface EmptyStateProps {
  icon: string;
  title: string;
  message: string;
  buttonText?: string;
  onButtonPress?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  message,
  buttonText,
  onButtonPress,
}) => {
  return (
    <View className="items-center justify-center px-6 py-16">
      <View className="w-20 h-20 rounded-full bg-neutral-100 items-center justify-center mb-4">
        <Ionicons name={icon as any} size={40} color={COLORS.NEUTRAL[400]} />
      </View>

      <Text className="text-xl font-bold text-neutral-800 mb-2 text-center">
        {title}
      </Text>

      <Text className="text-neutral-500 text-center mb-6">{message}</Text>

      {buttonText && onButtonPress && (
        <TouchableOpacity
          className="bg-primary-500 py-3 px-6 rounded-full"
          onPress={onButtonPress}
          activeOpacity={0.8}
        >
          <Text className="text-white font-medium">{buttonText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default EmptyState;
