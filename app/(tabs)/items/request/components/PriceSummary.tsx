import { COLORS } from "@/constants/Colors";
import React from "react";
import { View, Text, ActivityIndicator } from "react-native";

type PriceSummaryProps = {
  isCalculating: boolean;
  prices: {
    dailyPrice: number;
    totalDays: number;
    rentalTotal: number;
    securityDeposit: number;
    platformFee: number;
    totalAmount: number;
  };
};

export default function PriceSummary({
  isCalculating,
  prices,
}: PriceSummaryProps) {
  if (isCalculating) {
    return (
      <View className="items-center py-4">
        <ActivityIndicator size="small" color={COLORS.PRIMARY[500]} />
        <Text className="text-neutral-500 mt-2">Calculating price...</Text>
      </View>
    );
  }

  return (
    <View>
      {/* Rental cost */}
      <View className="flex-row justify-between mb-3">
        <Text className="text-neutral-600">
          ${prices.dailyPrice.toFixed(2)} × {prices.totalDays}{" "}
          {prices.totalDays === 1 ? "day" : "days"}
        </Text>
        <Text className="text-neutral-800 font-medium">
          ${prices.rentalTotal.toFixed(2)}
        </Text>
      </View>

      {/* Security deposit */}
      <View className="flex-row justify-between mb-3">
        <View className="flex-row items-center">
          <Text className="text-neutral-600">Security deposit</Text>
          <Text className="text-neutral-500 text-xs ml-1">(refundable)</Text>
        </View>
        <Text className="text-neutral-800 font-medium">
          ${prices.securityDeposit.toFixed(2)}
        </Text>
      </View>

      {/* Platform fee */}
      <View className="flex-row justify-between mb-4">
        <Text className="text-neutral-600">Platform fee</Text>
        <Text className="text-neutral-800 font-medium">
          ${prices.platformFee.toFixed(2)}
        </Text>
      </View>

      {/* Divider */}
      <View className="h-[1px] bg-neutral-200 my-2" />

      {/* Total */}
      <View className="flex-row justify-between mt-3">
        <Text className="text-neutral-900 font-semibold">Total</Text>
        <Text className="text-primary-600 font-bold">
          ${prices.totalAmount.toFixed(2)}
        </Text>
      </View>
    </View>
  );
}
