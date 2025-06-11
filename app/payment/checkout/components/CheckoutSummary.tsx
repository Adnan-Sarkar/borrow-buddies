import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/Colors";

interface CheckoutSummaryProps {
  startDate: Date;
  endDate: Date;
  totalDays: number;
  amount: number;
  securityDeposit: number;
  platformFee: number;
  totalAmount: number;
}

export default function CheckoutSummary({
  startDate,
  endDate,
  totalDays,
  amount,
  securityDeposit,
  platformFee,
  totalAmount,
}: CheckoutSummaryProps) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <View className="bg-neutral-50 rounded-xl p-4">
      <Text className="text-lg font-semibold text-neutral-800 mb-3">
        Checkout Summary
      </Text>

      {/* Booking Period */}
      <View className="flex-row items-center mb-3">
        <View className="w-7 h-7 rounded-full bg-primary-100 items-center justify-center mr-2">
          <Ionicons
            name="calendar-outline"
            size={16}
            color={COLORS.PRIMARY[600]}
          />
        </View>
        <Text className="text-neutral-700">
          {formatDate(startDate)} - {formatDate(endDate)} ({totalDays}{" "}
          {totalDays === 1 ? "day" : "days"})
        </Text>
      </View>

      <View className="h-[1px] bg-neutral-200 my-2" />

      {/* Price Summary */}
      <View className="mt-2">
        {/* Rental cost */}
        <View className="flex-row justify-between mb-2">
          <Text className="text-neutral-600">Rental cost</Text>
          <Text className="text-neutral-800 font-medium">
            ${amount.toFixed(2)}
          </Text>
        </View>

        {/* Security deposit */}
        <View className="flex-row justify-between mb-2">
          <View className="flex-row items-center">
            <Text className="text-neutral-600">Security deposit</Text>
            <Text className="text-neutral-500 text-xs ml-1">(refundable)</Text>
          </View>
          <Text className="text-neutral-800 font-medium">
            ${securityDeposit.toFixed(2)}
          </Text>
        </View>

        {/* Platform fee */}
        <View className="flex-row justify-between mb-3">
          <Text className="text-neutral-600">Platform fee</Text>
          <Text className="text-neutral-800 font-medium">
            ${platformFee.toFixed(2)}
          </Text>
        </View>

        {/* Divider */}
        <View className="h-[1px] bg-neutral-200 my-1" />

        {/* Total */}
        <View className="flex-row justify-between mt-3">
          <Text className="text-neutral-900 font-semibold">Total Amount</Text>
          <Text className="text-primary-600 font-bold">
            ${totalAmount.toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );
}
