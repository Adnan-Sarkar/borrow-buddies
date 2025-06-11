import React from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/Colors";
import ItemCard from "./ItemCard";
import { useRouter } from "expo-router";
import { useGetNearbyItemsQuery } from "@/redux/api/itemsApi";
import { useGetMyProfileQuery } from "@/redux/api/profileApi";

const NearbyItemsSection = () => {
  const router = useRouter();

  const { data: myProfileInfo } = useGetMyProfileQuery(
    {},
    {
      selectFromResult: (result) => ({
        ...result,
        data: result?.data?.data,
      }),
    }
  );
  const { data: nearbyItems } = useGetNearbyItemsQuery(
    {
      latitude: myProfileInfo?.latitude,
      longitude: myProfileInfo?.longitude,
      radius: 10,
    },
    {
      selectFromResult: (result) => ({
        ...result,
        data: result?.data?.data,
      }),
    }
  );

  if (!nearbyItems || nearbyItems.length === 0) {
    return null;
  }

  const handleItemPress = (itemId: string | "featured") => {
    if (itemId === "featured") {
      router.push("/items/featured");
    } else {
      router.push(`/items/${itemId}`);
    }
  };

  const handleMapPress = () => {
    router.push("/items/map");
  };

  return (
    <View className="mt-8">
      {/* Header */}
      <View className="flex-row items-center justify-between px-5 mb-4">
        <View>
          <Text className="text-xl font-bold text-neutral-900">
            Nearby Items
          </Text>
          <Text className="text-neutral-500 text-xs mt-1">
            Available for borrowing in your area
          </Text>
        </View>

        <TouchableOpacity
          className="flex-row items-center bg-primary-50 px-3 py-1.5 rounded-full"
          onPress={handleMapPress}
        >
          <Ionicons name="map-outline" size={16} color={COLORS.PRIMARY[600]} />
          <Text className="text-primary-600 font-medium ml-1 text-sm">
            Map View
          </Text>
        </TouchableOpacity>
      </View>

      {/* Empty state when no nearby items */}
      {nearbyItems?.length === 0 ? null : (
        <FlatList
          data={nearbyItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ItemCard
              item={item}
              onPress={() => handleItemPress(item.id)}
              className="mb-4"
              horizontal
            />
          )}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 8 }}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View className="h-4" />}
          nestedScrollEnabled={true}
          style={{ paddingLeft: 20, paddingRight: 20 }}
        />
      )}
    </View>
  );
};

export default NearbyItemsSection;
