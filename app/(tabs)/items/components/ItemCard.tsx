import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../../../constants/Colors";
import type { ItemType } from "@/types/item.types";

interface ItemCardProps {
  item: ItemType;
  onPress: () => void;
  className?: string;
  horizontal?: boolean;
  width?: number;
}

const ItemCard = ({
  item,
  onPress,
  className = "",
  horizontal = false,
  width,
}: ItemCardProps) => {
  const imageUri = item.images && item.images.length > 0 ? item.images[0] : "";

  const locationDIstance = item.distance
    ? `${item.distance.toFixed(1)} mile away`
    : item.location || "Unknown location";

  return (
    <TouchableOpacity
      className={`bg-white rounded-2xl overflow-hidden ${className}`}
      style={{
        width: width || (horizontal ? "100%" : "100%"),
        borderWidth: 1,
        borderColor: "#F0F0F0",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 1,
      }}
      onPress={onPress}
      activeOpacity={0.9}
    >
      {horizontal ? (
        <View className="flex-row">
          <View className="relative w-32 h-32">
            <Image
              source={{ uri: imageUri }}
              className="w-full h-full rounded-tl-2xl rounded-bl-2xl"
              resizeMode="cover"
            />
          </View>

          {/* Content section */}
          <View className="p-4 flex-1 justify-between">
            <View>
              {/* Title and price */}
              <View className="flex-row items-start justify-between">
                <Text
                  className="text-neutral-900 font-semibold flex-1 mr-2"
                  numberOfLines={1}
                >
                  {item.title}
                </Text>
                <Text className="text-primary-600 font-bold">
                  $
                  {typeof item.dailyPrice === "string"
                    ? item.dailyPrice
                    : item.dailyPrice.toFixed(0)}
                  <Text className="text-xs font-normal text-neutral-500">
                    /day
                  </Text>
                </Text>
              </View>

              {/* Rating */}
              <View className="flex-row items-center mt-2">
                <View className="bg-yellow-50 px-1.5 py-0.5 rounded-md flex-row items-center">
                  <Ionicons name="star" size={12} color="#FFB800" />
                  <Text className="text-yellow-700 text-xs font-medium ml-0.5">
                    {item.avgRating}
                  </Text>
                </View>
                <Text className="text-neutral-500 text-xs ml-1">
                  ({item.reviewCount || 0} reviews)
                </Text>
              </View>
            </View>

            {/* Location */}
            <View className="flex-row items-center mt-2">
              <Ionicons
                name="location-outline"
                size={14}
                color={COLORS.NEUTRAL[500]}
              />
              <Text className="text-neutral-500 text-xs ml-1">
                <Text className="font-semibold text-primary-600">
                  {locationDIstance}
                </Text>
              </Text>
            </View>
          </View>
        </View>
      ) : (
        // Vertical layout
        <>
          {/* Image */}
          <View className="relative aspect-[4/3]">
            <Image
              source={{ uri: imageUri }}
              className="w-full h-full"
              resizeMode="cover"
            />
            {item.avgRating >= 4.7 && (
              <View className="absolute top-2 left-2 bg-primary-500 px-2 py-1 rounded-full">
                <Text className="text-white text-xs font-medium">Popular</Text>
              </View>
            )}
          </View>

          {/* Content section */}
          <View className="p-4">
            {/* Title and price */}
            <View className="flex-row items-start justify-between mb-2">
              <Text
                className="text-neutral-900 font-semibold flex-1 mr-2"
                numberOfLines={2}
              >
                {item.title}
              </Text>
              <Text className="text-primary-600 font-bold">
                $
                {typeof item.dailyPrice === "string"
                  ? item.dailyPrice
                  : item.dailyPrice.toFixed(0)}
                <Text className="text-xs font-normal text-neutral-500">
                  /day
                </Text>
              </Text>
            </View>

            {/* Rating and Category */}
            <View className="flex-row items-center justify-between mt-1">
              {/* Rating */}
              <View className="flex-row items-center">
                <View className="bg-yellow-50 px-1.5 py-0.5 rounded-md flex-row items-center">
                  <Ionicons name="star" size={12} color="#FFB800" />
                  <Text className="text-yellow-700 text-xs font-medium ml-0.5">
                    {item.avgRating}
                  </Text>
                </View>
                <Text className="text-neutral-500 text-xs ml-1">
                  ({item.reviewCount || 0})
                </Text>
              </View>

              {/* Category */}
              <View className="flex-row items-center">
                {item.category && (
                  <>
                    <Ionicons
                      name={(item.category.icon as any) || "grid-outline"}
                      size={14}
                      color={COLORS.NEUTRAL[500]}
                    />
                    <Text className="text-neutral-500 text-xs ml-1 mr-1.5">
                      {item.category.name}
                    </Text>
                  </>
                )}

                {item.distance && (
                  <View className="bg-primary-50 rounded-md px-1.5 py-0.5">
                    <Text className="text-primary-600 text-xs font-medium">
                      {item.distance.toFixed(1)}mi
                    </Text>
                  </View>
                )}
              </View>
            </View>

            {/* Owner info */}
            <View className="flex-row items-center mt-3 pt-3 border-t border-neutral-100">
              {item.owner.profilePicture ? (
                <Image
                  source={{ uri: item.owner.profilePicture }}
                  className="w-5 h-5 rounded-full mr-2"
                />
              ) : (
                <View className="w-5 h-5 rounded-full bg-neutral-200 mr-2 items-center justify-center">
                  <Ionicons
                    name="person"
                    size={10}
                    color={COLORS.NEUTRAL[400]}
                  />
                </View>
              )}
              <Text className="text-neutral-600 text-xs">
                {item.owner.name}
              </Text>
            </View>
          </View>
        </>
      )}
    </TouchableOpacity>
  );
};

export default ItemCard;
