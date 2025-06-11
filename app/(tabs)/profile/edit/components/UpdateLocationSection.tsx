import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../../../../constants/Colors";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import { useUpdateProfileMutation } from "../../../../../redux/api/profileApi";
import CustomInput from "../../../../../components/common/CustomInput";
import Button from "../../../../../components/common/Button";
import * as Location from "expo-location";

// Location validation schema
const LocationSchema = z.object({
  location: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
});

type LocationFormData = z.infer<typeof LocationSchema>;

interface LocationSectionProps {
  profileData: any;
}

const UpdateLocationSection = ({ profileData }: LocationSectionProps) => {
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const [locationLoading, setLocationLoading] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isDirty },
    watch,
  } = useForm<LocationFormData>({
    resolver: zodResolver(LocationSchema),
    defaultValues: {
      location: "",
      latitude: 0,
      longitude: 0,
    },
    mode: "onChange",
  });

  const location = watch("location");
  const latitude = watch("latitude");
  const longitude = watch("longitude");
  const initialLocation = profileData?.location || "";

  const hasLocationChanged =
    (location || "") !== initialLocation && (location || "").trim() !== "";

  useEffect(() => {
    if (profileData) {
      reset({
        location: profileData.location || "",
        latitude: profileData.latitude || 0,
        longitude: profileData.longitude || 0,
      });
    }
  }, [profileData, reset]);

  // Handle form submission
  const handleUpdate = async (data: LocationFormData) => {
    try {
      const formData = new FormData();

      if (
        data.location &&
        data.location !== profileData?.location &&
        data.location.trim() !== ""
      ) {
        formData.append("location", data.location);
      }

      if (data.latitude !== profileData?.latitude) {
        formData.append("latitude", String(data.latitude));
      }

      if (data.longitude !== profileData?.longitude) {
        formData.append("longitude", String(data.longitude));
      }

      if (
        formData.has("location") ||
        formData.has("latitude") ||
        formData.has("longitude")
      ) {
        await updateProfile(formData).unwrap();
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Location Updated",
          textBody: "Your location has been updated",
        });
      }
    } catch (error: any) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Update Failed",
        textBody: error?.data?.message || "Failed to update location",
      });
    }
  };

  // Get address from coordinates using reverse geocoding
  const getAddressFromCoordinates = async (
    latitude: number,
    longitude: number
  ) => {
    try {
      const response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      if (response && response.length > 0) {
        const address = response[0];
        let formattedAddress = "";

        if (address.street) {
          formattedAddress = address.street;
        } else if (address.name) {
          formattedAddress = address.name;
        }

        if (address.district) {
          formattedAddress += formattedAddress
            ? `, ${address.district}`
            : address.district;
        }

        if (address.city) {
          formattedAddress += formattedAddress
            ? `, ${address.city}`
            : address.city;
        }

        if (!formattedAddress && address.region) {
          formattedAddress = address.region;

          if (address.country) {
            formattedAddress += `, ${address.country}`;
          }
        }

        return formattedAddress || "Location found";
      }
      return "Location found";
    } catch (error) {
      console.error("Error getting address:", error);
      return "Location found";
    }
  };

  // Handle getting current location
  const handleGetCurrentLocation = async () => {
    setLocationLoading(true);

    try {
      Toast.show({
        type: ALERT_TYPE.INFO,
        title: "Location",
        textBody: "Getting your current location...",
      });

      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: "Permission Denied",
          textBody: "Please grant location permissions to use this feature.",
        });
        setLocationLoading(false);
        return;
      }

      // Get current position with high accuracy
      const locationData = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const { latitude, longitude } = locationData.coords;

      setValue("latitude", latitude);
      setValue("longitude", longitude);

      // Success notification
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: "Location Found",
        textBody: "Your location has been set",
      });
    } catch (error) {
      console.error("Error getting location:", error);

      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Location Error",
        textBody: "Could not get your current location. Please try again.",
      });
    } finally {
      setLocationLoading(false);
    }
  };

  return (
    <View className="px-6 py-3 mb-4">
      <View className="bg-white rounded-xl border border-neutral-100 overflow-hidden">
        <View className="px-4 py-3 bg-primary-50 border-b border-neutral-200">
          <Text className="text-base font-semibold text-primary-700">
            Location
          </Text>
        </View>
        <View className="p-4">
          {/* Location */}
          <CustomInput
            control={control}
            name="location"
            label="Address"
            placeholder="Enter your address"
            icon="location-outline"
            type="text"
            error={errors.location}
          />

          {/* Display coordinates if available */}
          {latitude !== 0 || longitude !== 0 ? (
            <View className="bg-neutral-50 p-3 rounded-lg mb-4 mt-1">
              <Text className="text-sm text-neutral-500 mb-1">
                Coordinates:
              </Text>
              <View className="flex-row justify-between">
                <View className="flex-row items-center">
                  <Text className="text-neutral-700 font-medium">Lat: </Text>
                  <Text className="text-primary-600">
                    {latitude !== undefined ? latitude.toFixed(4) : "N/A"}
                  </Text>
                </View>
                <View className="flex-row items-center">
                  <Text className="text-neutral-700 font-medium">Long: </Text>
                  <Text className="text-primary-600">
                    {longitude !== undefined ? longitude.toFixed(4) : "N/A"}
                  </Text>
                </View>
              </View>
            </View>
          ) : null}

          {/* Get current Location Button */}
          <TouchableOpacity
            className={`py-3 rounded-lg flex-row items-center justify-center mb-4 ${
              locationLoading ? "bg-primary-100" : "bg-primary-50"
            }`}
            onPress={handleGetCurrentLocation}
            disabled={locationLoading}
            activeOpacity={locationLoading ? 1 : 0.7}
          >
            {locationLoading ? (
              <>
                <ActivityIndicator size="small" color={COLORS.PRIMARY[500]} />
                <Text className="text-primary-600 font-medium ml-2">
                  Getting Location...
                </Text>
              </>
            ) : (
              <>
                <Ionicons name="locate" size={18} color={COLORS.PRIMARY[600]} />
                <Text className="text-primary-600 font-medium ml-2">
                  Get Current Location
                </Text>
              </>
            )}
          </TouchableOpacity>

          {/* Update Button */}
          <Button
            title="Update Location"
            onPress={handleSubmit(handleUpdate)}
            variant="primary"
            fullWidth
            isLoading={isLoading}
            disabled={!hasLocationChanged && !isDirty}
          />
        </View>
      </View>
    </View>
  );
};

export default UpdateLocationSection;
