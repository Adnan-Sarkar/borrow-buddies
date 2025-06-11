import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { COLORS } from "../../../../constants/Colors";

interface MyItemCardProps {
  item: {
    id: string;
    name: string;
    price: number;
    status: "available" | "borrowed" | "maintenance";
    image: string;
    views: number;
    requests: number;
    borrower?: {
      name: string;
      returnDate: string;
    };
  };
  onEdit: () => void;
  onDelete: () => void;
}

const MyItemCard = ({ item, onEdit, onDelete }: MyItemCardProps) => {
  const router = useRouter();

  const statusColor = () => {
    switch (item.status) {
      case "available":
        return COLORS.SUCCESS[500];
      case "borrowed":
        return COLORS.WARNING[500];
      case "maintenance":
        return COLORS.NEUTRAL[500];
      default:
        return COLORS.NEUTRAL[500];
    }
  };

  const statusText = () => {
    switch (item.status) {
      case "available":
        return "Available";
      case "borrowed":
        return "Borrowed";
      case "maintenance":
        return "Maintenance";
      default:
        return "Unknown";
    }
  };

  const handleViewItem = () => {
    router.push(`/items/${item.id}`);
  };

  return (
    <TouchableOpacity
      className="bg-white rounded-lg border border-neutral-100 shadow-sm mb-4 overflow-hidden"
      onPress={handleViewItem}
      activeOpacity={0.8}
    >
      <View className="flex-row">
        <Image
          source={{ uri: item.image }}
          className="w-24 h-24"
          resizeMode="cover"
        />
        <View className="flex-1 p-3">
          <View className="flex-row justify-between items-start">
            <View className="flex-1 mr-2">
              <Text
                className="text-neutral-900 font-semibold mb-1"
                numberOfLines={1}
              >
                {item.name}
              </Text>
              <Text className="text-primary-500 font-bold">
                ${item.price}/day
              </Text>
            </View>
            <View className="flex-row">
              <TouchableOpacity
                className="w-8 h-8 items-center justify-center"
                onPress={onEdit}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons
                  name="create-outline"
                  size={18}
                  color={COLORS.NEUTRAL[700]}
                />
              </TouchableOpacity>
              <TouchableOpacity
                className="w-8 h-8 items-center justify-center"
                onPress={onDelete}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons
                  name="trash-outline"
                  size={18}
                  color={COLORS.NEUTRAL[700]}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View className="flex-row items-center mt-2">
            <View
              className="w-2 h-2 rounded-full mr-1"
              style={{ backgroundColor: statusColor() }}
            />
            <Text className="text-sm text-neutral-600">{statusText()}</Text>
          </View>

          {item.status === "borrowed" && item.borrower ? (
            <Text className="text-xs text-neutral-500 mt-1">
              Borrowed by {item.borrower.name}, due back{" "}
              {item.borrower.returnDate}
            </Text>
          ) : (
            <View className="flex-row mt-1">
              <View className="flex-row items-center mr-3">
                <Ionicons
                  name="eye-outline"
                  size={12}
                  color={COLORS.NEUTRAL[500]}
                />
                <Text className="text-xs text-neutral-500 ml-1">
                  {item.views} views
                </Text>
              </View>
              <View className="flex-row items-center">
                <Ionicons
                  name="notifications-outline"
                  size={12}
                  color={COLORS.NEUTRAL[500]}
                />
                <Text className="text-xs text-neutral-500 ml-1">
                  {item.requests} {item.requests === 1 ? "request" : "requests"}
                </Text>
              </View>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MyItemCard;
