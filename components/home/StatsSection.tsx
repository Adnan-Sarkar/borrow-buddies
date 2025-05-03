import React from "react";
import { View, Text } from "react-native";

export default function StatsSection() {
  return (
    <View className="flex-row justify-between px-6 py-8 bg-white">
      <View className="items-center">
        <Text className="text-3xl font-bold text-primary-500">5K+</Text>
        <Text className="text-neutral-600 text-sm mt-1">Active Users</Text>
      </View>
      <View className="h-12 w-[1px] bg-neutral-200" />
      <View className="items-center">
        <Text className="text-3xl font-bold text-primary-500">12K</Text>
        <Text className="text-neutral-600 text-sm mt-1">Items Shared</Text>
      </View>
      <View className="h-12 w-[1px] bg-neutral-200" />
      <View className="items-center">
        <Text className="text-3xl font-bold text-primary-500">98%</Text>
        <Text className="text-neutral-600 text-sm mt-1">Happy Users</Text>
      </View>
    </View>
  );
}
