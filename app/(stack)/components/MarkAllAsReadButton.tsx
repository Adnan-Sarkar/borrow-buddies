import React from "react";
import { TouchableOpacity, Text } from "react-native";

type MarkAllAsReadButtonProps = {
  onPress: () => void;
};

const MarkAllAsReadButton = ({ onPress }: MarkAllAsReadButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white py-3 border-b border-neutral-100"
      activeOpacity={0.7}
    >
      <Text className="text-primary-500 text-center font-medium">
        Mark all as read
      </Text>
    </TouchableOpacity>
  );
};

export default MarkAllAsReadButton;
