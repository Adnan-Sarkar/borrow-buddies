import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/Colors";

type ChatHeaderProps = {
  onClose: () => void;
  recipientName: string;
  profilePicture?: string;
};

export default function ChatHeader({
  onClose,
  recipientName,
  profilePicture,
}: ChatHeaderProps) {
  return (
    <View
      style={{
        borderBottomColor: COLORS.NEUTRAL[200],
        borderBottomWidth: 1,
      }}
    >
      <View className="px-4 py-3 flex-row items-center">
        <TouchableOpacity
          onPress={onClose}
          className="mr-3"
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.NEUTRAL[800]} />
        </TouchableOpacity>

        {/* Profile Picture */}
        {profilePicture ? (
          <Image
            source={{ uri: profilePicture }}
            className="w-12 h-12 rounded-full mr-3"
            resizeMode="cover"
          />
        ) : (
          <View className="w-9 h-9 rounded-full bg-neutral-200 items-center justify-center mr-3">
            <Text className="text-neutral-600 font-medium">
              {recipientName.charAt(0).toUpperCase()}
            </Text>
          </View>
        )}

        <Text className="text-lg font-semibold flex-1" numberOfLines={1}>
          {recipientName}
        </Text>
      </View>
    </View>
  );
}
