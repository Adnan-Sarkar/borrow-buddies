import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../../../../constants/Colors";

interface OwnerInfoProps {
  owner: {
    id: string;
    name: string;
    profilePicture?: string;
    avgRating?: number;
    reviewCount?: number;
  };
  onPress: () => void;
}

export default function OwnerInfo({ owner, onPress }: OwnerInfoProps) {
  return (
    <TouchableOpacity
      className="flex-row items-center bg-neutral-50 p-4 rounded-lg mb-6"
      onPress={onPress}
    >
      <Image
        source={{
          uri:
            owner?.profilePicture ||
            "https://via.placeholder.com/100?text=User",
        }}
        className="w-12 h-12 rounded-full"
      />
      <View className="ml-3 flex-1">
        <Text className="font-semibold text-neutral-900">
          {owner?.name || "Owner"}
        </Text>
        <View className="flex-row items-center">
          <Ionicons name="star" size={14} color={COLORS.WARNING[400]} />
          <Text className="text-neutral-600 text-sm ml-1">
            {owner?.avgRating || "New"} · {owner?.reviewCount || 0} reviews
          </Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color={COLORS.NEUTRAL[400]} />
    </TouchableOpacity>
  );
}
