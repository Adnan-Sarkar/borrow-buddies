import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../../../../constants/Colors";

interface FeaturesListProps {
  features: string[];
}

export default function FeaturesList({ features }: FeaturesListProps) {
  if (!features || features.length === 0) {
    return null;
  }

  return (
    <View className="mb-10">
      <View className="flex-row items-center mb-4">
        <View className="flex-1 h-[1px] bg-neutral-200" />
        <Text className="mx-3 text-neutral-700 font-semibold">
          Features & Highlights
        </Text>
        <View className="flex-1 h-[1px] bg-neutral-200" />
      </View>

      <View className="flex-row flex-wrap">
        {features.map((feature, index) => (
          <View
            key={index}
            className="bg-primary-50 rounded-xl px-3 py-2.5 mb-3 mr-3 flex-row items-center"
            style={{ maxWidth: "95%" }}
          >
            <View className="w-7 h-7 rounded-full bg-primary-100 items-center justify-center mr-2.5">
              <Ionicons
                name="checkmark"
                size={16}
                color={COLORS.PRIMARY[600]}
              />
            </View>
            <Text className="text-neutral-800 font-medium flex-shrink">
              {feature}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
