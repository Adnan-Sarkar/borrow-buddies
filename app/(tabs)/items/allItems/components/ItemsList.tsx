import React from "react";
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../../../../constants/Colors";
import ItemCard from "../../components/ItemCard";
import Pagination from "@/components/common/Pagination";
import type { ItemType } from "@/types/item.types";

interface ItemsListProps {
  items: ItemType[];
  isLoading: boolean;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onRefresh: () => void;
}

const ItemsList = ({
  items,
  isLoading,
  page,
  totalPages,
  onPageChange,
  onRefresh,
}: ItemsListProps) => {
  const router = useRouter();
  const [refreshing, setRefreshing] = React.useState(false);
  const [listLayout, setListLayout] = React.useState<"grid" | "list">("grid");
  const windowWidth = Dimensions.get("window").width;

  // Calculate item width based on layout and screen size
  const itemWidth =
    listLayout === "grid" ? (windowWidth - 32) / 2 : windowWidth - 24;

  const handleRefresh = async () => {
    setRefreshing(true);
    await onRefresh();
    setRefreshing(false);
  };

  const handleItemPress = (itemId: string) => {
    router.push(`/items/${itemId}`);
  };

  const renderItem = ({ item }: { item: ItemType }) => (
    <ItemCard
      item={item}
      onPress={() => handleItemPress(item.id)}
      horizontal={listLayout === "list"}
      width={itemWidth}
      className={listLayout === "grid" ? "mb-4 mx-2" : "mb-4 mx-4"}
    />
  );

  const renderEmptyList = () => (
    <View className="flex-1 items-center justify-center py-10">
      <Ionicons name="search-outline" size={64} color={COLORS.NEUTRAL[300]} />
      <Text className="text-neutral-500 mt-4 text-center px-6">
        No items found matching your criteria.
      </Text>
    </View>
  );

  const renderHeader = () => (
    <View className="flex-row justify-between items-center px-4 py-2">
      <Text className="text-neutral-700">
        {items.length > 0 ? `Showing ${items.length} items` : "No items found"}
      </Text>
      <View className="flex-row">
        <TouchableOpacity
          className={`p-1.5 rounded-l-md ${
            listLayout === "grid" ? "bg-primary-500" : "bg-neutral-200"
          }`}
          onPress={() => setListLayout("grid")}
        >
          <Ionicons
            name="grid-outline"
            size={18}
            color={listLayout === "grid" ? "white" : COLORS.NEUTRAL[700]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          className={`p-1.5 rounded-r-md ${
            listLayout === "list" ? "bg-primary-500" : "bg-neutral-200"
          }`}
          onPress={() => setListLayout("list")}
        >
          <Ionicons
            name="list-outline"
            size={18}
            color={listLayout === "list" ? "white" : COLORS.NEUTRAL[700]}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  if (isLoading && items.length === 0) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color={COLORS.PRIMARY[500]} />
        <Text className="text-neutral-500 mt-3">Loading items...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1">
      {renderHeader()}

      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={listLayout === "grid" ? 2 : 1}
        key={listLayout} // Force re-render when layout changes
        contentContainerStyle={{
          paddingHorizontal: listLayout === "grid" ? 4 : 0,
          paddingVertical: 8,
          flexGrow: 1,
        }}
        ListEmptyComponent={renderEmptyList}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      />

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </View>
  );
};

export default ItemsList;
