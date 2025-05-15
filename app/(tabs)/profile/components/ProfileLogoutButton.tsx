import React, { useState } from "react";
import {
  TouchableOpacity,
  Text,
  View,
  Modal,
  StyleSheet,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../../../constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppDispatch } from "../../../../redux/store";
import { clearCredentials } from "../../../../redux/feature/auth/authSlice";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import { router } from "expo-router";
import baseApi from "@/redux/api/baseApi";

const ProfileLogoutButton = () => {
  const dispatch = useAppDispatch();
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogout = async () => {
    try {
      dispatch(baseApi.util.resetApiState());
      dispatch(clearCredentials());

      await AsyncStorage.removeItem("authToken");
      await AsyncStorage.removeItem("user");

      setModalVisible(false);

      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: "Logged Out",
        textBody: "You have been successfully logged out",
      });

      router.replace("/auth/login");
    } catch (error) {
      console.error("Logout error:", error);
      setModalVisible(false);

      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Error",
        textBody: "Failed to log out. Please try again.",
      });
    }
  };

  return (
    <>
      <TouchableOpacity
        className="flex-row items-center py-4"
        onPress={() => setModalVisible(true)}
        activeOpacity={0.7}
      >
        <View className="w-10 h-10 bg-red-100 rounded-full items-center justify-center">
          <Ionicons
            name="log-out-outline"
            size={20}
            color={COLORS.ERROR[500]}
          />
        </View>
        <View className="flex-1 ml-3">
          <Text className="text-red-500 font-medium">Log Out</Text>
          <Text className="text-neutral-500 text-sm">
            Sign out of your account
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color={COLORS.ERROR[400]} />
      </TouchableOpacity>

      {/* Confirmation modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <Pressable
              style={styles.modalContent}
              onPress={(e) => e.stopPropagation()}
            >
              {/* Warning Icon */}
              <View style={styles.iconContainer}>
                <Ionicons
                  name="warning-outline"
                  size={32}
                  color={COLORS.WARNING[500]}
                />
              </View>

              {/* Title and Message */}
              <Text style={styles.title}>Log Out</Text>
              <Text style={styles.message}>
                Are you sure you want to log out?
              </Text>

              {/* Buttons */}
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.logoutButton}
                  onPress={handleLogout}
                >
                  <Text style={styles.logoutButtonText}>Log Out</Text>
                </TouchableOpacity>
              </View>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    maxWidth: 340,
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.WARNING[50],
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.NEUTRAL[800],
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
    color: COLORS.NEUTRAL[600],
    textAlign: "center",
    marginBottom: 24,
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: COLORS.NEUTRAL[100],
    alignItems: "center",
  },
  cancelButtonText: {
    color: COLORS.NEUTRAL[700],
    fontWeight: "500",
    fontSize: 14,
  },
  logoutButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: COLORS.ERROR[500],
    alignItems: "center",
  },
  logoutButtonText: {
    color: "white",
    fontWeight: "500",
    fontSize: 14,
  },
});

export default ProfileLogoutButton;
