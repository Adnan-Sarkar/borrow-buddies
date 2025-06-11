import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/Colors";

type ItemDetailsProps = {
  item: any;
};

export default function ItemDetails({ item }: ItemDetailsProps) {
  const router = useRouter();

  // Add a check for undefined item
  if (!item) {
    return (
      <View className="px-4 mt-6">
        <Text className="text-neutral-800 font-semibold text-lg mb-3">
          Item Details
        </Text>
        <View className="bg-white rounded-xl border border-neutral-200 p-4">
          <Text className="text-neutral-500">Item information unavailable</Text>
        </View>
      </View>
    );
  }

  const imageUrl =
    item?.images && item?.images?.length > 0
      ? item?.images[0]
      : "https://via.placeholder.com/150";

  const dailyPrice = parseFloat(item.dailyPrice || 0).toFixed(0);

  return (
    <View className="px-4 mt-6">
      <View className="flex-row items-center justify-between mb-3">
        <Text className="text-neutral-800 font-semibold text-lg">
          Borrowed Item
        </Text>
        <TouchableOpacity
          className="flex-row items-center"
          onPress={() => router.push(`/(tabs)/items/${item.id}`)}
        >
          <Text className="text-primary-600 text-sm mr-1">View Details</Text>
          <Ionicons
            name="arrow-forward-circle-outline"
            size={16}
            color={COLORS.PRIMARY[600]}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-sm"
        style={{ elevation: 1 }}
        onPress={() => router.push(`/(tabs)/items/${item.id}`)}
      >
        {/* Image with overlays */}
        <View className="relative">
          <Image
            source={{ uri: imageUrl }}
            className="w-full h-[140px]"
            resizeMode="cover"
          />

          {/* Semi-transparent overlay */}
          <View className="absolute inset-0 bg-black/30" />

          {/* Category tag */}
          <View className="absolute top-3 left-3 bg-black/60 rounded-full px-3 py-1 flex-row items-center">
            <Ionicons
              name={(item.category?.icon || "cube-outline") as any}
              size={14}
              color="white"
            />
            <Text className="text-white text-xs ml-1">
              {item.category?.name || "Uncategorized"}
            </Text>
          </View>

          {/* Price tag */}
          <View className="absolute top-3 right-3 bg-primary-500 rounded-lg px-2 py-1">
            <Text className="text-white font-bold">৳{dailyPrice}/day</Text>
          </View>

          {/* Item title overlay */}
          <View className="absolute bottom-0 left-0 right-0 p-3">
            <Text className="text-white font-bold text-lg" numberOfLines={2}>
              {item.title || "Unnamed Item"}
            </Text>
          </View>
        </View>

        {/* Rules */}
        {item.rules && item.rules.length > 0 ? (
          <View className="p-4">
            {item.rules.map((rule: string, index: number) => (
              <View key={index} className="flex-row items-center mb-1.5 ml-1">
                <Ionicons
                  name="alert-circle-outline"
                  size={16}
                  color={COLORS.WARNING[500]}
                />
                <Text className="text-neutral-600 text-sm ml-2">{rule}</Text>
              </View>
            ))}
          </View>
        ) : null}
      </TouchableOpacity>
    </View>
  );
}
