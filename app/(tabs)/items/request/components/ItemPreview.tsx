import React from "react";
import { View, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/Colors";

type ItemPreviewProps = {
  item: any;
};

export default function ItemPreview({ item }: ItemPreviewProps) {
  return (
    <View className="bg-neutral-50 rounded-xl p-4">
      <Text className="text-lg font-semibold text-neutral-800 mb-3">
        Item Details
      </Text>

      <View className="flex-row">
        {/* Item image */}
        <Image
          source={{
            uri: item.images?.[0] || "https://via.placeholder.com/150",
          }}
          className="w-24 h-24 rounded-lg"
          resizeMode="cover"
        />

        {/* Item details */}
        <View className="ml-3 flex-1 justify-between">
          {/* Category */}
          <View className="flex-row items-center">
            <View className="bg-primary-100 px-2 py-0.5 rounded-full flex-row items-center">
              <Ionicons
                name={item.category?.icon || "grid-outline"}
                size={12}
                color={COLORS.PRIMARY[600]}
              />
              <Text className="text-xs text-primary-600 font-medium ml-1">
                {item.category?.name || "Item"}
              </Text>
            </View>
          </View>

          {/* Title */}
          <Text
            className="text-base font-medium text-neutral-800 mt-1"
            numberOfLines={2}
          >
            {item.title}
          </Text>

          {/* Price */}
          <View className="flex-row items-center mt-1">
            <Text className="text-base font-semibold text-primary-600">
              ${parseFloat(item.dailyPrice).toFixed(2)}
            </Text>
            <Text className="text-neutral-500 text-sm">/day</Text>
          </View>

          {/* Owner */}
          <View className="flex-row items-center mt-1">
            <Text className="text-xs text-neutral-500">Owned by </Text>
            <Text className="text-xs font-semibold text-neutral-500">
              {item.owner?.name}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
