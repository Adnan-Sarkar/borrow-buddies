import React from "react";
import { View, Text, ScrollView } from "react-native";
import { useRouter, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Button from "../../../components/common/Button";

export default function PaymentSuccessScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen options={{ headerShown: false }} />

      {/* Top decorative elements */}
      <View className="absolute top-0 left-0 right-0 h-40 bg-primary-50" />
      <View className="absolute top-16 right-8">
        <View className="w-12 h-12 rounded-full bg-primary-100 opacity-30" />
      </View>
      <View className="absolute top-24 left-6">
        <View className="w-8 h-8 rounded-full bg-success-200 opacity-40" />
      </View>

      <ScrollView className="flex-1">
        <View className="items-center justify-center pt-16 px-6">
          {/* Success card */}
          <View className="bg-white w-full rounded-2xl shadow-md p-6 mb-5 items-center">
            <View className="mb-6 items-center">
              <View className="w-20 h-20 rounded-full bg-success-500 items-center justify-center">
                <Ionicons name="checkmark" size={42} color="white" />
              </View>
              <View className="absolute w-24 h-24 rounded-full border-4 border-success-200 opacity-30" />
              <View className="absolute w-28 h-28 rounded-full border-2 border-success-100 opacity-20" />
            </View>

            {/* Title and description */}
            <Text className="text-2xl font-bold text-neutral-800 mb-2 text-center">
              Payment Confirmed!
            </Text>
            <Text className="text-neutral-600 text-center mb-5 px-2">
              Your payment has been processed successfully. The owner will
              review your request shortly.
            </Text>

            {/* Divider */}
            <View className="w-full h-px bg-neutral-100 my-4" />

            {/* Status badge */}
            <View className="flex-row items-center bg-warning-50 px-4 py-2.5 rounded-full">
              <View className="w-3 h-3 rounded-full bg-warning-500 mr-2 animate-pulse" />
              <Text className="text-warning-800 font-medium">
                Awaiting Owner Approval
              </Text>
            </View>
          </View>

          {/* Request details card */}
          <View className="bg-white w-full rounded-2xl shadow-md p-5 mb-6">
            <Text className="text-neutral-800 font-semibold mb-4">
              Request Details
            </Text>

            <View className="flex-row justify-between mb-3">
              <Text className="text-neutral-500">Status</Text>
              <Text className="text-neutral-800 font-medium">Pending</Text>
            </View>

            <View className="flex-row justify-between mb-3">
              <Text className="text-neutral-500">Payment ID</Text>
              <Text className="text-neutral-800 font-medium">
                #{Math.floor(10000000 + Math.random() * 90000000)}
              </Text>
            </View>

            <View className="flex-row justify-between">
              <Text className="text-neutral-500">Date</Text>
              <Text className="text-neutral-800 font-medium">
                {new Date().toLocaleDateString()}
              </Text>
            </View>
          </View>

          {/* Call to action */}
          <View className="w-full flex flex-col gap-4 mt-2 mb-8">
            <Button
              title="View Your Requests"
              onPress={() => router.push("/(tabs)/items/my-requests")}
              variant="primary"
            />
            <Button
              title="Return to Home"
              onPress={() => router.replace("/(tabs)/home")}
              variant="outline"
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
