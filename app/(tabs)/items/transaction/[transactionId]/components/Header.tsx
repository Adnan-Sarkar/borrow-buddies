import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/Colors";

type HeaderProps = {
  title: string;
  insets: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  onBackPress: () => void;
};

export default function Header({ title, insets, onBackPress }: HeaderProps) {
  return (
    <View
      style={{ paddingTop: insets.top }}
      className="bg-white border-b border-neutral-200"
    >
      <View className="flex-row items-center h-14 px-4">
        <TouchableOpacity
          onPress={onBackPress}
          className="w-10 h-10 items-center justify-center rounded-full"
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.NEUTRAL[800]} />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-lg font-semibold text-neutral-800 mr-10">
          {title}
        </Text>
      </View>
    </View>
  );
}
