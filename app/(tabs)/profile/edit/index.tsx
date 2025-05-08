import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../../../constants/Colors";
import { router, useLocalSearchParams } from "expo-router";
import UpdateProfileInfoSection from "./components/UpdateProfileInfoSection";
import UpdateLocationSection from "./components/UpdateLocationSection";
import UpdatePasswordSection from "./components/UpdatePasswordSection";
import { useGetMyProfileQuery } from "@/redux/api/profileApi";
import UpdateProfilePictureSection from "./components/UpdateProfilePictureSection";

export default function EditProfileScreen() {
  const { data: profileData, isLoading } = useGetMyProfileQuery({});
  const { scrollTo } = useLocalSearchParams();

  const scrollViewRef = useRef<ScrollView | null>(null);

  const profileSectionRef = useRef<View | null>(null);
  const contactSectionRef = useRef<View | null>(null);
  const passwordSectionRef = useRef<View | null>(null);

  type SectionName = "profile" | "contact" | "password";

  const sectionRefs: {
    [key in SectionName]: React.RefObject<View>;
  } = {
    profile: profileSectionRef,
    contact: contactSectionRef,
    password: passwordSectionRef,
  };

  const scrollToSection = (sectionId: SectionName) => {
    const sectionRef = sectionRefs[sectionId];

    if (!sectionRef?.current || !scrollViewRef?.current) return;
    setTimeout(() => {
      try {
        if (sectionRef.current && scrollViewRef.current) {
          sectionRef.current.measure((_, __, ___, ____, _____, pageY) => {
            (scrollViewRef.current as ScrollView).scrollTo({
              y: pageY - 20,
              animated: true,
            });
          });
        }
      } catch (error) {
        console.log("Couldn't scroll to section:", error);
      }
    }, 300);
  };

  useEffect(() => {
    if (
      scrollTo === "profile" ||
      scrollTo === "contact" ||
      scrollTo === "password"
    ) {
      scrollToSection(scrollTo);
    }
  }, [scrollTo]);

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center">
        <ActivityIndicator size="large" color={COLORS.PRIMARY[500]} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false}>
        {/* Header with back button */}
        <View className="flex-row items-center justify-between px-6 pt-4 pb-3">
          <TouchableOpacity
            onPress={() => router.back()}
            className="p-2 -ml-2"
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={24} color={COLORS.NEUTRAL[800]} />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-neutral-800">
            Edit Profile
          </Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Profile Picture Section */}
        <UpdateProfilePictureSection profileData={profileData} />

        {/* Profile Info Section */}
        <View ref={profileSectionRef} style={{ width: "100%" }}>
          <UpdateProfileInfoSection profileData={profileData} />
        </View>

        {/* Location Section */}
        <View ref={contactSectionRef} style={{ width: "100%" }}>
          <UpdateLocationSection profileData={profileData} />
        </View>

        {/* Password Section */}
        <View ref={passwordSectionRef} style={{ width: "100%" }}>
          <UpdatePasswordSection />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
