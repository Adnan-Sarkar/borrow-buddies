import { View, Text, TouchableOpacity, Linking, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/Colors";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

type TransactionLocation = {
  destinationLocation: string;
  destinationLatitude: number;
  destinationLongitude: number;
};

export default function TransactionLocation({
  destinationLocation,
  destinationLatitude,
  destinationLongitude,
}: TransactionLocation) {
  const openInMapsApp = () => {
    // Open native maps app
    const scheme = Platform.OS === "ios" ? "maps:" : "geo:";
    const url =
      Platform.OS === "ios"
        ? `${scheme}?daddr=${destinationLatitude},${destinationLongitude}`
        : `${scheme}0,0?q=${destinationLatitude},${destinationLongitude}(Pickup Location)`;

    Linking.openURL(url);
  };

  return (
    <View className="px-4 mt-6">
      <Text className="text-neutral-800 font-semibold text-lg mb-3">
        Pickup Location
      </Text>

      <View className="flex-row items-center mb-3 border border-primary-200 rounded-md py-2 px-3">
        <Ionicons
          name="location-outline"
          size={16}
          color={COLORS.PRIMARY[600]}
          style={{ marginRight: 6 }}
        />
        <Text className="text-neutral-700 flex-1">{destinationLocation}</Text>
      </View>

      <View className="h-[220px] rounded-lg overflow-hidden">
        <MapView
          provider={Platform.OS === "android" ? PROVIDER_GOOGLE : undefined}
          initialRegion={{
            latitude: destinationLatitude,
            longitude: destinationLongitude,
            latitudeDelta: 0.003,
            longitudeDelta: 0.003,
          }}
          style={{ width: "100%", height: "100%" }}
        >
          {/* Destination location */}
          <Marker
            coordinate={{
              latitude: destinationLatitude,
              longitude: destinationLongitude,
            }}
            title="Pickup Location"
            description={destinationLocation}
          />
        </MapView>

        {/* Navigation button overlay */}
        <View className="absolute bottom-3 right-3">
          <TouchableOpacity
            onPress={openInMapsApp}
            className="bg-primary-500 px-4 py-2 rounded-md flex-row items-center"
          >
            <Ionicons
              name="navigate"
              size={16}
              color="white"
              style={{ marginRight: 4 }}
            />
            <Text className="text-white font-medium">Navigate</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
