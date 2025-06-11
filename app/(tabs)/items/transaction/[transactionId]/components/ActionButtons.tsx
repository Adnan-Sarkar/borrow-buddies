import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/Colors";

type ActionButtonsProps = {
  status: string;
  isOwner: boolean;
  isBorrower: boolean;
  canReview: boolean;
  onChatPress: () => void;
  onReviewPress: () => void;
  onReportPress: () => void;
};

export default function ActionButtons({
  status,
  isOwner,
  isBorrower,
  canReview,
  onChatPress,
  onReviewPress,
  onReportPress,
}: ActionButtonsProps) {
  return (
    <View className="p-4 border-t border-neutral-200 bg-white">
      <View className="flex-row gap-3">
        <TouchableOpacity
          onPress={onChatPress}
          className="flex-1 bg-primary-600 py-3 rounded-lg flex-row items-center justify-center"
        >
          <Ionicons name="chatbubble-outline" size={18} color="white" />
          <Text className="ml-2 text-white font-medium">Message</Text>
        </TouchableOpacity>

        {canReview ? (
          <TouchableOpacity
            onPress={onReviewPress}
            className="flex-1 bg-success-100 py-3 rounded-lg flex-row items-center justify-center border border-success-200"
          >
            <Ionicons
              name="star-outline"
              size={18}
              color={COLORS.SUCCESS[700]}
            />
            <Text className="ml-2 text-success-700 font-medium">Review</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={onReportPress}
            className="flex-1 bg-neutral-100 py-3 rounded-lg flex-row items-center justify-center border border-neutral-200"
          >
            <Ionicons
              name="flag-outline"
              size={18}
              color={COLORS.NEUTRAL[700]}
            />
            <Text className="ml-2 text-neutral-700 font-medium">
              Report Issue
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
