import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useGetMyLendingRequestsQuery } from "../../../../redux/api/transactionApi";
import { COLORS } from "@/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import EmptyState from "../components/EmptyState";
import RequestCard from "../components/RequestCard";

export default function LendRequestsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [filters, setFilters] = useState<{ status: string | null }>({
    status: null,
  });

  const {
    data: requests,
    isLoading,
    refetch,
  } = useGetMyLendingRequestsQuery(filters);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const handleFilterSelect = (status: string | null) => {
    setFilters({ ...filters, status });
  };

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      {/* Header with back button */}
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
            Lending Requests
          </Text>
        </View>
      </View>

      {/* Filter tabs */}
      <View className="px-4 pt-3 pb-3 border-b border-neutral-100">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="flex-row"
        >
          <TouchableOpacity
            onPress={() => handleFilterSelect(null)}
            className={`mr-3 rounded-md px-4 py-2 ${
              filters.status === null
                ? "bg-primary-100 border border-primary-300"
                : "bg-neutral-100 border border-neutral-200"
            }`}
          >
            <Text
              className={`${
                filters.status === null
                  ? "text-primary-800 font-medium"
                  : "text-neutral-600"
              }`}
            >
              All
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleFilterSelect("PENDING")}
            className={`mr-3 rounded-md px-4 py-2 ${
              filters.status === "PENDING"
                ? "bg-warning-100 border border-warning-300"
                : "bg-neutral-100 border border-neutral-200"
            }`}
          >
            <Text
              className={`${
                filters.status === "PENDING"
                  ? "text-warning-800 font-medium"
                  : "text-neutral-600"
              }`}
            >
              Pending
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleFilterSelect("APPROVED")}
            className={`mr-3 rounded-md px-4 py-2 ${
              filters.status === "APPROVED"
                ? "bg-success-100 border border-success-300"
                : "bg-neutral-100 border border-neutral-200"
            }`}
          >
            <Text
              className={`${
                filters.status === "APPROVED"
                  ? "text-success-800 font-medium"
                  : "text-neutral-600"
              }`}
            >
              Approved
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleFilterSelect("REJECTED")}
            className={`mr-3 rounded-md px-4 py-2 ${
              filters.status === "REJECTED"
                ? "bg-error-100 border border-error-300"
                : "bg-neutral-100 border border-neutral-200"
            }`}
          >
            <Text
              className={`${
                filters.status === "REJECTED"
                  ? "text-error-800 font-medium"
                  : "text-neutral-600"
              }`}
            >
              Rejected
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleFilterSelect("COMPLETED")}
            className={`mr-3 rounded-md px-4 py-2 ${
              filters.status === "COMPLETED"
                ? "bg-success-100 border border-success-300"
                : "bg-neutral-100 border border-neutral-200"
            }`}
          >
            <Text
              className={`${
                filters.status === "COMPLETED"
                  ? "text-success-800 font-medium"
                  : "text-neutral-600"
              }`}
            >
              Completed
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Content */}
      <ScrollView
        className="flex-1"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {isLoading ? (
          <View className="flex-1 items-center justify-center py-20">
            <ActivityIndicator size="large" color={COLORS.PRIMARY[500]} />
          </View>
        ) : requests && requests.data && requests.data.length > 0 ? (
          <View className="p-4">
            {requests.data.map((request: any) => (
              <RequestCard
                key={request.id}
                request={request}
                type="lendRequest"
                onAction={refetch}
              />
            ))}
          </View>
        ) : (
          <EmptyState
            icon="receipt-outline"
            title="No Lending Requests"
            message="You don't have any borrowing requests from others yet."
            actionLabel="Browse Your Items"
            onAction={() => router.push("/(tabs)/items/my-items")}
          />
        )}
      </ScrollView>
    </View>
  );
}
