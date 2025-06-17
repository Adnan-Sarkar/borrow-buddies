import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  StyleSheet,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/Colors";
import { useCompleteTransactionRequestMutation } from "@/redux/api/transactionApi";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";

type CompleteTransactionButtonProps = {
  transactionId: string;
  isOwner: boolean;
  status: string;
  onSuccess: () => void;
};

export default function CompleteTransactionButton({
  transactionId,
  isOwner,
  status,
  onSuccess,
}: CompleteTransactionButtonProps) {
  const [isCompleting, setIsCompleting] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [completeTransaction] = useCompleteTransactionRequestMutation();

  // Only show for owners when transaction is ACTIVE
  if (!isOwner || status !== "ACTIVE") {
    return null;
  }

  const handleCompleteTransaction = async () => {
    try {
      setIsCompleting(true);
      const res = await completeTransaction(transactionId);
      console.log(res);
      onSuccess();
      setModalVisible(false);

      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: "Transaction Completed",
        textBody: "The transaction has been successfully marked as complete",
      });
    } catch (error) {
      console.error("Failed to complete transaction:", error);

      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Error",
        textBody: "Failed to complete the transaction. Please try again.",
      });
    } finally {
      setIsCompleting(false);
    }
  };

  return (
    <View className="px-4 my-6">
      <View className="bg-success-50 p-4 rounded-lg mb-3">
        <View className="bg-success-50 p-4 rounded-lg mb-3 border border-success-200">
          <View className="flex-row items-start mb-3">
            <View className="w-10 h-10 rounded-full bg-success-100 items-center justify-center mr-3">
              <Ionicons
                name="information-circle-outline"
                size={24}
                color={COLORS.SUCCESS[600]}
              />
            </View>
            <Text className="text-lg font-medium text-success-800">
              Complete Transaction
            </Text>
          </View>

          <Text className="text-neutral-700 text-base leading-6 mb-3">
            Before marking the transaction as complete, please ensure that your
            product is in the same condition as when it was handed over. This
            helps maintain trust and transparency in our community.
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          className="flex-row items-center justify-center bg-success-500 py-3 rounded-lg mt-2"
          activeOpacity={0.8}
        >
          <Ionicons name="checkmark-circle-outline" size={20} color="white" />
          <Text className="text-white font-medium ml-2">Mark as Complete</Text>
        </TouchableOpacity>
      </View>

      {/* Confirmation Modal */}
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
              {/* Icon */}
              <View style={styles.iconContainer}>
                <Ionicons
                  name="checkmark-circle-outline"
                  size={32}
                  color={COLORS.SUCCESS[500]}
                />
              </View>

              {/* Title and Message */}
              <Text style={styles.title}>Complete Transaction</Text>
              <Text style={styles.message}>
                Are you sure you want to mark this transaction as complete? This
                action can't be undone.
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
                  style={styles.completeButton}
                  onPress={handleCompleteTransaction}
                  disabled={isCompleting}
                >
                  {isCompleting ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <Text style={styles.completeButtonText}>Complete</Text>
                  )}
                </TouchableOpacity>
              </View>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
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
    backgroundColor: COLORS.SUCCESS[50],
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
  completeButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: COLORS.SUCCESS[500],
    alignItems: "center",
  },
  completeButtonText: {
    color: "white",
    fontWeight: "500",
    fontSize: 14,
  },
});
