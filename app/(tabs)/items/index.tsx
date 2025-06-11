import React, { useState } from "react";
import { View, FlatList } from "react-native";
import { Stack } from "expo-router";
import AppHeader from "./components/AppHeader";
import HeroBanner from "./components/HeroBanner";
import CategoriesSection from "./components/CategoriesSection";
import FeaturedItemsSection from "./components/FeaturedItemsSection";
import NearbyItemsSection from "./components/NearbyItemsSection";
import FloatingActionButton from "./components/FloatingActionButton";
import SideDrawer from "./components/SideDrawer";

export default function ItemsHomeScreen() {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  // Sections info
  const sections = [
    { type: "banner", id: "banner-section" },
    { type: "categories", id: "categories-section" },
    { type: "featured", id: "featured-section" },
    { type: "nearby", id: "nearby-section" },
  ];

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen options={{ headerShown: false }} />

      {/* Add onMenuPress to AppHeader */}
      <AppHeader onMenuPress={() => setIsDrawerVisible(true)} />

      <FlatList
        data={sections}
        renderItem={({ item }) => {
          switch (item.type) {
            case "banner":
              return <HeroBanner />;
            case "categories":
              return <CategoriesSection />;
            case "featured":
              return <FeaturedItemsSection />;
            case "nearby":
              return <NearbyItemsSection />;
            default:
              return null;
          }
        }}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      <FloatingActionButton />

      {/* Add the Side Drawer component */}
      <SideDrawer
        isVisible={isDrawerVisible}
        onClose={() => setIsDrawerVisible(false)}
      />
    </View>
  );
}
