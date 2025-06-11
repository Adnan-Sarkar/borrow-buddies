import React from "react";
import { View, Text } from "react-native";

type DateSeparatorProps = {
  date: string;
};

export default function DateSeparator({ date }: DateSeparatorProps) {
  const formatDate = (dateString: string) => {
    const dateObj = new Date(dateString);
    return dateObj.toLocaleDateString([], {
      weekday: "long",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <View className="py-2 items-center">
      <Text className="text-neutral-500 text-xs">{formatDate(date)}</Text>
    </View>
  );
}
