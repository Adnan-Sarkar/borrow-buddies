import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/Colors";

type PaymentDetailsProps = {
  amount: string;
  securityDeposit: string;
  platformFee: string;
  totalAmount: number;
  paymentStatus: boolean;
  paymentMethod: string;
};

export default function PaymentDetails({
  amount,
  securityDeposit,
  platformFee,
  totalAmount,
  paymentStatus,
  paymentMethod,
}: PaymentDetailsProps) {
  return (
    <View className="bg-neutral-50 rounded-lg p-3 mb-4">
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-neutral-800 font-medium">Payment Details</Text>
        <View className="flex-row items-center">
          {paymentStatus ? (
            <>
              <View className="w-2 h-2 rounded-full bg-success-500 mr-1.5" />
              <Text className="text-success-700 text-xs font-medium">Paid</Text>
            </>
          ) : (
            <>
              <View className="w-2 h-2 rounded-full bg-error-500 mr-1.5" />
              <Text className="text-error-700 text-xs font-medium">Unpaid</Text>
            </>
          )}
        </View>
      </View>

      <View className="border-b border-neutral-200 mb-2 pb-2">
        <View className="flex-row justify-between items-center mb-1.5">
          <Text className="text-neutral-600 text-sm">Rental Amount</Text>
          <Text className="text-neutral-800 text-sm">
            ৳{parseFloat(amount).toFixed(0)}
          </Text>
        </View>

        <View className="flex-row justify-between items-center mb-1.5">
          <Text className="text-neutral-600 text-sm">Security Deposit</Text>
          <Text className="text-neutral-800 text-sm">
            ৳{parseFloat(securityDeposit).toFixed(0)}
          </Text>
        </View>

        <View className="flex-row justify-between items-center">
          <Text className="text-neutral-600 text-sm">Platform Fee</Text>
          <Text className="text-neutral-800 text-sm">
            ৳{parseFloat(platformFee).toFixed(0)}
          </Text>
        </View>
      </View>

      <View className="flex-row justify-between items-center">
        <Text className="text-neutral-800 font-medium">Total</Text>
        <Text className="text-primary-700 font-bold">
          ৳{totalAmount.toFixed(0)}
        </Text>
      </View>

      <View className="mt-2 flex-row items-center justify-end">
        <Ionicons
          name={paymentMethod === "BKASH" ? "wallet-outline" : "card-outline"}
          size={12}
          color={COLORS.PRIMARY[500]}
        />
        <Text className="text-primary-600 text-xs ml-1">{paymentMethod}</Text>
      </View>
    </View>
  );
}
