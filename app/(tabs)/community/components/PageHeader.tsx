import React from "react";
import { View, Text, TouchableOpacity, StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { COLORS } from "../../../../constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface PageHeaderProps {
  title: string;
  showBackButton?: boolean;
  rightComponent?: React.ReactNode;
  onBackPress?: () => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  showBackButton = false,
  rightComponent,
  onBackPress,
}) => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
    }
  };

  return (
    <View
      className="bg-white border-b border-neutral-100"
      style={{ paddingTop: insets.top + 8, paddingBottom: 8 }}
    >
      <StatusBar barStyle="dark-content" />

      <View className="flex-row items-center justify-between px-4 mt-2">
        {showBackButton ? (
          <TouchableOpacity
            className="w-8 h-8 items-center justify-center rounded-full"
            onPress={handleBack}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="arrow-back" size={24} color={COLORS.NEUTRAL[900]} />
          </TouchableOpacity>
        ) : (
          <View className="w-8" />
        )}

        <Text
          className="flex-1 text-center text-[17px] font-semibold text-neutral-900"
          numberOfLines={1}
        >
          {title}
        </Text>

        {rightComponent ? rightComponent : <View className="w-8" />}
      </View>
    </View>
  );
};

export default PageHeader;
