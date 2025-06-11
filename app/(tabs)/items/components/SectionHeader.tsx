import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface SectionHeaderProps {
  title: string;
  actionText?: string;
  onAction: () => void;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  actionText,
  onAction,
}) => (
  <View className="flex-row items-center justify-between px-5 mb-3">
    <Text className="text-lg font-bold text-neutral-900">{title}</Text>
    {actionText ? (
      <TouchableOpacity onPress={onAction}>
        <Text className="text-sm text-blue-500">{actionText}</Text>
      </TouchableOpacity>
    ) : null}
  </View>
);

export default SectionHeader;
