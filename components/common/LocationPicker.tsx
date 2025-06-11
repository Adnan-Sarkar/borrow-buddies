import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/Colors";

type LocationPickerProps = {
  initialLocation?: string;
  initialCoordinates?: {
    latitude: number;
    longitude: number;
  };
  onLocationSelect: (
    location: string,
    latitude: number,
    longitude: number
  ) => void;
};

const LocationPicker = ({
  initialLocation = "",
  initialCoordinates,
  onLocationSelect,
}: LocationPickerProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [location, setLocation] = useState(initialLocation);

  const defaultLat = initialCoordinates?.latitude || 23.8041;
  const defaultLng = initialCoordinates?.longitude || 90.4152;

  const [latitude, setLatitude] = useState(defaultLat.toString());
  const [longitude, setLongitude] = useState(defaultLng.toString());

  const handleSave = () => {
    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);

    if (isNaN(lat) || isNaN(lng) || !location.trim()) {
      return;
    }

    onLocationSelect(location, lat, lng);
    setModalVisible(false);
  };

  return (
    <View className="mb-6">
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        className="bg-primary-50 py-3 px-4 rounded-lg border border-primary-100 flex-row items-center justify-center"
        activeOpacity={0.7}
      >
        <Ionicons name="location" size={20} color={COLORS.PRIMARY[600]} />
        <Text className="text-primary-600 font-medium ml-2">
          {location ? "Change Location" : "Set Your Location"}
        </Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Add Location</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color={COLORS.NEUTRAL[700]} />
              </TouchableOpacity>
            </View>

            <View style={styles.form}>
              <Text style={styles.label}>Location Name</Text>
              <TextInput
                style={styles.input}
                value={location}
                onChangeText={setLocation}
                placeholder="e.g., Home, Office, etc."
              />

              <Text style={styles.label}>Latitude</Text>
              <TextInput
                style={styles.input}
                value={latitude}
                onChangeText={setLatitude}
                placeholder="Enter latitude"
                keyboardType="numeric"
              />

              <Text style={styles.label}>Longitude</Text>
              <TextInput
                style={styles.input}
                value={longitude}
                onChangeText={setLongitude}
                placeholder="Enter longitude"
                keyboardType="numeric"
              />

              <Text style={styles.note}>
                Note: In the future, we'll implement a map-based location
                picker.
              </Text>
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Save Location</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    width: "85%",
    maxWidth: 400,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.NEUTRAL[800],
  },
  form: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.NEUTRAL[700],
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.NEUTRAL[200],
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: COLORS.NEUTRAL[50],
  },
  saveButton: {
    backgroundColor: COLORS.PRIMARY[500],
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  note: {
    fontSize: 12,
    color: COLORS.NEUTRAL[500],
    marginBottom: 16,
    fontStyle: "italic",
  },
});

export default LocationPicker;
