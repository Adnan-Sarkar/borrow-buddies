import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/Colors";
// import { useSubmitReportMutation } from "@/redux/api/transactionApi";

type ReportModalProps = {
  visible: boolean;
  onClose: () => void;
  transactionId: string;
};

export default function ReportModal({
  visible,
  onClose,
  transactionId,
}: ReportModalProps) {
  const reportTypes = [
    { id: "ITEM_DAMAGE", label: "Item Damage" },
    { id: "LATE_RETURN", label: "Late Return" },
    { id: "PAYMENT_ISSUE", label: "Payment Issue" },
    { id: "BEHAVIOR", label: "Inappropriate Behavior" },
    { id: "OTHER", label: "Other Issue" },
  ];

  const [reportType, setReportType] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const [submitReport] = useSubmitReportMutation();

  const handleSubmitReport = async () => {
    if (!reportType) {
      alert("Please select an issue type");
      return;
    }

    if (!description.trim()) {
      alert("Please provide a description of the issue");
      return;
    }

    try {
      setIsSubmitting(true);
      // await submitReport({
      //   transactionId,
      //   type: reportType,
      //   description: description.trim(),
      // }).unwrap();

      alert("Your report has been submitted");
      resetForm();
      onClose();
    } catch (error) {
      console.error("Failed to submit report:", error);
      alert("Failed to submit report. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setReportType("");
    setDescription("");
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/40 justify-end">
        <View className="bg-white rounded-t-2xl p-5 max-h-[80%]">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-xl font-semibold text-neutral-800">
              Report an Issue
            </Text>
            <TouchableOpacity
              onPress={onClose}
              className="w-8 h-8 rounded-full bg-neutral-100 items-center justify-center"
            >
              <Ionicons name="close" size={18} color={COLORS.NEUTRAL[700]} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <Text className="text-neutral-600 mb-4">
              Please select the type of issue you're experiencing and provide
              details.
            </Text>

            {/* Report Type Selection */}
            <Text className="text-neutral-800 font-medium mb-2">
              Issue Type
            </Text>
            <View className="mb-4">
              {reportTypes.map((type) => (
                <TouchableOpacity
                  key={type.id}
                  onPress={() => setReportType(type.id)}
                  className={`flex-row items-center p-3 rounded-lg mb-2 ${
                    reportType === type.id
                      ? "bg-error-50 border border-error-200"
                      : "bg-neutral-50"
                  }`}
                >
                  <View
                    className={`w-5 h-5 rounded-full mr-3 items-center justify-center ${
                      reportType === type.id ? "bg-error-500" : "bg-neutral-300"
                    }`}
                  >
                    {reportType === type.id && (
                      <Ionicons name="checkmark" size={12} color="white" />
                    )}
                  </View>
                  <Text
                    className={
                      reportType === type.id
                        ? "text-error-800 font-medium"
                        : "text-neutral-700"
                    }
                  >
                    {type.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Description */}
            <View className="mb-5">
              <Text className="text-neutral-800 font-medium mb-2">
                Description
              </Text>
              <TextInput
                value={description}
                onChangeText={setDescription}
                multiline
                className="bg-neutral-50 rounded-lg p-3 min-h-[120px] text-neutral-800"
                placeholder="Please provide details about the issue..."
                placeholderTextColor={COLORS.NEUTRAL[400]}
              />
            </View>
          </ScrollView>

          {/* Submit Button */}
          <TouchableOpacity
            onPress={handleSubmitReport}
            disabled={isSubmitting || !reportType || !description.trim()}
            className={`bg-error-600 rounded-lg py-3.5 items-center mt-3 ${
              isSubmitting || !reportType || !description.trim()
                ? "opacity-70"
                : "opacity-100"
            }`}
          >
            {isSubmitting ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text className="text-white font-medium">Submit Report</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
