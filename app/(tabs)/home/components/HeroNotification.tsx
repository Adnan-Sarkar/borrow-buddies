import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Logo from "@/components/common/Logo";
import { Ionicons } from "@expo/vector-icons";

export default function HeroNotification() {
  return (
    <View className="flex-row items-center justify-between">
      <Logo />
      <TouchableOpacity
        className="w-10 h-10 bg-white/20 backdrop-blur-lg rounded-full items-center justify-center"
        onPress={() => console.log("Notifications")}
      >
        <Ionicons name="notifications-outline" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
}
