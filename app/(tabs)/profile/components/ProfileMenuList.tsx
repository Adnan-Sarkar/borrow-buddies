import React from "react";
import { View } from "react-native";
import ProfileMenuItem from "./ProfileMenuItem";
import type { ProfileMenuItemProps } from "./ProfileMenuItem";
import { router } from "expo-router";

interface ProfileMenuListProps {
  items: (Omit<ProfileMenuItemProps, "isLast" | "onPress"> & {
    route: string;
  })[];
}

const ProfileMenuList = ({ items }: ProfileMenuListProps) => {
  return (
    <View className="mx-6">
      {items.map((item, index) => (
        <ProfileMenuItem
          key={index}
          {...item}
          isLast={index === items.length - 1}
          onPress={() => router.push(item.route as any)}
        />
      ))}
    </View>
  );
};

export default ProfileMenuList;
