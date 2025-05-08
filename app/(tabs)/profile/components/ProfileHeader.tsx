import React from "react";
import { View, Text } from "react-native";

interface ProfileHeaderProps {
  title: string;
}

const ProfileHeader = ({ title }: ProfileHeaderProps) => {
  return (
    <View className="px-6 pt-4 pb-6">
      <Text className="text-2xl font-bold text-neutral-800">{title}</Text>
    </View>
  );
};

export default ProfileHeader;
