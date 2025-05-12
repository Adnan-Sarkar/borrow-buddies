import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  Linking,
  TouchableOpacity,
} from "react-native";
import { Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../../../constants/Colors";
import { ActivityIndicator } from "react-native";
import { useGetMyProfileQuery } from "@/redux/api/profileApi";
import LocationSection from "./components/LocationSection";

export default function ProfileViewScreen() {
  const {
    data: profile,
    isLoading,
    error,
  } = useGetMyProfileQuery(
    {},
    {
      selectFromResult: (result) => ({
        ...result,
        data: result?.data?.data,
      }),
    }
  );

  const renderProfileImage = () => {
    if (profile?.profilePicture) {
      return (
        <Image
          source={{ uri: profile.profilePicture }}
          className="w-24 h-24 rounded-full"
        />
      );
    } else {
      const firstLetter = profile?.name?.charAt(0) || "U";
      return (
        <View className="w-24 h-24 rounded-full bg-primary-500 items-center justify-center border border-1 border-white">
          <Text className="text-white text-3xl font-bold">{firstLetter}</Text>
        </View>
      );
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-neutral-50">
        <Stack.Screen options={{ title: "My Profile" }} />
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color={COLORS.PRIMARY[500]} />
          <Text className="mt-4 text-neutral-600">Loading profile...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1 bg-neutral-50">
        <Stack.Screen options={{ title: "My Profile" }} />
        <View className="flex-1 items-center justify-center p-4">
          <Ionicons name="alert-circle" size={48} color={COLORS.ERROR[500]} />
          <Text className="mt-4 text-center text-neutral-800 font-medium text-lg">
            Failed to load profile
          </Text>
          <Text className="mt-2 text-center text-neutral-600">
            Please check your internet connection and try again.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-neutral-50">
      <Stack.Screen
        options={{
          title: "My Profile",
          headerTitleStyle: {
            fontWeight: "600",
          },
        }}
      />

      <ScrollView className="flex-1">
        {/* Profile Header */}
        <View className="bg-primary-500 p-6 pb-16">
          <View className="items-center">
            {renderProfileImage()}
            <Text className="mt-4 text-white text-2xl font-bold">
              {profile?.name}
            </Text>
            {profile?.email && (
              <View className="flex-row items-center mt-1">
                <Ionicons
                  name="mail-outline"
                  size={14}
                  color="rgba(255,255,255,0.9)"
                />
                <Text className="text-white text-sm ml-1 opacity-90">
                  {profile.email}
                </Text>
              </View>
            )}
          </View>
        </View>

        <View className="px-4 -mt-10">
          {/* Contact Information Section */}
          <View className="bg-white rounded-xl shadow-sm overflow-hidden mb-4 border border-neutral-100">
            <View className="bg-primary-50 px-4 py-3 border-b border-neutral-200">
              <Text className="text-primary-700 font-semibold text-base">
                Contact Information
              </Text>
            </View>
            <View className="p-4">
              <View className="grid grid-cols-2 gap-4">
                <View className="flex-row items-center">
                  <View className="w-8 h-8 bg-primary-50 rounded-full items-center justify-center">
                    <Ionicons
                      name="mail-outline"
                      size={16}
                      color={COLORS.PRIMARY[600]}
                    />
                  </View>
                  <View className="ml-2">
                    <Text className="text-xs text-neutral-500">Email</Text>
                    <Text className="text-neutral-800">
                      {profile?.email || "Not provided"}
                    </Text>
                  </View>
                </View>

                {profile?.phoneNumber && (
                  <View className="flex-row items-center">
                    <View className="w-8 h-8 bg-primary-50 rounded-full items-center justify-center">
                      <Ionicons
                        name="call-outline"
                        size={16}
                        color={COLORS.PRIMARY[600]}
                      />
                    </View>

                    <View className="ml-2">
                      <Text className="text-xs text-neutral-500">Phone</Text>
                      <Text className="text-neutral-800">
                        {profile?.phoneNumber}
                      </Text>
                    </View>
                  </View>
                )}
              </View>

              {profile?.phoneNumber && (
                <TouchableOpacity
                  className="mt-3 bg-primary-50 py-2 rounded-lg flex-row justify-center items-center"
                  onPress={() => Linking.openURL(`tel:${profile.phoneNumber}`)}
                >
                  <Ionicons name="call" size={16} color={COLORS.PRIMARY[600]} />
                  <Text className="text-primary-600 font-medium ml-2">
                    Call
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* About Section */}
          {profile?.bio && (
            <View className="bg-white rounded-xl shadow-sm overflow-hidden mb-4 border border-neutral-100">
              <View className="bg-success-50 px-4 py-3 border-b border-neutral-200">
                <Text className="text-success-700 font-semibold text-base">
                  Bio
                </Text>
              </View>
              <View className="p-4">
                {profile?.bio && (
                  <Text className="text-neutral-800 leading-5">
                    {profile.bio}
                  </Text>
                )}
              </View>
            </View>
          )}

          {/* Location Section */}
          {profile?.location && (
            <LocationSection
              location={profile?.location}
              latitude={profile?.latitude}
              longitude={profile?.longitude}
              name={profile?.name}
            />
          )}

          {/* Account Stats */}
          <View className="bg-white rounded-xl shadow-sm overflow-hidden mb-4 border border-neutral-100">
            <View className="bg-warning-50 px-4 py-3 border-b border-neutral-200">
              <Text className="text-warning-700 font-semibold text-base">
                Account Statistics
              </Text>
            </View>
            <View className="p-4">
              <View className="flex-row">
                <View className="flex-1 items-center p-3 border-r border-neutral-100">
                  <View className="w-10 h-10 bg-warning-50 rounded-full items-center justify-center mb-2">
                    <Ionicons
                      name="cube-outline"
                      size={20}
                      color={COLORS.WARNING[600]}
                    />
                  </View>
                  <Text className="text-2xl font-bold text-neutral-800">
                    {profile?.itemsListed || 0}
                  </Text>
                  <Text className="text-xs text-neutral-500">Items Listed</Text>
                </View>
                <View className="flex-1 items-center p-3 border-r border-neutral-100">
                  <View className="w-10 h-10 bg-warning-50 rounded-full items-center justify-center mb-2">
                    <Ionicons
                      name="star-half-outline"
                      size={20}
                      color={COLORS.WARNING[600]}
                    />
                  </View>
                  <Text className="text-2xl font-bold text-neutral-800">
                    {profile?.rating ? profile.rating.toFixed(1) : "N/A"}
                  </Text>
                  <Text className="text-xs text-neutral-500">Rating</Text>
                </View>
                <View className="flex-1 items-center p-3">
                  <View className="w-10 h-10 bg-warning-50 rounded-full items-center justify-center mb-2">
                    <Ionicons
                      name="chatbubble-outline"
                      size={20}
                      color={COLORS.WARNING[600]}
                    />
                  </View>
                  <Text className="text-2xl font-bold text-neutral-800">
                    {profile?.reviewCount || 0}
                  </Text>
                  <Text className="text-xs text-neutral-500">Reviews</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
