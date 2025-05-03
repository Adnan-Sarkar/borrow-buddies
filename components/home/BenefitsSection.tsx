import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function BenefitsSection() {
  return (
    <View className="px-6 py-10 bg-primary-500">
      <Text className="text-2xl font-bold text-white mb-8 text-center">
        Benefits of Sharing
      </Text>

      <View className="bg-white/15 backdrop-blur-lg rounded-2xl p-5 mb-4">
        <View className="flex-row items-center">
          <View className="w-12 h-12 rounded-full bg-white/20 items-center justify-center mr-4">
            <Ionicons name="leaf-outline" size={24} color="white" />
          </View>
          <View className="flex-1">
            <Text className="text-white font-bold text-lg">
              Environmental Impact
            </Text>
            <Text className="text-white/80">
              Reduce waste and consumption by sharing resources
            </Text>
          </View>
        </View>
      </View>

      <View className="bg-white/15 backdrop-blur-lg rounded-2xl p-5 mb-4">
        <View className="flex-row items-center">
          <View className="w-12 h-12 rounded-full bg-white/20 items-center justify-center mr-4">
            <Ionicons name="cash-outline" size={24} color="white" />
          </View>
          <View className="flex-1">
            <Text className="text-white font-bold text-lg">
              Financial Benefits
            </Text>
            <Text className="text-white/80">
              Save money by borrowing and earn money by lending your items
            </Text>
          </View>
        </View>
      </View>

      <View className="bg-white/15 backdrop-blur-lg rounded-2xl p-5">
        <View className="flex-row items-center">
          <View className="w-12 h-12 rounded-full bg-white/20 items-center justify-center mr-4">
            <Ionicons name="people-outline" size={24} color="white" />
          </View>
          <View className="flex-1">
            <Text className="text-white font-bold text-lg">
              Community Building
            </Text>
            <Text className="text-white/80">
              Connect with your neighbors and build a stronger local community
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
