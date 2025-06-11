import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/Colors";

type PaymentSummaryProps = {
  amount: string;
  securityDeposit: string;
  platformFee: string;
  paymentStatus: boolean;
  paymentMethod: string;
};

export default function PaymentSummary({
  amount,
  securityDeposit,
  platformFee,
  paymentStatus,
  paymentMethod,
}: PaymentSummaryProps) {
  const amountNum = parseFloat(amount || "0");
  const depositNum = parseFloat(securityDeposit || "0");
  const feeNum = parseFloat(platformFee || "0");
  const totalAmount = amountNum + depositNum + feeNum;

  return (
    <View className="px-4 mt-6">
      <Text className="text-neutral-800 font-semibold text-lg mb-3">
        Payment Details
      </Text>
      <View className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        <View className="p-4">
          {/* Payment Status Badge */}
          <View
            className={`self-start rounded-lg px-3 py-1 mb-3 flex-row items-center ${
              paymentStatus ? "bg-success-50" : "bg-warning-50"
            }`}
          >
            <View
              className={`w-2 h-2 rounded-full mr-2 ${
                paymentStatus ? "bg-success-500" : "bg-warning-500"
              }`}
            />
            <Text
              className={`font-medium text-sm ${
                paymentStatus ? "text-success-700" : "text-warning-700"
              }`}
            >
              {paymentStatus ? "Paid" : "Payment Pending"}
            </Text>
          </View>

          {/* Payment rows */}
          <View className="flex-row justify-between mb-2">
            <Text className="text-neutral-600">Rental Fee</Text>
            <Text className="text-neutral-800 font-medium">
              ৳{amountNum.toFixed(0)}
            </Text>
          </View>
          <View className="flex-row justify-between mb-2">
            <View className="flex-row items-center">
              <Text className="text-neutral-600">Security Deposit</Text>
              <TouchableOpacity className="ml-1">
                <Ionicons
                  name="information-circle-outline"
                  size={14}
                  color={COLORS.NEUTRAL[400]}
                />
              </TouchableOpacity>
            </View>
            <Text className="text-neutral-800 font-medium">
              ৳{depositNum.toFixed(0)}
            </Text>
          </View>
          <View className="flex-row justify-between mb-3">
            <View className="flex-row items-center">
              <Text className="text-neutral-600">Platform Fee</Text>
              <TouchableOpacity className="ml-1">
                <Ionicons
                  name="information-circle-outline"
                  size={14}
                  color={COLORS.NEUTRAL[400]}
                />
              </TouchableOpacity>
            </View>
            <Text className="text-neutral-800 font-medium">
              ৳{feeNum.toFixed(0)}
            </Text>
          </View>

          <View className="border-t border-dashed border-neutral-200 my-2" />

          {/* Total */}
          <View className="flex-row justify-between items-center">
            <Text className="text-neutral-800 font-bold">Total Amount</Text>
            <Text className="text-primary-700 font-bold text-xl">
              ৳{totalAmount.toFixed(0)}
            </Text>
          </View>
        </View>

        {/* Payment Method Section */}
        <View
          className={`px-4 py-3 border-t border-neutral-100 ${
            paymentStatus ? "bg-neutral-50" : "bg-warning-50/30"
          }`}
        >
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Ionicons
                name={paymentStatus ? "card-outline" : "time-outline"}
                size={18}
                color={
                  paymentStatus ? COLORS.NEUTRAL[700] : COLORS.WARNING[600]
                }
              />
              <Text className="text-neutral-700 ml-2 font-medium">
                {paymentStatus ? "Payment Method" : "Payment Due"}
              </Text>
            </View>
            <View
              className={`py-1 px-2 rounded-lg ${
                paymentStatus ? "bg-neutral-200" : "bg-warning-100"
              }`}
            >
              <Text
                className={`text-sm font-medium ${
                  paymentStatus ? "text-neutral-700" : "text-warning-700"
                }`}
              >
                {paymentMethod || "Not specified"}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
