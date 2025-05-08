import React from "react";
import { ScrollView, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import ProfileHeader from "./components/ProfileHeader";
import ProfileCard from "./components/ProfileCard";
import ProfileMenuItem from "./components/ProfileMenuItem";
import ProfileLogoutButton from "./components/ProfileLogoutButton";
import { COLORS } from "../../../constants/Colors";

export default function ProfileScreen() {
  const menuSections = [
    {
      title: "Profile Information",
      items: [
        {
          icon: "person-outline",
          title: "My Profile",
          description: "View your personal information",
          route: "/profile/me",
          iconBgColor: COLORS.PRIMARY[50],
          iconColor: COLORS.PRIMARY[600],
        },
        {
          icon: "create-outline",
          title: "Edit Profile",
          description: "Update your personal information",
          route: "/profile/edit",
          iconBgColor: COLORS.PRIMARY[50],
          iconColor: COLORS.PRIMARY[600],
        },
        {
          icon: "star-outline",
          title: "My Reviews",
          description: "See reviews from other users",
          route: "/profile/reviews",
          iconBgColor: COLORS.SECONDARY[50],
          iconColor: COLORS.SECONDARY[600],
        },
      ],
      headerBgColor: COLORS.PRIMARY[50],
      headerTextColor: COLORS.PRIMARY[700],
    },
    {
      title: "Payments & Transactions",
      items: [
        {
          icon: "card-outline",
          title: "Payment Methods",
          description: "Manage your payment options",
          route: "/profile/payment",
          iconBgColor: COLORS.SUCCESS[50],
          iconColor: COLORS.SUCCESS[600],
        },
        {
          icon: "receipt-outline",
          title: "Transaction History",
          description: "View your past transactions",
          route: "/profile/transactions",
          iconBgColor: COLORS.SUCCESS[50],
          iconColor: COLORS.SUCCESS[600],
        },
      ],
      headerBgColor: COLORS.SUCCESS[50],
      headerTextColor: COLORS.SUCCESS[700],
    },
    {
      title: "Settings & Privacy",
      items: [
        {
          icon: "notifications-outline",
          title: "Notifications",
          description: "Configure notification preferences",
          route: "/profile/notifications",
          iconBgColor: COLORS.WARNING[50],
          iconColor: COLORS.WARNING[600],
        },
        {
          icon: "shield-outline",
          title: "Privacy & Security",
          description: "Manage your account security",
          route: "/profile/privacy",
          iconBgColor: COLORS.ERROR[50],
          iconColor: COLORS.ERROR[600],
        },
      ],
      headerBgColor: COLORS.WARNING[50],
      headerTextColor: COLORS.WARNING[700],
    },
    {
      title: "Support & Legal",
      items: [
        {
          icon: "help-circle-outline",
          title: "Help & Support",
          description: "Get assistance or report issues",
          route: "/profile/support",
          iconBgColor: COLORS.NEUTRAL[100],
          iconColor: COLORS.NEUTRAL[600],
        },
        {
          icon: "information-circle-outline",
          title: "About",
          description: "App information and terms",
          route: "/profile/about",
          iconBgColor: COLORS.NEUTRAL[100],
          iconColor: COLORS.NEUTRAL[600],
        },
      ],
      headerBgColor: COLORS.NEUTRAL[100],
      headerTextColor: COLORS.NEUTRAL[700],
    },
  ];

  const renderSectionTitle = (title: string, color: string) => (
    <Text className={`text-sm font-semibold ml-1`} style={{ color }}>
      {title}
    </Text>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false} className="pb-6">
        {/* Header */}
        <ProfileHeader title="Profile" />

        {/* Profile Card */}
        <ProfileCard />

        {/* Menu Sections */}
        <View className="px-6 flex flex-col gap-5 mt-4">
          {menuSections.map((section, sectionIndex) => (
            <View
              key={sectionIndex}
              className="bg-white rounded-xl border border-neutral-100 overflow-hidden"
            >
              {/* Section header */}
              <View
                className="px-4 py-3"
                style={{ backgroundColor: section.headerBgColor }}
              >
                {renderSectionTitle(section.title, section.headerTextColor)}
              </View>

              {/* Menu Items */}
              <View className="px-4">
                {section.items.map((item, itemIndex) => (
                  <ProfileMenuItem
                    key={itemIndex}
                    icon={item.icon}
                    title={item.title}
                    description={item.description}
                    isLast={itemIndex === section.items.length - 1}
                    onPress={() => router.push(item.route as any)}
                    iconBgColor={item.iconBgColor}
                    iconColor={item.iconColor}
                  />
                ))}
              </View>
            </View>
          ))}

          {/* Logout */}
          <View className="mt-1 mb-4">
            <View className="bg-white rounded-xl border border-neutral-100 overflow-hidden">
              <View
                className="px-4 py-3"
                style={{ backgroundColor: COLORS.ERROR[50] }}
              >
                {renderSectionTitle("Account", COLORS.ERROR[700])}
              </View>
              <View className="px-4">
                <ProfileLogoutButton />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
