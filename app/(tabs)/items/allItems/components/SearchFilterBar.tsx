import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../../../../constants/Colors";
import { useGetAllCategoriesQuery } from "@/redux/api/categoryApi";
import type { FilterOptions, SortOption } from "@/types/filter.types";

interface SearchFilterBarProps {
  filters: FilterOptions;
  onFilterChange: (filters: Partial<FilterOptions>) => void;
}

const SearchFilterBar = ({ filters, onFilterChange }: SearchFilterBarProps) => {
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showSortModal, setShowSortModal] = useState(false);
  const [localFilters, setLocalFilters] = useState<FilterOptions>(filters);

  // Fetch categories for the filter
  const { data: categoriesData } = useGetAllCategoriesQuery(
    { limit: 50 },
    {
      selectFromResult: (result) => ({
        ...result,
        data: result?.data?.data,
      }),
    }
  );

  const categories = categoriesData || [];

  // Sort options
  const sortOptions: { value: SortOption; label: string }[] = [
    { value: "newest", label: "Newest First" },
    { value: "price_low", label: "Price: Low to High" },
    { value: "price_high", label: "Price: High to Low" },
    { value: "rating", label: "Highest Rated" },
  ];

  // Handle search input
  const handleSearch = (text: string) => {
    setLocalFilters((prev) => ({ ...prev, search: text }));
    onFilterChange({ search: text });
  };

  // Apply filters from modal
  const applyFilters = () => {
    onFilterChange(localFilters);
    setShowFilterModal(false);
  };

  // Reset filters
  const resetFilters = () => {
    const resetData: FilterOptions = {
      search: localFilters.search,
      category: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      sort: "newest" as SortOption,
    };
    setLocalFilters(resetData);
    onFilterChange(resetData);
    setShowFilterModal(false);
  };

  // Select a sort option
  const selectSortOption = (option: SortOption) => {
    setLocalFilters((prev) => ({ ...prev, sort: option }));
    onFilterChange({ sort: option });
    setShowSortModal(false);
  };

  // Get current sort label
  const currentSortLabel =
    sortOptions.find((opt) => opt.value === filters.sort)?.label || "Sort";

  // Get active filter count
  const activeFilterCount =
    (filters.category ? 1 : 0) + (filters.minPrice || filters.maxPrice ? 1 : 0);

  return (
    <View className="px-4 py-2 border-b border-neutral-100">
      {/* Search Input */}
      <View className="flex-row items-center bg-neutral-100 rounded-lg px-3 py-2 mb-3">
        <Ionicons name="search-outline" size={20} color={COLORS.NEUTRAL[500]} />
        <TextInput
          className="flex-1 ml-2 text-neutral-900"
          placeholder="Search items..."
          placeholderTextColor={COLORS.NEUTRAL[500]}
          value={filters.search}
          onChangeText={handleSearch}
        />
        {filters.search ? (
          <TouchableOpacity onPress={() => handleSearch("")}>
            <Ionicons
              name="close-circle"
              size={20}
              color={COLORS.NEUTRAL[500]}
            />
          </TouchableOpacity>
        ) : null}
      </View>

      {/* Filter and Sort Buttons */}
      <View className="flex-row justify-between mb-1">
        <TouchableOpacity
          className={`flex-row items-center py-2 px-4 rounded-full ${
            activeFilterCount > 0 ? "bg-primary-50" : "bg-neutral-100"
          }`}
          onPress={() => setShowFilterModal(true)}
        >
          <Ionicons
            name="options-outline"
            size={18}
            color={
              activeFilterCount > 0 ? COLORS.PRIMARY[600] : COLORS.NEUTRAL[700]
            }
          />
          <Text
            className={`text-sm font-medium ml-1 ${
              activeFilterCount > 0 ? "text-primary-600" : "text-neutral-700"
            }`}
          >
            Filter{activeFilterCount > 0 ? ` (${activeFilterCount})` : ""}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-row items-center py-2 px-4 rounded-full bg-neutral-100"
          onPress={() => setShowSortModal(true)}
        >
          <Ionicons
            name="swap-vertical-outline"
            size={18}
            color={COLORS.NEUTRAL[700]}
          />
          <Text className="text-sm font-medium text-neutral-700 ml-1">
            {currentSortLabel}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Filter Modal */}
      <Modal
        visible={showFilterModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowFilterModal(false)}
      >
        <View className="flex-1 bg-black/50">
          <View className="mt-auto bg-white rounded-t-3xl overflow-hidden h-4/5">
            <View className="px-4 py-4 border-b border-neutral-100">
              <View className="flex-row justify-between items-center">
                <TouchableOpacity onPress={() => setShowFilterModal(false)}>
                  <Ionicons
                    name="close-outline"
                    size={28}
                    color={COLORS.NEUTRAL[700]}
                  />
                </TouchableOpacity>
                <Text className="text-lg font-bold text-neutral-900">
                  Filters
                </Text>
                <TouchableOpacity onPress={resetFilters}>
                  <Text className="text-primary-600 font-medium">Reset</Text>
                </TouchableOpacity>
              </View>
            </View>

            <ScrollView className="flex-1 px-4 py-2">
              {/* Category Filter */}
              <View className="mb-6">
                <Text className="text-base font-bold text-neutral-900 mb-2">
                  Category
                </Text>
                <View className="flex-row flex-wrap">
                  <TouchableOpacity
                    className={`mr-2 mb-2 py-2 px-3 rounded-full ${
                      !localFilters.category
                        ? "bg-primary-500"
                        : "bg-neutral-100"
                    }`}
                    onPress={() =>
                      setLocalFilters((prev) => ({
                        ...prev,
                        category: undefined,
                      }))
                    }
                  >
                    <Text
                      className={`text-sm font-medium ${
                        !localFilters.category
                          ? "text-white"
                          : "text-neutral-700"
                      }`}
                    >
                      All
                    </Text>
                  </TouchableOpacity>

                  {categories.map((category: any) => (
                    <TouchableOpacity
                      key={category.id}
                      className={`mr-2 mb-2 py-2 px-3 rounded-full ${
                        localFilters.category === category.id
                          ? "bg-primary-500"
                          : "bg-neutral-100"
                      }`}
                      onPress={() =>
                        setLocalFilters((prev) => ({
                          ...prev,
                          category: category.id,
                        }))
                      }
                    >
                      <Text
                        className={`text-sm font-medium ${
                          localFilters.category === category.id
                            ? "text-white"
                            : "text-neutral-700"
                        }`}
                      >
                        {category.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Price Range Filter */}
              <View className="mb-6">
                <Text className="text-base font-bold text-neutral-900 mb-2">
                  Price Range ($ per day)
                </Text>
                <View className="flex-row items-center">
                  <View className="flex-1 bg-neutral-100 rounded-lg px-3 py-2">
                    <TextInput
                      className="text-neutral-900"
                      placeholder="Min"
                      placeholderTextColor={COLORS.NEUTRAL[500]}
                      keyboardType="numeric"
                      value={localFilters.minPrice?.toString() || ""}
                      onChangeText={(text) => {
                        const value = text ? parseInt(text) : undefined;
                        setLocalFilters((prev) => ({
                          ...prev,
                          minPrice: value,
                        }));
                      }}
                    />
                  </View>
                  <Text className="mx-2 text-neutral-400">to</Text>
                  <View className="flex-1 bg-neutral-100 rounded-lg px-3 py-2">
                    <TextInput
                      className="text-neutral-900"
                      placeholder="Max"
                      placeholderTextColor={COLORS.NEUTRAL[500]}
                      keyboardType="numeric"
                      value={localFilters.maxPrice?.toString() || ""}
                      onChangeText={(text) => {
                        const value = text ? parseInt(text) : undefined;
                        setLocalFilters((prev) => ({
                          ...prev,
                          maxPrice: value,
                        }));
                      }}
                    />
                  </View>
                </View>
              </View>
            </ScrollView>

            <View className="px-4 py-4 border-t border-neutral-100">
              <TouchableOpacity
                className="bg-primary-500 py-3 rounded-lg items-center"
                onPress={applyFilters}
              >
                <Text className="text-white font-bold text-base">
                  Apply Filters
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Sort Modal */}
      <Modal
        visible={showSortModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowSortModal(false)}
      >
        <View className="flex-1 bg-black/50">
          <View className="mt-auto bg-white rounded-t-3xl overflow-hidden">
            <View className="px-4 py-4 border-b border-neutral-100">
              <View className="flex-row justify-between items-center">
                <TouchableOpacity onPress={() => setShowSortModal(false)}>
                  <Ionicons
                    name="close-outline"
                    size={28}
                    color={COLORS.NEUTRAL[700]}
                  />
                </TouchableOpacity>
                <Text className="text-lg font-bold text-neutral-900">
                  Sort By
                </Text>
                <View style={{ width: 28 }} />
              </View>
            </View>

            <View className="py-2">
              {sortOptions.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  className={`py-3 px-6 border-b border-neutral-100 flex-row items-center justify-between ${
                    option.value === filters.sort ? "bg-primary-50" : ""
                  }`}
                  onPress={() => selectSortOption(option.value)}
                >
                  <Text
                    className={`text-base ${
                      option.value === filters.sort
                        ? "text-primary-600 font-medium"
                        : "text-neutral-800"
                    }`}
                  >
                    {option.label}
                  </Text>
                  {option.value === filters.sort && (
                    <Ionicons
                      name="checkmark"
                      size={20}
                      color={COLORS.PRIMARY[600]}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SearchFilterBar;
