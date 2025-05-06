import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Button from "../../../../components/common/Button";

export default function CTASection() {
  return (
    <View className="px-6 py-10 mb-6">
      <View className="bg-primary-500 rounded-3xl p-8 overflow-hidden">
        <View
          style={{
            position: "absolute",
            right: -40,
            top: -40,
            width: 150,
            height: 150,
            borderRadius: 75,
            backgroundColor: "rgba(255,255,255,0.1)",
          }}
        />
        <View
          style={{
            position: "absolute",
            left: -30,
            bottom: -50,
            width: 120,
            height: 120,
            borderRadius: 60,
            backgroundColor: "rgba(255,255,255,0.1)",
          }}
        />

        <Text className="text-white text-3xl font-bold mb-3">
          Ready to Join Our Community?
        </Text>
        <Text className="text-white/80 mb-6">
          Start borrowing and lending today to save money and reduce waste while
          connecting with your community.
        </Text>
        <Button
          title="Get Started"
          onPress={() => console.log("Get Started")}
          variant="outline"
          fullWidth
        />

        <TouchableOpacity className="mt-4 items-center">
          <Text className="text-white font-medium">
            Learn more about our mission
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
