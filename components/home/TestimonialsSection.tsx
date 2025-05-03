import React from "react";
import { View, Text, ScrollView, Image, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function TestimonialsSection() {
  return (
    <View className="px-6 py-12 bg-neutral-50">
      <Text className="text-2xl font-bold text-neutral-800 mb-8 text-center">
        What Our Community Says
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={width - 60}
        snapToAlignment="center"
        decelerationRate="fast"
        contentContainerStyle={{ paddingHorizontal: 6 }}
      >
        <View className="w-[300px] bg-white p-6 rounded-2xl shadow-sm mx-4 border border-neutral-100">
          <View className="flex-row items-center mb-4">
            <Image
              source={{
                uri: "https://randomuser.me/api/portraits/women/44.jpg",
              }}
              className="w-14 h-14 rounded-full mr-4"
            />
            <View>
              <Text className="text-neutral-800 font-bold">Sarah Johnson</Text>
              <Text className="text-neutral-500">Toronto, Canada</Text>
            </View>
          </View>
          <Text className="text-neutral-600 italic mb-3">
            "BorrowBuddies saved me thousands! Instead of buying a pressure
            washer for a one-time job, I borrowed it from a neighbor for a
            fraction of the cost."
          </Text>
          <View className="flex-row">
            {[1, 2, 3, 4, 5].map((star) => (
              <Ionicons key={star} name="star" size={16} color="#FBBF24" />
            ))}
          </View>
        </View>

        <View className="w-[300px] bg-white p-6 rounded-2xl shadow-sm mx-4 border border-neutral-100">
          <View className="flex-row items-center mb-4">
            <Image
              source={{
                uri: "https://randomuser.me/api/portraits/men/32.jpg",
              }}
              className="w-14 h-14 rounded-full mr-4"
            />
            <View>
              <Text className="text-neutral-800 font-bold">Michael Chen</Text>
              <Text className="text-neutral-500">San Francisco, USA</Text>
            </View>
          </View>
          <Text className="text-neutral-600 italic mb-3">
            "I make around $200 extra per month lending out my camera gear that
            would otherwise sit in my closet. Plus, I've met amazing people in
            my community!"
          </Text>
          <View className="flex-row">
            {[1, 2, 3, 4, 5].map((star) => (
              <Ionicons key={star} name="star" size={16} color="#FBBF24" />
            ))}
          </View>
        </View>

        <View className="w-[300px] bg-white p-6 rounded-2xl shadow-sm mx-4 border border-neutral-100">
          <View className="flex-row items-center mb-4">
            <Image
              source={{
                uri: "https://randomuser.me/api/portraits/women/68.jpg",
              }}
              className="w-14 h-14 rounded-full mr-4"
            />
            <View>
              <Text className="text-neutral-800 font-bold">Priya Patel</Text>
              <Text className="text-neutral-500">London, UK</Text>
            </View>
          </View>
          <Text className="text-neutral-600 italic mb-3">
            "As a student, BorrowBuddies has been a game-changer! I borrowed
            textbooks, a tablet, and even formal wear for events without
            breaking the bank."
          </Text>
          <View className="flex-row">
            {[1, 2, 3, 4, 5].map((star) => (
              <Ionicons
                key={star}
                name={star < 5 ? "star" : "star-outline"}
                size={16}
                color="#FBBF24"
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
