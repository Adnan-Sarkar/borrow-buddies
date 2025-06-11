import React from "react";
import { View, Text, TouchableOpacity, StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { format } from "date-fns";

type StatusBannerProps = {
  status: string;
  startDate?: string;
  endDate?: string;
};

export default function StatusBanner({
  status,
  startDate,
  endDate,
}: StatusBannerProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // Simplified status info helpers
  const getBgColor = () => {
    switch (status) {
      case "APPROVED":
        return COLORS.SUCCESS[500];
      case "ACTIVE":
        return COLORS.PRIMARY[500];
      case "COMPLETED":
        return COLORS.NEUTRAL[700];
      case "REJECTED":
        return COLORS.ERROR[500];
      default:
        return COLORS.NEUTRAL[600];
    }
  };

  const getIcon = () => {
    switch (status) {
      case "APPROVED":
        return "checkmark-circle";
      case "ACTIVE":
        return "checkmark-done-circle";
      case "COMPLETED":
        return "checkbox";
      case "REJECTED":
        return "close-circle";
      default:
        return "help-circle";
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "APPROVED":
        return "Your request has been approved";
      case "ACTIVE":
        return "Rental is active";
      case "COMPLETED":
        return "Transaction completed";
      case "REJECTED":
        return "Your request has been declined";
      default:
        return "Status unavailable";
    }
  };

  // Calculate remaining time
  const getTimeInfo = () => {
    if (
      (status === "APPROVED" || status === "ACTIVE") &&
      startDate &&
      endDate
    ) {
      const now = new Date();
      const start = new Date(startDate);
      const end = new Date(endDate);

      if (now < start) {
        const daysToStart = Math.ceil(
          (start.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
        );
        return `Starts in ${daysToStart} ${daysToStart === 1 ? "day" : "days"}`;
      } else if (now <= end) {
        const daysRemaining = Math.ceil(
          (end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
        );
        return `${daysRemaining} ${
          daysRemaining === 1 ? "day" : "days"
        } remaining`;
      } else {
        return "Rental period has ended";
      }
    }
    return null;
  };

  // Format dates
  const formattedStartDate = startDate
    ? format(new Date(startDate), "MMM d, yyyy")
    : null;
  const formattedEndDate = endDate
    ? format(new Date(endDate), "MMM d, yyyy")
    : null;

  // Get values
  const backgroundColor = getBgColor();
  const icon = getIcon();
  const statusText = getStatusText();
  const timeInfo = getTimeInfo();

  // Get card styling
  const getCardStyles = () => {
    switch (status) {
      case "APPROVED":
        return {
          bgColor: "bg-success-50",
          borderColor: "border-success-200",
          iconColor: COLORS.SUCCESS[600],
        };
      case "ACTIVE":
        return {
          bgColor: "bg-primary-50",
          borderColor: "border-primary-200",
          iconColor: COLORS.PRIMARY[600],
        };
      case "COMPLETED":
        return {
          bgColor: "bg-neutral-50",
          borderColor: "border-neutral-200",
          iconColor: COLORS.NEUTRAL[800],
        };
      case "REJECTED":
        return {
          bgColor: "bg-error-50",
          borderColor: "border-error-200",
          iconColor: COLORS.ERROR[600],
        };
      default:
        return {
          bgColor: "bg-neutral-50",
          borderColor: "border-neutral-200",
          iconColor: COLORS.NEUTRAL[600],
        };
    }
  };

  const cardStyles = getCardStyles();

  return (
    <View>
      {/* Header */}
      <View style={{ paddingTop: insets.top, backgroundColor }}>
        <StatusBar barStyle="dark-content" />
        <View className="flex-row items-center justify-between px-4 py-3">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-9 h-9 rounded-full bg-black/20 items-center justify-center"
          >
            <Ionicons name="arrow-back" size={20} color="white" />
          </TouchableOpacity>
          <Text className="text-white font-bold text-lg">
            Transaction Details
          </Text>
          <View className="w-9 h-9" />
        </View>

        {/* Status */}
        <View className="px-4 py-3 pb-14">
          <View className="flex-row items-center justify-center bg-white/20 rounded-lg px-3 py-2">
            <Ionicons name={icon as any} size={18} color="white" />
            <Text className="text-white font-semibold ml-2">{statusText}</Text>
          </View>
        </View>
      </View>

      {/* Timeline Info */}
      {timeInfo && (
        <View
          className={`mx-4 -mt-10 rounded-xl ${cardStyles.bgColor} border ${cardStyles.borderColor} overflow-hidden shadow-md`}
          style={{ elevation: 3 }}
        >
          <View className="p-4">
            {/* Time info card */}
            <View className="flex-row items-center bg-white/80 rounded-lg p-3">
              <View
                className="w-9 h-9 rounded-full items-center justify-center mr-3"
                style={{ backgroundColor: `${cardStyles.iconColor}20` }}
              >
                <Ionicons
                  name="time-outline"
                  size={20}
                  color={cardStyles.iconColor}
                />
              </View>
              <View className="flex-1">
                <Text className="text-neutral-800 font-medium">{timeInfo}</Text>
                <Text className="text-neutral-600 text-xs mt-0.5">
                  {status === "APPROVED" ? "Pickup date" : "Return date"}:{" "}
                  {status === "APPROVED"
                    ? formattedStartDate
                    : formattedEndDate}
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}
