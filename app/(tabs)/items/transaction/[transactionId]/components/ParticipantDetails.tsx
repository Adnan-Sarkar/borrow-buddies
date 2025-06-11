import React from "react";
import { View, Text, Image, TouchableOpacity, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/Colors";

type ParticipantDetailsProps = {
  owner: any;
  borrower: any;
  isOwner: boolean;
};

export default function ParticipantDetails({
  owner,
  borrower,
  isOwner,
}: ParticipantDetailsProps) {
  const safeOwner = owner || {
    name: "Unknown Owner",
    profilePicture: null,
    phoneNumber: "",
  };

  const safeBorrower = borrower || {
    name: "Unknown Borrower",
    profilePicture: null,
    phoneNumber: "",
  };

  const handleCall = (phoneNumber: string) => {
    if (phoneNumber) {
      Linking.openURL(`tel:${phoneNumber}`);
    }
  };

  return (
    <View className="px-4 mt-6">
      <Text className="text-neutral-800 font-semibold text-lg mb-3">
        Transaction Participants
      </Text>
      <View className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        {/* Owner Card */}
        <View className="p-4 border-b border-neutral-100">
          <View className="flex-row items-center">
            <View className="w-14 h-14 rounded-full overflow-hidden bg-neutral-100 mr-4 border-2 border-primary-100">
              {safeOwner.profilePicture ? (
                <Image
                  source={{ uri: safeOwner.profilePicture }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              ) : (
                <View className="w-full h-full items-center justify-center bg-primary-50">
                  <Text className="text-primary-600 font-bold text-lg">
                    {safeOwner.name.charAt(0).toUpperCase()}
                  </Text>
                </View>
              )}
            </View>

            <View className="flex-1">
              <View className="flex-row items-center">
                <Text className="text-neutral-800 font-semibold text-base">
                  {safeOwner.name}
                </Text>
                <View className="bg-primary-50 rounded-full px-2 py-0.5 ml-2">
                  <Text className="text-primary-700 text-xs font-medium">
                    Owner
                  </Text>
                </View>
              </View>

              {safeOwner.phoneNumber ? (
                <View className="flex-row items-center mt-1">
                  <Ionicons
                    name="call-outline"
                    size={12}
                    color={COLORS.NEUTRAL[500]}
                  />
                  <Text className="text-neutral-500 text-xs ml-1">
                    {safeOwner.phoneNumber}
                  </Text>
                </View>
              ) : (
                <Text className="text-neutral-400 text-xs italic mt-1">
                  No phone number available
                </Text>
              )}
            </View>

            {!isOwner && safeOwner.phoneNumber && (
              <TouchableOpacity
                className="bg-primary-50 py-2 px-3 rounded-lg flex-row items-center"
                onPress={() => handleCall(safeOwner.phoneNumber)}
              >
                <Ionicons
                  name="call-outline"
                  size={16}
                  color={COLORS.PRIMARY[600]}
                />
                <Text className="text-primary-600 font-medium ml-1 text-sm">
                  Call
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Borrower Card */}
        <View className="p-4">
          <View className="flex-row items-center">
            <View className="w-14 h-14 rounded-full overflow-hidden bg-neutral-100 mr-4 border-2 border-warning-100">
              {safeBorrower.profilePicture ? (
                <Image
                  source={{ uri: safeBorrower.profilePicture }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              ) : (
                <View className="w-full h-full items-center justify-center bg-warning-50">
                  <Text className="text-warning-600 font-bold text-lg">
                    {safeBorrower.name.charAt(0).toUpperCase()}
                  </Text>
                </View>
              )}
            </View>

            <View className="flex-1">
              <View className="flex-row items-center">
                <Text className="text-neutral-800 font-semibold text-base">
                  {safeBorrower.name}
                </Text>
                <View className="bg-warning-50 rounded-full px-2 py-0.5 ml-2">
                  <Text className="text-warning-700 text-xs font-medium">
                    Borrower
                  </Text>
                </View>
              </View>

              {safeBorrower.phoneNumber ? (
                <View className="flex-row items-center mt-1">
                  <Ionicons
                    name="call-outline"
                    size={12}
                    color={COLORS.NEUTRAL[500]}
                  />
                  <Text className="text-neutral-500 text-xs ml-1">
                    {safeBorrower.phoneNumber}
                  </Text>
                </View>
              ) : (
                <Text className="text-neutral-400 text-xs italic mt-1">
                  No phone number available
                </Text>
              )}
            </View>

            {isOwner && safeBorrower.phoneNumber && (
              <TouchableOpacity
                className="bg-warning-50 py-2 px-3 rounded-lg flex-row items-center"
                onPress={() => handleCall(safeBorrower.phoneNumber)}
              >
                <Ionicons
                  name="call-outline"
                  size={16}
                  color={COLORS.WARNING[600]}
                />
                <Text className="text-warning-600 font-medium ml-1 text-sm">
                  Call
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}
