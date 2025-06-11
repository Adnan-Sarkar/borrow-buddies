import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Stack } from "expo-router";
import AppHeader from "../components/AppHeader";
import SideDrawer from "../components/SideDrawer";
import SearchFilterBar from "./components/SearchFilterBar";
import { useGetAllItemsQuery } from "@/redux/api/itemsApi";
import type { FilterOptions } from "@/types/filter.types";
import ItemsList from "./components/ItemsList";

export default function AllItemsScreen() {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<FilterOptions>({
    search: "",
    sort: "newest",
  });

  const mapSortToApiParams = (sort: string) => {
    switch (sort) {
      case "newest":
        return { sortBy: "createdAt", sortOrder: "desc" };
      case "price_low":
      case "price-low-high":
        return { sortBy: "dailyPrice", sortOrder: "asc" };
      case "price_high":
      case "price-high-low":
        return { sortBy: "dailyPrice", sortOrder: "desc" };
      case "rating":
      case "highest-rated":
        return { sortBy: "avgRating", sortOrder: "desc" };
      default:
        return { sortBy: "createdAt", sortOrder: "desc" };
    }
  };

  const sortParams = mapSortToApiParams(filters.sort);
  const queryParams = {
    page,
    limit: 12,
    searchTerm: filters.search,
    category: filters.category,
    minPrice: filters.minPrice,
    maxPrice: filters.maxPrice,
    ...sortParams,
  };

  const { data, isLoading, isFetching, refetch } =
    useGetAllItemsQuery(queryParams);

  // Extract data and pagination info
  const items = data?.data || [];
  const meta = data?.meta || { page: 1, limit: 12, total: 0, totalPages: 1 };

  // Reset to page 1 when filters change
  useEffect(() => {
    setPage(1);
  }, [filters]);

  // Handle filter changes
  const handleFilterChange = (newFilters: Partial<FilterOptions>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  // Handle page changes
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header */}
      <AppHeader onMenuPress={() => setIsDrawerVisible(true)} />

      {/* Search and Filter Bar */}
      <SearchFilterBar filters={filters} onFilterChange={handleFilterChange} />

      {/* Items List with Pagination */}
      <ItemsList
        items={items}
        isLoading={isLoading || isFetching}
        page={meta.page}
        totalPages={meta.totalPages}
        onPageChange={handlePageChange}
        onRefresh={refetch}
      />

      {/* Side Drawer */}
      <SideDrawer
        isVisible={isDrawerVisible}
        onClose={() => setIsDrawerVisible(false)}
      />
    </View>
  );
}
