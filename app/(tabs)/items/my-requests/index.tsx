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
import { useGetMyBorrowingRequestsQuery } from "../../../../redux/api/transactionApi";
import { COLORS } from "@/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import RequestCard from "../components/RequestCard";
import EmptyState from "../components/EmptyState";
import RequestStatusFilter from "../components/RequestStatusFilter";

export default function MyRequestsScreen() {
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
  } = useGetMyBorrowingRequestsQuery(filters);

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
            My Requests
          </Text>
        </View>
      </View>

      {/* Filter tabs */}
      <RequestStatusFilter
        activeStatus={filters.status}
        onStatusChange={handleFilterSelect}
      />

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
                type="myRequest"
                onAction={refetch}
              />
            ))}
          </View>
        ) : (
          <EmptyState
            icon="receipt-outline"
            title="No Borrowing Requests"
            message="You haven't made any borrowing requests yet."
            actionLabel="Find Items to Borrow"
            onAction={() => router.push("/(tabs)/items")}
          />
        )}
      </ScrollView>
    </View>
  );
}
