import React from "react";
import { View, Text } from "react-native";
import type { Control, FieldErrors } from "react-hook-form";
import CustomInput from "@/components/common/CustomInput";
import { Ionicons } from "@expo/vector-icons";

type PaymentFormProps = {
  control: Control<any>;
  errors: FieldErrors<any>;
  paymentMethod: string;
  totalAmount?: number;
};

export default function PaymentForm({
  control,
  errors,
  paymentMethod,
  totalAmount,
}: PaymentFormProps) {
  if (paymentMethod === "card") {
    return (
      <View>
        <CustomInput
          label="Card Number"
          placeholder="1234 5678 9012 3456"
          name="cardNumber"
          control={control}
          error={
            errors.cardNumber as
              | import("react-hook-form").FieldError
              | undefined
          }
          icon="card-outline"
          keyboardType="numeric"
        />

        <View className="flex-row gap-4">
          <View className="flex-1">
            <CustomInput
              label="Expiry Date"
              placeholder="MM/YY"
              name="cardExpiry"
              control={control}
              error={
                errors.cardExpiry as
                  | import("react-hook-form").FieldError
                  | undefined
              }
              icon="calendar-outline"
            />
          </View>

          <View className="flex-1">
            <CustomInput
              label="CVV"
              placeholder="123"
              name="cardCvv"
              control={control}
              error={
                errors.cardCvv as
                  | import("react-hook-form").FieldError
                  | undefined
              }
              icon="lock-closed-outline"
              keyboardType="numeric"
            />
          </View>
        </View>
      </View>
    );
  }

  // bKash payment form
  if (paymentMethod === "bkash") {
    return (
      <View>
        <View className="bg-neutral-100 p-4 rounded-lg mb-4">
          <View className="flex-row items-center mb-2">
            <View className="bg-pink-600 w-6 h-6 rounded-full items-center justify-center mr-2">
              <Ionicons name="wallet-outline" size={14} color="white" />
            </View>
            <Text className="text-neutral-800 font-medium">
              bKash Payment Instructions
            </Text>
          </View>

          <View className="space-y-2">
            <Text className="text-neutral-600 text-sm">
              1. Dial *247# from your bKash registered number
            </Text>
            <Text className="text-neutral-600 text-sm">
              2. Select "Send Money"
            </Text>
            <Text className="text-neutral-600 text-sm">
              3. Enter merchant number: 01712345678
            </Text>
            <Text className="text-neutral-600 text-sm">
              4. Enter amount: ৳{totalAmount}
            </Text>
            <Text className="text-neutral-600 text-sm">
              5. Enter reference: "BorrowBuddies"
            </Text>
            <Text className="text-neutral-600 text-sm">
              6. Enter your bKash PIN to confirm
            </Text>
            <Text className="text-neutral-600 text-sm">
              7. Enter the Transaction ID below
            </Text>
          </View>
        </View>

        <CustomInput
          label="Your Mobile Number"
          placeholder="01XXXXXXXXX"
          name="mobileNumber"
          control={control}
          error={
            errors.mobileNumber as
              | import("react-hook-form").FieldError
              | undefined
          }
          icon="phone-portrait-outline"
          keyboardType="phone-pad"
        />

        <CustomInput
          label="Transaction ID"
          placeholder="Enter the transaction ID you received"
          name="transactionId"
          control={control}
          error={
            errors.transactionId as
              | import("react-hook-form").FieldError
              | undefined
          }
          icon="receipt-outline"
        />
      </View>
    );
  }

  return null;
}
