import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "@/constants/Colors";
import type { RequestItem } from "./types";
import StatusBadge from "./StatusBadge";

type ImageHeaderProps = {
  item: RequestItem;
  status: string;
  totalDays: number;
  onItemPress: () => void;
};

export default function ImageHeader({
  item,
  status,
  totalDays,
  onItemPress,
}: ImageHeaderProps) {
  return (
    <View className="relative">
      <Image
        source={{ uri: item.images[0] }}
        className="w-full h-40"
        resizeMode="cover"
      />

      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.7)"]}
        className="absolute bottom-0 left-0 right-0 h-20"
      />

      <TouchableOpacity
        className="absolute top-2 right-2 bg-white/80 rounded-full p-1.5 backdrop-blur-sm"
        onPress={onItemPress}
      >
        <Ionicons name="open-outline" size={16} color={COLORS.NEUTRAL[600]} />
      </TouchableOpacity>

      <StatusBadge status={status} />

      <View className="absolute bottom-2 left-3 right-3 flex-row justify-between items-center">
        <Text className="text-white font-semibold text-lg" numberOfLines={1}>
          {item.title}
        </Text>
        <View className="bg-black/30 backdrop-blur-sm rounded-full px-2 py-0.5 flex-row items-center">
          <Ionicons name="calendar-outline" size={12} color="white" />
          <Text className="text-white text-xs ml-1">{totalDays} days</Text>
        </View>
      </View>
    </View>
  );
}
