import React from "react";
import { ScrollView, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeroSection from "./components/HeroSection";
import StatsSection from "./components/StatsSection";
import CategoriesSection from "./components/CategoriesSection";
import HowItWorksSection from "./components/HowItWorksSection";
import TestimonialsSection from "./components/TestimonialsSection";
import BenefitsSection from "./components/BenefitsSection";
import CTASection from "./components/CTASection";
import { usePushNotifications } from "@/hooks/usePushNotifications";

export default function HomeScreen() {
  usePushNotifications();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar
        backgroundColor="transparent"
        translucent
        barStyle="light-content"
      />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <HeroSection />

        {/* Stats Section */}
        <StatsSection />

        {/* Categories Section */}
        <CategoriesSection />

        {/* How it Works Section */}
        <HowItWorksSection />

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* Benefits Section */}
        <BenefitsSection />

        {/* CTA Section */}
        <CTASection />
      </ScrollView>
    </SafeAreaView>
  );
}
