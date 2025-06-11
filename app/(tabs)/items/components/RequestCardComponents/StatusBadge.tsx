import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getStatusInfo } from "./utils";

type StatusBadgeProps = {
  status: string;
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const statusInfo = getStatusInfo(status);

  return (
    <View
      className={`absolute top-3 left-3 ${statusInfo.bgColor} border ${statusInfo.borderColor} rounded-full flex-row items-center px-3 py-1.5`}
    >
      <Ionicons name={statusInfo.icon} size={14} color={statusInfo.iconColor} />
      <Text className={`${statusInfo.textColor} text-xs font-medium ml-1`}>
        {statusInfo.label}
      </Text>
    </View>
  );
}
