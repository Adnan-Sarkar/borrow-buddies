import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import CommunityPosts from "./components/CommunityPosts";
import { COLORS } from "../../../constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDebounce } from "@/hooks/useDebounce";
import NotificationBadge from "@/components/common/NotificationBadge";

export default function CommunityScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"asc" | "desc">("asc");

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />

      {/* Custom header with search */}
      <View
        className="bg-white border-b border-neutral-100"
        style={{ paddingTop: insets.top + 8, paddingBottom: 12 }}
      >
        {/* community header */}
        <View className="flex-row items-center justify-between px-5 mb-4 mt-4">
          <Text className="text-2xl font-bold text-neutral-900">Community</Text>
          <View className="flex-row items-center">
            <NotificationBadge dark={true} />
          </View>
        </View>

        <View className="flex-row items-center bg-neutral-50 mx-5 px-3 h-10 rounded-lg border border-neutral-200">
          <Ionicons name="search" size={18} color={COLORS.NEUTRAL[400]} />
          <TextInput
            className="flex-1 h-10 ml-2 text-neutral-900"
            placeholder="Search posts..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={COLORS.NEUTRAL[400]}
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons
                name="close-circle"
                size={18}
                color={COLORS.NEUTRAL[400]}
              />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      {/* Posts list */}
      <CommunityPosts searchQuery={debouncedSearchQuery} sortBy={sortBy} />

      {/* Create post button */}
      <TouchableOpacity
        className="absolute justify-center items-center w-14 h-14 rounded-full bg-primary-500 z-10"
        style={{
          right: 20,
          bottom: 20,
          elevation: 5,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        }}
        onPress={() => router.push("/community/create")}
      >
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}
