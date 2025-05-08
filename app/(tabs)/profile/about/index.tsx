import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/Colors";
import Logo from "@/components/common/Logo";
import AppVersion from "../components/AppVersion";

export default function AboutScreen() {
  const router = useRouter();
  const appVersion = "1.0.0";

  const openLink = (url: string) => {
    Linking.openURL(url).catch((err) =>
      console.error("Couldn't open URL: ", err)
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      {/* Header */}
      <View className="flex-row items-center px-4 py-3 border-b border-neutral-200">
        <TouchableOpacity className="p-2" onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.NEUTRAL[800]} />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-neutral-900 ml-2">
          About
        </Text>
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerClassName="px-5 pt-8 pb-2"
      >
        {/* Section 1: Logo and Slogan */}
        <View className="items-center mb-12">
          <Logo size={50} color="primary" />

          <View className="bg-primary-50 rounded-full px-8 py-3 mt-6">
            <Text className="text-primary-500 font-semibold text-center text-base">
              Together We Share, Together We Earn
            </Text>
          </View>
        </View>

        {/* Section 2: About App */}
        <View className="bg-white mb-6 rounded-2xl p-5 border border-neutral-100">
          {/* Heading */}
          <View className="flex-row items-center mb-5">
            <View className="w-12 h-12 rounded-full bg-primary-50 items-center justify-center">
              <Ionicons
                name="information-circle-outline"
                size={26}
                color={COLORS.PRIMARY[500]}
              />
            </View>
            <View className="ml-3">
              <Text className="text-xl font-bold text-neutral-800">
                About Borrow Buddies
              </Text>
              <Text className="text-xs text-neutral-500 mt-0.5">
                Our mission and values
              </Text>
            </View>
          </View>

          {/* Description */}
          <Text className="text-base text-neutral-700 leading-6 mb-6">
            Borrow Buddies helps you borrow items from people in your community,
            building connections while reducing environmental impact. Our
            mission is to create a world where sharing is the new owning.
          </Text>

          {/* Values */}
          <View className="bg-neutral-50 rounded-xl p-4 flex-row justify-between">
            <View className="items-center px-2">
              <View className="h-10 w-10 rounded-full bg-green-50 items-center justify-center mb-2">
                <Ionicons name="leaf-outline" size={20} color="#16a34a" />
              </View>
              <Text className="font-medium text-neutral-800 text-sm">
                Sustainable
              </Text>
            </View>

            <View className="items-center px-2">
              <View className="h-10 w-10 rounded-full bg-blue-50 items-center justify-center mb-2">
                <Ionicons name="people-outline" size={20} color="#2563eb" />
              </View>
              <Text className="font-medium text-neutral-800 text-sm">
                Community
              </Text>
            </View>

            <View className="items-center px-2">
              <View className="h-10 w-10 rounded-full bg-amber-50 items-center justify-center mb-2">
                <Ionicons name="wallet-outline" size={20} color="#d97706" />
              </View>
              <Text className="font-medium text-neutral-800 text-sm">
                Savings
              </Text>
            </View>
          </View>
        </View>

        {/* Section 3: App Version */}
        <View className="bg-white mb-2 rounded-2xl p-5 border border-neutral-100">
          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center">
              <View className="w-9 h-9 rounded-full bg-neutral-50 items-center justify-center">
                <Ionicons
                  name="code-slash-outline"
                  size={18}
                  color={COLORS.NEUTRAL[600]}
                />
              </View>
              <Text className="ml-3 text-base font-medium text-neutral-700">
                Version
              </Text>
            </View>
            <View className="bg-neutral-50 rounded-full px-3 py-1">
              <Text className="text-sm font-semibold text-neutral-800">
                {appVersion}
              </Text>
            </View>
          </View>

          <View className="mt-5 border-t border-neutral-100 pt-5">
            <TouchableOpacity className="flex-row justify-between items-center">
              <View className="flex-row items-center">
                <View className="w-9 h-9 rounded-full bg-neutral-50 items-center justify-center">
                  <Ionicons
                    name="document-text-outline"
                    size={18}
                    color={COLORS.PRIMARY[500]}
                  />
                </View>
                <Text className="ml-3 text-base text-neutral-700">
                  Terms of Service
                </Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={18}
                color={COLORS.NEUTRAL[400]}
              />
            </TouchableOpacity>
          </View>

          <View className="mt-5 border-t border-neutral-100 pt-5">
            <TouchableOpacity className="flex-row justify-between items-center">
              <View className="flex-row items-center">
                <View className="w-9 h-9 rounded-full bg-neutral-50 items-center justify-center">
                  <Ionicons
                    name="shield-outline"
                    size={18}
                    color={COLORS.PRIMARY[500]}
                  />
                </View>
                <Text className="ml-3 text-base text-neutral-700">
                  Privacy Policy
                </Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={18}
                color={COLORS.NEUTRAL[400]}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
