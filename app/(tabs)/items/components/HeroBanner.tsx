import React from "react";
import { View, Text, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const HeroBanner = () => (
  <View className="mx-5 mt-4 rounded-xl overflow-hidden">
    <Image
      source={{
        uri: "https://images.unsplash.com/photo-1687360441027-27e70655b27e?q=80&w=1966&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      }}
      className="h-48 w-full"
      resizeMode="cover"
    />
    <LinearGradient
      colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,0.7)"]}
      className="absolute inset-0 justify-end p-4"
    >
      <Text className="text-white text-xl font-bold">Borrow What You Need</Text>
      <Text className="text-white opacity-80">Save money & reduce waste</Text>
    </LinearGradient>
  </View>
);

export default HeroBanner;
