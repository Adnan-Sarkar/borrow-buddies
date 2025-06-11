import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../../../constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useGetAllCategoriesQuery } from "@/redux/api/categoryApi";
import Pagination from "@/components/common/Pagination";

type Category = {
  id: string;
  name: string;
  icon?: string;
  itemCount: number;
};

const PAGE_SIZE = 20;

export default function CategoriesScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [page, setPage] = useState(1);

  const { data, isLoading } = useGetAllCategoriesQuery(
    { page, limit: PAGE_SIZE },
    {
      selectFromResult: (result) => ({
        ...result,
        data: result?.data,
      }),
    }
  );

  const categoriesData = data?.data || [];
  const meta = data?.meta || {
    page: 1,
    limit: PAGE_SIZE,
    total: 0,
    totalPages: 1,
  };
  const currentPage = meta?.page || page;
  const totalPages = meta?.totalPages || 1;

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
    }
  };

  const scrollViewRef = React.useRef<ScrollView>(null);

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header */}
      <View
        className="bg-white border-b border-neutral-100"
        style={{ paddingTop: insets.top, paddingBottom: 12 }}
      >
        <View className="flex-row items-center px-5 py-4">
          <TouchableOpacity
            className="mr-3"
            onPress={() => router.back()}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="arrow-back" size={24} color={COLORS.NEUTRAL[900]} />
          </TouchableOpacity>

          <Text className="text-xl font-bold text-neutral-900">Categories</Text>
        </View>
      </View>

      {isLoading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color={COLORS.PRIMARY[500]} />
          <Text className="text-neutral-500 mt-3">Loading categories...</Text>
        </View>
      ) : (
        <ScrollView
          ref={scrollViewRef}
          className="flex-1"
          contentContainerStyle={{ padding: 16 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-row flex-wrap">
            {categoriesData.map((category: Category) => (
              <TouchableOpacity
                key={category.id}
                className="bg-white px-3 py-2.5 rounded-lg border border-neutral-100 flex-row items-center mr-3 mb-3"
                style={{
                  width: "47%",
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.1,
                  shadowRadius: 2,
                  elevation: 1,
                }}
              >
                <View className="w-8 h-8 rounded-full bg-neutral-50 items-center justify-center mr-2">
                  <Ionicons
                    name={(category.icon?.trim() || "grid-outline") as any}
                    size={18}
                    color="#000000"
                  />
                </View>
                <View className="flex-1">
                  <Text
                    className="text-neutral-900 font-medium"
                    numberOfLines={1}
                  >
                    {category.name}
                  </Text>
                  <Text className="text-neutral-500 text-xs">
                    {category.itemCount || 0}{" "}
                    {category.itemCount === 1 ? "item" : "items"}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Empty state */}
          {categoriesData.length === 0 && !isLoading && (
            <View className="py-10 items-center">
              <Ionicons
                name="grid-outline"
                size={48}
                color={COLORS.NEUTRAL[300]}
              />
              <Text className="text-neutral-500 mt-2 text-center">
                No categories available
              </Text>
            </View>
          )}

          {/* Pagination component */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </ScrollView>
      )}
    </View>
  );
}
