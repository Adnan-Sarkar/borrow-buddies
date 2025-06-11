import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useGetAllCategoriesQuery } from "@/redux/api/categoryApi";

type Category = {
  id: string;
  name: string;
  icon?: string;
  itemCount: number;
};

const CategoriesSection = () => {
  const router = useRouter();

  const { data: categoriesData, isLoading } = useGetAllCategoriesQuery(
    { limit: 8 },
    {
      selectFromResult: (result) => ({
        ...result,
        data: result?.data?.data,
      }),
    }
  );

  const handleSeeAll = () => {
    router.push("/items/categories");
  };

  return (
    <View className="mt-5 mb-2">
      <View className="flex-row items-center justify-between px-5 mb-3">
        <Text className="text-lg font-bold text-neutral-900">
          Explore Categories
        </Text>
        <TouchableOpacity
          className="px-3 py-1 rounded-full"
          onPress={handleSeeAll}
        >
          <Text className="text-primary-600 font-medium text-sm">See All</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row items-center px-5 flex-wrap gap-3">
        {categoriesData?.map((category: Category) => (
          <TouchableOpacity
            key={category.id}
            className="bg-white px-3 py-2.5 rounded-lg border border-neutral-100 flex-row items-center"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.1,
              shadowRadius: 2,
              elevation: 1,
            }}
          >
            <View className="w-7 h-7 rounded-full bg-neutral-50 items-center justify-center mr-2">
              <Ionicons
                name={(category.icon?.trim() || "grid-outline") as any}
                size={16}
                color="#000000"
              />
            </View>
            <Text className="text-neutral-900 font-medium">
              {category.name}
            </Text>
            {category.itemCount > 0 && (
              <Text className="text-neutral-500 text-xs ml-1">
                ({category.itemCount})
              </Text>
            )}
          </TouchableOpacity>
        ))}

        {isLoading &&
          Array(5)
            .fill(0)
            .map((_, index) => (
              <View
                key={`skeleton-${index}`}
                className="mr-3 bg-neutral-100 px-3 py-2.5 rounded-lg h-10 w-28"
              />
            ))}
      </View>
    </View>
  );
};

export default CategoriesSection;
