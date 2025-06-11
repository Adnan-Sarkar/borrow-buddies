import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/Colors";

type EmptyChatProps = {
  recipientName: string;
};

export default function EmptyChat({ recipientName }: EmptyChatProps) {
  return (
    <View className="flex-1 items-center justify-center p-6">
      <View className="w-16 h-16 rounded-full bg-neutral-100 items-center justify-center mb-3">
        <Ionicons
          name="chatbubble-outline"
          size={32}
          color={COLORS.NEUTRAL[400]}
        />
      </View>
      <Text className="text-neutral-800 font-medium text-center mb-1">
        No Messages Yet
      </Text>
      <Text className="text-neutral-600 text-sm text-center">
        Start the conversation with {recipientName} about this transaction.
      </Text>
    </View>
  );
}
