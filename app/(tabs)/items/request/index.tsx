import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import DateRangePicker from "./components/DateRangePicker";
import PriceSummary from "./components/PriceSummary";
import ItemPreview from "./components/ItemPreview";
import { useGetItemDetailsQuery } from "@/redux/api/itemsApi";
import getCurrentUserDetails from "@/utils/getCurrentUserDetails";
import { COLORS } from "@/constants/Colors";
import Button from "@/components/common/Button";

// Validation schema for request item
const requestSchema = z
  .object({
    startDate: z.date({
      required_error: "Start date is required",
    }),
    endDate: z.date({
      required_error: "End date is required",
    }),
  })
  .refine(
    (data) => {
      return data.endDate > data.startDate;
    },
    {
      message: "End date must be after start date",
      path: ["endDate"],
    }
  );

type RequestFormValues = z.infer<typeof requestSchema>;

export default function RequestScreen() {
  const { itemId } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [userId, setUserId] = useState<string | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [calculatedPrices, setCalculatedPrices] = useState({
    dailyPrice: 0,
    totalDays: 0,
    rentalTotal: 0,
    securityDeposit: 0,
    platformFee: 0,
    totalAmount: 0,
  });

  // Fetch item details
  const {
    data: response,
    isLoading,
    error,
  } = useGetItemDetailsQuery(itemId as string);
  const item = response?.data;

  // Setup form
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<RequestFormValues>({
    resolver: zodResolver(requestSchema),
    defaultValues: {
      startDate: new Date(),
      endDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
    mode: "onChange",
  });

  // Get current user details
  useEffect(() => {
    const fetchUserDetails = async () => {
      const user = await getCurrentUserDetails();
      setUserId(user?.id || null);
    };
    fetchUserDetails();
  }, []);

  const startDate = watch("startDate");
  const endDate = watch("endDate");

  // Calculate prices when dates change
  useEffect(() => {
    if (item && startDate && endDate) {
      setIsCalculating(true);

      // Calculate number of days
      const dayDiff = Math.ceil(
        (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
      );
      const totalDays = Math.max(dayDiff, 1);

      // Calculate costs
      const dailyPrice = parseFloat(item.dailyPrice) || 0;
      const rentalTotal = dailyPrice * totalDays;
      const securityDeposit = parseFloat(item.securityDeposit) || 0;
      const platformFee = 5.0;
      const totalAmount = rentalTotal + securityDeposit + platformFee;

      setCalculatedPrices({
        dailyPrice,
        totalDays,
        rentalTotal,
        securityDeposit,
        platformFee,
        totalAmount,
      });

      setIsCalculating(false);
    }
  }, [item, startDate, endDate]);

  // Handle form submission
  const onSubmit = (data: RequestFormValues) => {
    if (!userId || !item) return;

    router.push({
      pathname: "/payment/checkout",
      params: {
        itemId: itemId as string,
        ownerId: item.ownerId,
        borrowerId: userId,
        startDate: data.startDate.toISOString(),
        endDate: data.endDate.toISOString(),
        amount: calculatedPrices.rentalTotal.toString(),
        securityDeposit: calculatedPrices.securityDeposit.toString(),
        platformFee: calculatedPrices.platformFee.toString(),
        totalAmount: calculatedPrices.totalAmount.toString(),
        totalDays: calculatedPrices.totalDays.toString(),
      },
    });
  };

  if (isLoading) {
    return (
      <View className="flex-1 bg-white items-center justify-center">
        <ActivityIndicator size="large" color={COLORS.PRIMARY[500]} />
        <Text className="text-neutral-500 mt-4">Loading item details...</Text>
      </View>
    );
  }

  if (error || !item) {
    return (
      <View className="flex-1 bg-white items-center justify-center p-6">
        <Text className="text-xl font-bold text-neutral-900 mb-2">Oops!</Text>
        <Text className="text-neutral-600 text-center mb-6">
          We couldn't load the item details. Please try again.
        </Text>
        <Button title="Go Back" onPress={() => router.back()} />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      {/* Header */}
      <View
        style={{ paddingTop: insets.top }}
        className="bg-white border-b border-neutral-200"
      >
        <View className="flex-row items-center h-14 px-4">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 items-center justify-center rounded-full"
          >
            <Ionicons name="arrow-back" size={24} color={COLORS.NEUTRAL[800]} />
          </TouchableOpacity>
          <Text className="flex-1 text-center text-lg font-semibold text-neutral-800 mr-10">
            Request to Borrow
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1 p-4">
        {/* Item Preview */}
        <ItemPreview item={item} />

        {/* Date Selection */}
        <View className="bg-neutral-50 rounded-xl p-4 my-4">
          <DateRangePicker
            control={control}
            errors={errors}
            availabilityRange={{
              min: new Date(),
              max: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            }}
          />
        </View>

        {/* Price Summary */}
        <View className="bg-neutral-50 rounded-xl p-4 mb-4">
          <Text className="text-lg font-semibold text-neutral-800 mb-3">
            Price Summary
          </Text>
          <PriceSummary
            isCalculating={isCalculating}
            prices={calculatedPrices}
          />
        </View>

        {/* Simple Terms Notice */}
        <View className="bg-warning-100 rounded-xl p-4 mb-6">
          <View className="flex-row">
            <Ionicons
              name="information-circle-outline"
              size={20}
              color={COLORS.PRIMARY[500]}
              style={{ marginTop: 1 }}
            />
            <View className="flex-1 ml-3">
              <Text className="text-neutral-800 font-medium text-sm">
                You're responsible for any damage and late returns
              </Text>
              <Text className="text-neutral-500 text-xs mt-1">
                By proceeding, you agree to our terms of service
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action Button */}
      <View className="p-4 border-t border-neutral-100 mt-4">
        <Button
          title={`Proceed to Payment ($${calculatedPrices.totalAmount.toFixed(
            2
          )})`}
          onPress={handleSubmit(onSubmit)}
          disabled={!isValid || isCalculating}
        />
      </View>
    </View>
  );
}
