import React from "react";
import { View, Text, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Button from "../../../../components/common/Button";
import { COLORS } from "../../../../constants/Colors";
import HeroNotification from "./HeroNotification";

export default function HeroSection() {
  return (
    <View className="w-full h-[420px] relative">
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: COLORS.PRIMARY[700],
        }}
      >
        {/* Grid background image */}
        <Image
          source={require("../../../../assets/images/grid-bg.png")}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            opacity: 0.25,
          }}
          resizeMode="cover"
        />

        <View
          style={{
            position: "absolute",
            left: -50,
            top: 100,
            width: 200,
            height: 200,
            borderRadius: 100,
            backgroundColor: "rgba(255,255,255,0.05)",
          }}
        />
        <View
          style={{
            position: "absolute",
            right: -100,
            bottom: 50,
            width: 300,
            height: 300,
            borderRadius: 150,
            backgroundColor: "rgba(255,255,255,0.05)",
          }}
        />
      </View>

      <LinearGradient
        colors={[
          "rgba(59,130,246,0.7)",
          "rgba(79,70,229,0.7)",
          "rgba(109,40,217,0.8)",
        ]}
        className="w-full h-full px-6 pt-12 flex justify-between"
      >
        {/* Notification */}
        <HeroNotification />

        {/* Hero content */}
        <View className="mb-12">
          <Text className="text-white text-4xl font-bold mb-3 leading-tight">
            <Text style={{ color: COLORS.WARNING[400], fontWeight: "900" }}>
              Borrow
            </Text>
            <Text> What You Need,{"\n"}</Text>
            <Text style={{ color: COLORS.WARNING[400], fontWeight: "900" }}>
              Share
            </Text>
            <Text> What You Have</Text>
          </Text>
          <Text className="text-white/80 text-lg mb-8">
            Join our community of resource-sharing neighbors
          </Text>
          <View className="flex-row space-x-4 w-1/2">
            <Button
              title="Explore Items"
              onPress={() => console.log("Browse Items")}
              variant="primary"
              fullWidth
            />
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}
