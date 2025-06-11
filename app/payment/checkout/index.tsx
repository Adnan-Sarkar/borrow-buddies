import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Alert,
  StatusBar,
} from "react-native";
import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import CheckoutSummary from "./components/CheckoutSummary";
import PaymentMethodSelector from "./components/PaymentMethodSelector";
import PaymentForm from "./components/PaymentForm";
import { useCreateItemRequestTransactionMutation } from "@/redux/api/transactionApi";
import Button from "@/components/common/Button";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { COLORS } from "@/constants/Colors";

// Validation schema for payment
const paymentSchema = z
  .object({
    paymentMethod: z.enum(["card", "bkash"]),
    cardNumber: z.string().optional(),
    cardExpiry: z.string().optional(),
    cardCvv: z.string().optional(),
    mobileNumber: z.string().optional(),
    transactionId: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.paymentMethod === "card") {
        return !!data.cardNumber && !!data.cardExpiry && !!data.cardCvv;
      }
      if (data.paymentMethod === "bkash") {
        return !!data.mobileNumber && !!data.transactionId;
      }
      return true;
    },
    {
      message:
        "Please fill all required fields for the selected payment method",
    }
  );

type PaymentFormValues = z.infer<typeof paymentSchema>;

export default function CheckoutScreen() {
  const params = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  // Get all required transaction data from params
  const {
    itemId,
    startDate,
    endDate,
    amount,
    securityDeposit,
    platformFee,
    totalAmount,
    totalDays,
  } = params;

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      paymentMethod: "card",
    },
    mode: "onChange",
  });

  const [createTransaction] = useCreateItemRequestTransactionMutation();

  const paymentMethod = watch("paymentMethod");

  const onSubmit = async (data: PaymentFormValues) => {
    try {
      setIsProcessing(true);

      const transactionData = {
        startDate,
        endDate,
        paymentMethod: data.paymentMethod === "card" ? "CARD" : "BKASH",
        paymentStatus: true,
      };

      await createTransaction({
        data: transactionData,
        itemId: itemId as string,
      }).unwrap();

      // Navigate to success page
      router.replace("/payment/success");
    } catch (error) {
      console.error("Payment error:", error);
      Alert.alert(
        "Payment Failed",
        "We couldn't process your payment. Please try again."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      {/* Header */}
      <View style={{ paddingTop: insets.top }} className="bg-white">
        <View className="flex-row items-center h-14 px-4">
          <TouchableOpacity
            onPress={() => {
              router.push({
                pathname: "/(tabs)/items/request",
                params: { itemId },
              });
            }}
            className="w-10 h-10 items-center justify-center rounded-full"
          >
            <Ionicons name="arrow-back" size={24} color={COLORS.NEUTRAL[800]} />
          </TouchableOpacity>
          <Text className="flex-1 text-center text-lg font-semibold text-neutral-800 mr-10">
            Checkout & Payment
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1 p-4">
        {/* Transaction Summary */}
        <CheckoutSummary
          startDate={new Date(startDate as string)}
          endDate={new Date(endDate as string)}
          totalDays={parseInt(totalDays as string)}
          amount={parseFloat(amount as string)}
          securityDeposit={parseFloat(securityDeposit as string)}
          platformFee={parseFloat(platformFee as string)}
          totalAmount={parseFloat(totalAmount as string)}
        />

        {/* Payment Method Selection */}
        <View className="bg-neutral-50 rounded-xl p-4 my-4">
          <Text className="text-lg font-semibold text-neutral-800 mb-3">
            Choose Payment Method
          </Text>
          <PaymentMethodSelector
            control={control}
            error={errors.paymentMethod}
          />
        </View>

        {/* Payment Form */}
        <View className="bg-neutral-50 rounded-xl p-4 mb-4">
          <Text className="text-lg font-semibold text-neutral-800 mb-3">
            Payment Details
          </Text>
          <PaymentForm
            control={control}
            errors={errors}
            paymentMethod={paymentMethod as string}
          />
        </View>

        {/* Terms and Conditions */}
        <View className="bg-warning-50 rounded-lg p-3 mb-4 border border-neutral-200">
          <View className="flex-row items-center justify-center">
            <Text className="text-neutral-600 text-center text-sm">
              Payments are secure and refunds are available for cancellations
              made at least 24 hours before the rental period begins.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action Button */}
      <View className="p-4 border-t border-neutral-100 mt-6">
        <Button
          title={
            isProcessing
              ? "Processing..."
              : `Pay ৳${parseFloat(totalAmount as string).toFixed(2)}`
          }
          onPress={handleSubmit(onSubmit)}
          disabled={!isValid || isProcessing}
          isLoading={isProcessing}
        />
      </View>
    </View>
  );
}
