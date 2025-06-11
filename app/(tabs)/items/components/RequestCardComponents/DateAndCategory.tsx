import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/Colors";
import { formatDate } from "./types";

type DateAndCategoryProps = {
  startDate: string;
  endDate: string;
  category: {
    name: string;
    icon?: string;
  };
};

export default function DateAndCategory({
  startDate,
  endDate,
  category,
}: DateAndCategoryProps) {
  return (
    <View className="flex-row justify-between items-center mb-4">
      <View className="flex-row items-center bg-primary-50 rounded-lg px-3 py-1.5 border border-primary-100">
        <Ionicons name="calendar" size={16} color={COLORS.PRIMARY[600]} />
        <Text className="text-primary-700 ml-1.5 text-sm font-medium">
          {formatDate(startDate)} - {formatDate(endDate)}
        </Text>
      </View>

      <View className="bg-neutral-100 rounded-full px-2.5 py-1">
        <Text className="text-neutral-600 text-xs">{category.name}</Text>
      </View>
    </View>
  );
}
