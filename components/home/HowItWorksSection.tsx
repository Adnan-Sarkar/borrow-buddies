import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/Colors";

export default function HowItWorksSection() {
  const steps = [
    {
      number: "1",
      title: "List Your Items",
      description:
        "Take photos and list items you're willing to share. Set availability, daily rates, and pickup location.",
      color: COLORS.PRIMARY,
      icon: "add-circle",
    },
    {
      number: "2",
      title: "Browse & Request",
      description:
        "Find items near you, check reviews, and send borrow requests to item owners.",
      color: COLORS.SECONDARY,
      icon: "search",
    },
    {
      number: "3",
      title: "Meet & Exchange",
      description:
        "Meet up in a safe location, verify the item condition, and complete secure payment through the app.",
      color: COLORS.WARNING,
      icon: "people",
    },
    {
      number: "4",
      title: "Return & Rate",
      description:
        "Return the item on time as agreed, and leave a review to help build community trust.",
      color: COLORS.SUCCESS,
      icon: "star",
    },
  ];

  return (
    <View className="py-12 bg-neutral-50">
      {/* title */}
      <View className="mb-10 px-6">
        <Text className="text-3xl font-bold text-neutral-800 mb-2 text-center">
          How It Works
        </Text>
        <Text className="text-neutral-600 text-center">
          Share and borrow items in 4 easy steps
        </Text>
      </View>

      {/* Steps */}
      <View className="px-6 space-y-6">
        {steps.map((step, index) => (
          <StepCard key={index} step={step} />
        ))}
      </View>
    </View>
  );
}

function StepCard({ step }: { step: any }) {
  const { number, title, description, color, icon } = step;

  return (
    <View
      className="rounded-2xl p-5 shadow-md"
      style={{
        backgroundColor: color[50],
        shadowColor: color[300],
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
        marginTop: 20,
      }}
    >
      <View className="flex-row items-center mb-3">
        <View
          className="w-10 h-10 rounded-full items-center justify-center"
          style={{ backgroundColor: color[100] }}
        >
          <Ionicons name={icon} size={22} color={color[700]} />
        </View>
        <Text
          className="text-2xl font-semibold ml-3"
          style={{ color: color[700] }}
        >
          {number}. {title}
        </Text>
      </View>
      <Text className="text-neutral-600 leading-relaxed">{description}</Text>
    </View>
  );
}
