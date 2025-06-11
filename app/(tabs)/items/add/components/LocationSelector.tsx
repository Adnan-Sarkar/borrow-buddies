import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Platform,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../../../../constants/Colors";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { Controller } from "react-hook-form";
import type { Control } from "react-hook-form";

type LocationSelectorProps = {
  control: Control<any>;
  name: string;
  error?: any;
  initialLatitude?: number;
  initialLongitude?: number;
};

const LocationSelector: React.FC<LocationSelectorProps> = ({
  control,
  name,
  error,
  initialLatitude,
  initialLongitude,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const mapRef = useRef<MapView | null>(null);

  // Set initial location if provided
  useEffect(() => {
    if (initialLatitude && initialLongitude) {
      setCurrentLocation({
        latitude: initialLatitude,
        longitude: initialLongitude,
      });
    }
  }, [initialLatitude, initialLongitude]);

  // Get user's current location when modal is opened
  const getUserLocation = async (onChange: (value: any) => void) => {
    setIsLoading(true);
    setErrorMsg(null);

    try {
      // Request permission to access location
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        setIsLoading(false);
        return;
      }

      // Get current position
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const { latitude, longitude } = location.coords;

      setCurrentLocation({ latitude, longitude });

      // Get address for the current location
      const address = await reverseGeocode(latitude, longitude);

      onChange({
        latitude,
        longitude,
        location: address,
      });

      // Animate map to the current location
      mapRef.current?.animateToRegion({
        latitude,
        longitude,
        latitudeDelta: 0.002,
        longitudeDelta: 0.002,
      });
    } catch (error) {
      console.error("Error getting location:", error);
      setErrorMsg("Could not get your current location. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Convert coordinates to readable address
  const reverseGeocode = async (
    latitude: number,
    longitude: number
  ): Promise<string> => {
    try {
      const result = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      if (result && result.length > 0) {
        const { street, name, city, region, postalCode, country } = result[0];

        // Create a readable address
        const addressParts = [
          street || name,
          city,
          region,
          postalCode,
          country,
        ].filter(Boolean);

        return addressParts.join(", ");
      }

      return `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
    } catch (error) {
      console.error("Error in reverse geocoding:", error);
      return `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
    }
  };

  // Handle map press to select a location
  const handleMapPress = async (event: any, onChange: (value: any) => void) => {
    const { coordinate } = event.nativeEvent;
    setIsLoading(true);

    try {
      const address = await reverseGeocode(
        coordinate.latitude,
        coordinate.longitude
      );

      onChange({
        latitude: coordinate.latitude,
        longitude: coordinate.longitude,
        location: address,
      });
    } catch (error) {
      console.error("Error selecting location:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const { height } = Dimensions.get("window");

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => {
        // Get current validation state
        const isValid = !error;
        const selectedLocation = value;

        // Confirm the selected location
        const confirmLocation = () => {
          if (selectedLocation) {
            setIsModalVisible(false);
          }
        };

        // Open the modal and get user location
        const openLocationSelector = () => {
          setIsModalVisible(true);
          if (!currentLocation) {
            getUserLocation(onChange);
          }
        };

        return (
          <View className="mb-6">
            <Text className="text-neutral-900 font-bold mb-3">Location</Text>

            <TouchableOpacity
              className={`flex-row items-center justify-between border ${
                !isValid ? "border-red-300" : "border-neutral-200"
              } rounded-lg p-3`}
              onPress={openLocationSelector}
            >
              <Text
                className={`${!isValid ? "text-red-500" : "text-neutral-700"}`}
              >
                {selectedLocation?.location || "Set your pickup location"}
              </Text>
              <Ionicons
                name="location-outline"
                size={20}
                color={!isValid ? "#EF4444" : COLORS.PRIMARY[500]}
              />
            </TouchableOpacity>

            <Text
              className={`text-xs mt-1 ${
                !isValid ? "text-red-500" : "text-neutral-500"
              }`}
            >
              {error?.message ||
                "This is where borrowers will pick up and return your item"}
            </Text>

            {/* Location Picker Modal */}
            <Modal
              visible={isModalVisible}
              transparent
              animationType="slide"
              onRequestClose={() => setIsModalVisible(false)}
            >
              <View className="flex-1 bg-black/50 justify-end">
                <View
                  className="bg-white rounded-t-[20px]"
                  style={{
                    height: height * 0.8,
                    paddingBottom: Platform.OS === "ios" ? 20 : 0,
                  }}
                >
                  {/* Modal Header */}
                  <View className="flex-row justify-between items-center p-4 border-b border-neutral-200">
                    <Text className="text-lg font-bold text-neutral-900">
                      Select Pickup Location
                    </Text>
                    <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                      <Ionicons
                        name="close"
                        size={24}
                        color={COLORS.NEUTRAL[700]}
                      />
                    </TouchableOpacity>
                  </View>

                  {/* Map View Container */}
                  <View className="flex-1 relative">
                    {isLoading && !currentLocation ? (
                      <View className="flex-1 justify-center items-center bg-neutral-100">
                        <ActivityIndicator
                          size="large"
                          color={COLORS.PRIMARY[500]}
                        />
                        <Text className="mt-2.5 text-neutral-700">
                          Getting your location...
                        </Text>
                      </View>
                    ) : errorMsg ? (
                      <View className="flex-1 justify-center items-center bg-neutral-100 p-5">
                        <Ionicons
                          name="alert-circle-outline"
                          size={32}
                          color={COLORS.NEUTRAL[500]}
                        />
                        <Text className="mt-2.5 mb-5 text-neutral-700 text-center">
                          {errorMsg}
                        </Text>
                        <TouchableOpacity
                          className="bg-primary-500 px-5 py-2.5 rounded-lg"
                          onPress={() => getUserLocation(onChange)}
                        >
                          <Text className="text-white font-bold">
                            Try Again
                          </Text>
                        </TouchableOpacity>
                      </View>
                    ) : currentLocation ? (
                      <MapView
                        ref={mapRef}
                        style={styles.map}
                        provider={
                          Platform.OS === "android"
                            ? PROVIDER_GOOGLE
                            : undefined
                        }
                        initialRegion={{
                          latitude: currentLocation.latitude,
                          longitude: currentLocation.longitude,
                          latitudeDelta: 0.002,
                          longitudeDelta: 0.002,
                        }}
                        onPress={(event) => handleMapPress(event, onChange)}
                        zoomEnabled={true}
                        zoomControlEnabled={true}
                        scrollEnabled={true}
                        pitchEnabled={true}
                        rotateEnabled={true}
                      >
                        {/* Current location marker */}
                        <Marker
                          coordinate={{
                            latitude: currentLocation.latitude,
                            longitude: currentLocation.longitude,
                          }}
                          pinColor={COLORS.PRIMARY[500]}
                          title="Your Location"
                        />

                        {/* Selected location marker */}
                        {selectedLocation && (
                          <Marker
                            coordinate={{
                              latitude: selectedLocation.latitude,
                              longitude: selectedLocation.longitude,
                            }}
                            pinColor="#FF9500"
                            title="Pickup Location"
                          />
                        )}
                      </MapView>
                    ) : null}

                    {/* Instructions overlay */}
                    {currentLocation && !isLoading && (
                      <View className="absolute top-2.5 left-0 right-0 items-center">
                        <Text className="bg-black/70 text-white px-4 py-2 rounded-full text-sm font-medium">
                          Tap on the map to set a pickup location
                        </Text>
                      </View>
                    )}

                    {/* Location info */}
                    {selectedLocation && (
                      <View className="absolute bottom-20 left-4 right-4 bg-white rounded-lg p-3 flex-row items-center justify-between shadow-sm">
                        <View className="flex-row items-center flex-1">
                          <Ionicons
                            name="location"
                            size={20}
                            color={COLORS.PRIMARY[500]}
                          />
                          <Text
                            className="ml-2 text-neutral-800 flex-1"
                            numberOfLines={2}
                          >
                            {selectedLocation.location}
                          </Text>
                        </View>

                        {isLoading && (
                          <ActivityIndicator
                            size="small"
                            color={COLORS.PRIMARY[500]}
                          />
                        )}
                      </View>
                    )}
                  </View>

                  {/* Action Buttons */}
                  <View className="flex-row justify-between p-4 border-t border-neutral-200">
                    <TouchableOpacity
                      className="flex-row items-center bg-primary-50 px-3 py-2.5 rounded-lg"
                      onPress={() => getUserLocation(onChange)}
                      disabled={isLoading}
                    >
                      <Ionicons
                        name="navigate"
                        size={20}
                        color={COLORS.PRIMARY[500]}
                      />
                      <Text className="text-primary-500 font-medium ml-1.5">
                        Current Location
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      className={`bg-primary-500 px-5 py-2.5 rounded-lg ${
                        !selectedLocation || isLoading ? "bg-neutral-300" : ""
                      }`}
                      onPress={confirmLocation}
                      disabled={!selectedLocation || isLoading}
                    >
                      <Text className="text-white font-bold">
                        Confirm Location
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});

export default LocationSelector;
