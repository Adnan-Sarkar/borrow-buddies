import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/Colors";
import { formatDate } from "./types";

type StatusTimelineProps = {
  status: string;
  updatedAt: string;
};

export default function StatusTimeline({
  status,
  updatedAt,
}: StatusTimelineProps) {
  const getStatusConfig = () => {
    switch (status) {
      case "APPROVED":
        return {
          icon: "checkmark-circle",
          color: COLORS.SUCCESS[500],
          bgColor: COLORS.SUCCESS[50],
          borderColor: COLORS.SUCCESS[200],
          title: "Request Approved",
          description:
            "Your request has been approved. The item is now available for pickup.",
        };
      case "REJECTED":
        return {
          icon: "close-circle",
          color: COLORS.ERROR[500],
          bgColor: COLORS.ERROR[50],
          borderColor: COLORS.ERROR[200],
          title: "Request Rejected",
          description: "Your request has been declined by the owner.",
        };
      case "COMPLETED":
        return {
          icon: "checkbox",
          color: COLORS.NEUTRAL[600],
          bgColor: COLORS.NEUTRAL[50],
          borderColor: COLORS.NEUTRAL[200],
          title: "Rental Completed",
          description: "This transaction has been successfully completed.",
        };
      default:
        return {
          icon: "ellipsis-horizontal-circle",
          color: COLORS.NEUTRAL[500],
          bgColor: COLORS.NEUTRAL[50],
          borderColor: COLORS.NEUTRAL[200],
          title: "Status Updated",
          description: "Your request status has been updated.",
        };
    }
  };

  const statusConfig = getStatusConfig();
  const formattedTime = new Date(updatedAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const formattedDate = formatDate(updatedAt);

  return (
    <View
      className={`rounded-lg p-3 border`}
      style={{
        backgroundColor: statusConfig.bgColor,
        borderColor: statusConfig.borderColor,
      }}
    >
      <View className="flex-row items-center mb-2">
        <View
          className="w-7 h-7 rounded-full items-center justify-center mr-2"
          style={{ backgroundColor: `${statusConfig.color}20` }}
        >
          <Ionicons
            name={statusConfig.icon as any}
            size={16}
            color={statusConfig.color}
          />
        </View>
        <View>
          <Text className="text-neutral-800 font-semibold">
            {statusConfig.title}
          </Text>
          <Text className="text-neutral-500 text-xs">
            {formattedDate} at {formattedTime}
          </Text>
        </View>
      </View>

      <Text className="text-neutral-600 text-xs ml-9">
        {statusConfig.description}
      </Text>
    </View>
  );
}
