import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { formatDate } from "@/utils/dateUtils";

type NotificationItemProps = {
  notification: {
    id: string;
    isRead: boolean;
    title: string;
    body: string;
    createdAt: string;
    sender?: {
      name: string;
      profilePicture?: string;
    };
    data?: any;
  };
  onPress: (id: string) => void;
};

const NotificationItem = ({ notification, onPress }: NotificationItemProps) => {
  const { id, isRead, body, createdAt, sender } = notification;

  const hasSender = !!sender && !!sender.name;
  const hasProfilePicture = hasSender && !!sender.profilePicture;

  return (
    <TouchableOpacity
      className={`p-4 border-b border-neutral-100 ${
        !isRead ? "bg-neutral-100" : ""
      }`}
      onPress={() => onPress(id)}
    >
      <View className="flex-row">
        {hasProfilePicture ? (
          <Image
            source={{
              uri: sender?.profilePicture,
              headers: { "Cache-Control": "no-cache" },
            }}
            className="w-10 h-10 rounded-full mr-3"
          />
        ) : (
          <View className="w-10 h-10 rounded-full mr-3 bg-primary-500 items-center justify-center">
            <Text className="text-lg font-bold text-white">
              {sender?.name?.charAt(0).toUpperCase()}
            </Text>
          </View>
        )}

        <View className="flex-1">
          <Text className="text-neutral-600 font-semibold mt-1">{body}</Text>
          <Text className="text-neutral-500 text-xs mt-2">
            {formatDate(createdAt)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default NotificationItem;
