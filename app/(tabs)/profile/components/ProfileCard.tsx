import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { router } from "expo-router";
import { useGetMyProfileQuery } from "@/redux/api/profileApi";
import { COLORS } from "../../../../constants/Colors";

const ProfileCard = () => {
  const { data, isLoading } = useGetMyProfileQuery({});

  const renderProfileImage = () => {
    if (isLoading) {
      return (
        <View className="w-20 h-20 rounded-full bg-primary-100 items-center justify-center">
          <ActivityIndicator color={COLORS.PRIMARY[500]} />
        </View>
      );
    }

    if (data?.profilePicture) {
      return (
        <Image
          source={{ uri: data.profilePicture }}
          className="w-20 h-20 rounded-full border-2 border-white"
        />
      );
    } else {
      // Create initial avatar with first letter of name
      const initial = data?.name ? data.name.charAt(0).toUpperCase() : "U";

      return (
        <View className="w-20 h-20 rounded-full bg-primary-500 items-center justify-center border-2 border-white">
          <Text className="text-3xl font-bold text-white">{initial}</Text>
        </View>
      );
    }
  };

  // Dummy stats data
  const stats = {
    lent: 0,
    borrowed: 0,
    rating: 0,
  };

  return (
    <View className="mx-6 bg-primary-50 p-6 rounded-2xl mb-6">
      <View className="flex-row items-center">
        {renderProfileImage()}
        <View className="ml-4 flex-1">
          <Text className="text-xl font-bold text-neutral-800">
            {isLoading ? "Loading..." : data?.name || "User"}
          </Text>
          <Text className="text-neutral-500">
            {isLoading ? "..." : data?.email || "No email"}
          </Text>
          <TouchableOpacity
            className="bg-primary-500 py-1.5 px-3 rounded-full mt-2 self-start"
            onPress={() => router.push("/profile/edit")}
          >
            <Text className="text-white font-medium text-xs">Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Stats Row */}
      <View className="flex-row justify-between mt-6 pt-4 border-t border-primary-100">
        <View className="items-center">
          <Text className="text-lg font-bold text-neutral-800">
            {stats.lent}
          </Text>
          <Text className="text-neutral-500 text-sm">Items Lent</Text>
        </View>
        <View className="items-center">
          <Text className="text-lg font-bold text-neutral-800">
            {stats.borrowed}
          </Text>
          <Text className="text-neutral-500 text-sm">Items Borrowed</Text>
        </View>
        <View className="items-center">
          <Text className="text-lg font-bold text-neutral-800">
            {stats.rating}
          </Text>
          <Text className="text-neutral-500 text-sm">Rating</Text>
        </View>
      </View>
    </View>
  );
};

export default ProfileCard;
