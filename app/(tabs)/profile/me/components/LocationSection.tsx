import React, { useState } from "react";
import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  Linking,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../../../../constants/Colors";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

interface LocationSectionProps {
  location?: string;
  latitude?: number;
  longitude?: number;
  name?: string;
}

const LocationSection = ({
  location,
  latitude,
  longitude,
  name = "Location",
}: LocationSectionProps) => {
  const hasCoordinates = latitude !== undefined && longitude !== undefined;
  const [expandedMap, setExpandedMap] = useState(false);
  const [mapRegion, setMapRegion] = useState({
    latitude: latitude || 0,
    longitude: longitude || 0,
    latitudeDelta: 0.008,
    longitudeDelta: 0.008,
  });

  if (!location && !hasCoordinates) {
    return null;
  }

  const mapHeight = expandedMap ? 300 : 180;

  return (
    <View className="bg-white rounded-xl shadow-sm overflow-hidden mb-4 border border-neutral-100">
      <View className="bg-secondary-50 px-4 py-3 border-b border-neutral-200">
        <Text className="text-secondary-700 font-semibold text-base">
          Location
        </Text>
      </View>
      <View className="p-4">
        <View className="flex-row items-center">
          <View className="w-8 h-8 bg-secondary-50 rounded-full items-center justify-center mr-3">
            <Ionicons
              name="location-outline"
              size={16}
              color={COLORS.SECONDARY[600]}
            />
          </View>
          {location ? (
            <View className="flex-1">
              <Text className="text-neutral-800">{location}</Text>
              {hasCoordinates && (
                <Text className="text-xs text-neutral-500 mt-1">
                  {latitude.toFixed(4)}, {longitude.toFixed(4)}
                </Text>
              )}
            </View>
          ) : (
            <Text className="text-neutral-600 italic">
              No location information provided
            </Text>
          )}
        </View>

        {/* Map View */}
        {hasCoordinates && (
          <View className="mt-4 rounded-lg overflow-hidden border border-neutral-200">
            <MapView
              style={{ width: "100%", height: mapHeight }}
              provider={PROVIDER_GOOGLE}
              initialRegion={mapRegion}
              region={mapRegion}
              onRegionChangeComplete={(region) => {
                setMapRegion(region);
              }}
              scrollEnabled={true}
              zoomEnabled={true}
              rotateEnabled={true}
              pitchEnabled={true}
              showsCompass={true}
              showsScale={true}
              showsMyLocationButton={true}
              showsUserLocation={false}
            >
              <Marker
                coordinate={{
                  latitude,
                  longitude,
                }}
                title={name}
                description={location}
                pinColor={COLORS.PRIMARY[500]}
              >
                <View className="bg-primary-500 rounded-full p-2 border-2 border-white">
                  <Ionicons name="location" size={16} color="#fff" />
                </View>
              </Marker>
            </MapView>

            {/* Control buttons */}
            <View className="absolute bottom-2 left-2 flex-row">
              <TouchableOpacity
                className="bg-white rounded-full p-2 shadow-md mr-2"
                onPress={() => setExpandedMap(!expandedMap)}
              >
                <Ionicons
                  name={expandedMap ? "contract" : "expand"}
                  size={18}
                  color={COLORS.PRIMARY[600]}
                />
              </TouchableOpacity>

              {/* Open in Maps app */}
              <TouchableOpacity
                className="bg-white rounded-full p-2 shadow-md"
                onPress={() => {
                  const scheme = Platform.OS === "ios" ? "maps:" : "geo:";
                  const url = `${scheme}${latitude},${longitude}`;
                  Linking.openURL(url);
                }}
              >
                <Ionicons
                  name="navigate"
                  size={18}
                  color={COLORS.PRIMARY[600]}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default LocationSection;
