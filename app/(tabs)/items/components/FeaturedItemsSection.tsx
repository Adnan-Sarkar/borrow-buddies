import React from "react";
import { View, ScrollView } from "react-native";
import ItemCard from "./ItemCard";
import SectionHeader from "./SectionHeader";
import { useRouter } from "expo-router";
import { useGetFeaturedItemsQuery } from "@/redux/api/itemsApi";

const FeaturedItemsSection = () => {
  const router = useRouter();

  const { data: featureItemsData } = useGetFeaturedItemsQuery(
    {},
    {
      selectFromResult: (result) => ({
        ...result,
        data: result?.data?.data,
      }),
    }
  );

  const handleItemPress = (itemId: string | "featured") => {
    if (itemId === "featured") {
      router.push("/items/featured");
    } else {
      router.push(`/items/${itemId}`);
    }
  };

  if (!featureItemsData || featureItemsData.length === 0) {
    return null;
  }

  return (
    <View className="mt-6">
      <SectionHeader
        title="Featured Items"
        onAction={() => handleItemPress("featured")}
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 20 }}
        nestedScrollEnabled={true}
      >
        {featureItemsData &&
          featureItemsData?.map((item: any) => {
            return (
              <ItemCard
                key={item.id}
                item={item}
                onPress={() => handleItemPress(item.id)}
                className="mr-4"
                width={220}
              />
            );
          })}
      </ScrollView>
    </View>
  );
};

export default FeaturedItemsSection;
