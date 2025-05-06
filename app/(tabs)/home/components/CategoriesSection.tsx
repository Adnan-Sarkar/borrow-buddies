import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../../../constants/Colors";

export default function CategoriesSection() {
  return (
    <View className="px-6 py-10">
      <View className="flex-row items-center justify-between mb-6">
        <Text className="text-2xl font-bold text-neutral-800">
          Popular Categories
        </Text>
        <TouchableOpacity>
          <Text className="text-primary-500 font-medium">See All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: 24 }}
      >
        <TouchableOpacity className="mr-4 items-center">
          <View className="w-20 h-20 rounded-full bg-orange-100 items-center justify-center mb-2">
            <Ionicons
              name="construct-outline"
              size={30}
              color={COLORS.WARNING[500]}
            />
          </View>
          <Text className="text-neutral-800 font-medium">Tools</Text>
        </TouchableOpacity>

        <TouchableOpacity className="mr-4 items-center">
          <View className="w-20 h-20 rounded-full bg-blue-100 items-center justify-center mb-2">
            <Ionicons
              name="desktop-outline"
              size={30}
              color={COLORS.PRIMARY[500]}
            />
          </View>
          <Text className="text-neutral-800 font-medium">Electronics</Text>
        </TouchableOpacity>

        <TouchableOpacity className="mr-4 items-center">
          <View className="w-20 h-20 rounded-full bg-green-100 items-center justify-center mb-2">
            <Ionicons
              name="bicycle-outline"
              size={30}
              color={COLORS.SUCCESS[500]}
            />
          </View>
          <Text className="text-neutral-800 font-medium">Sports</Text>
        </TouchableOpacity>

        <TouchableOpacity className="mr-4 items-center">
          <View className="w-20 h-20 rounded-full bg-purple-100 items-center justify-center mb-2">
            <Ionicons
              name="camera-outline"
              size={30}
              color={COLORS.SECONDARY[500]}
            />
          </View>
          <Text className="text-neutral-800 font-medium">Cameras</Text>
        </TouchableOpacity>

        <TouchableOpacity className="mr-4 items-center">
          <View className="w-20 h-20 rounded-full bg-pink-100 items-center justify-center mb-2">
            <Ionicons
              name="game-controller-outline"
              size={30}
              color="#D53F8C"
            />
          </View>
          <Text className="text-neutral-800 font-medium">Gaming</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
