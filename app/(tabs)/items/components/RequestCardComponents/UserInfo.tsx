import React from "react";
import { View, Text, Image } from "react-native";
import type { UserDetailsType } from "./types";

type UserInfoProps = {
  userDetails: UserDetailsType;
  type: "lendRequest" | "myRequest";
};

export default function UserInfo({ userDetails, type }: UserInfoProps) {
  return (
    <View className="flex-row items-center mb-4 p-2.5 bg-neutral-50 rounded-lg">
      <Image
        source={{ uri: userDetails.imageUrl }}
        className="w-10 h-10 rounded-full"
      />
      <View className="ml-3">
        <Text className="text-neutral-500 text-xs">
          {type === "lendRequest" ? "Request from" : "Item owned by"}
        </Text>
        <Text className="text-neutral-800 font-medium">
          {userDetails.userName}
        </Text>
      </View>
    </View>
  );
}
