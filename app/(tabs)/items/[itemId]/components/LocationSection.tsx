import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../../../../constants/Colors";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Platform } from "react-native";

interface LocationSectionProps {
  location: string;
  latitude: number;
  longitude: number;
}

export default function LocationSection({
  location,
  latitude,
  longitude,
}: LocationSectionProps) {
  return (
    <View className="mb-10">
      <View className="flex-row items-center mb-4">
        <View className="flex-1 h-[1px] bg-neutral-200" />
        <Text className="mx-3 text-neutral-700 font-semibold">Location</Text>
        <View className="flex-1 h-[1px] bg-neutral-200" />
      </View>
      <View className="flex-row items-center mb-3 border border-primary-200 rounded-md py-2 px-3">
        <Ionicons
          name="location-outline"
          size={16}
          color={COLORS.PRIMARY[600]}
          style={{ marginRight: 6 }}
        />
        <Text className="text-neutral-700 flex-1">{location}</Text>
      </View>

      <View className="h-[180px] rounded-lg overflow-hidden">
        <MapView
          provider={Platform.OS === "android" ? PROVIDER_GOOGLE : undefined}
          initialRegion={{
            latitude,
            longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          style={{ width: "100%", height: "100%" }}
        >
          <Marker
            coordinate={{
              latitude,
              longitude,
            }}
          />
        </MapView>
        <View className="absolute inset-0 flex items-center justify-center bg-white/60">
          <Text className="text-neutral-700 text-center px-4">
            Exact location will be shared after booking
          </Text>
        </View>
      </View>
    </View>
  );
}
