import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface ActionBarProps {
  isProductOwner?: boolean;
  onRequestPress: () => void;
  onEditPress?: () => void;
}

export default function ActionBar({
  isProductOwner = false,
  onRequestPress,
  onEditPress,
}: ActionBarProps) {
  return (
    <View className="bg-white border-t border-neutral-100 p-4 flex-row items-center justify-between">
      {isProductOwner ? (
        <TouchableOpacity
          className="flex-1 h-12 bg-warning-500 rounded-full items-center justify-center"
          onPress={onEditPress}
        >
          <Text className="font-bold text-white">Edit Your Item Details</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          className="flex-1 h-12 bg-primary-500 rounded-full items-center justify-center ml-4"
          onPress={onRequestPress}
        >
          <Text className="font-bold text-white">Request to Borrow</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
