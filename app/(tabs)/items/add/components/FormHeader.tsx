import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS } from "../../../../../constants/Colors";

interface FormHeaderProps {
  onSave: () => void;
}

const FormHeader: React.FC<FormHeaderProps> = ({ onSave }) => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View
      className="bg-white border-b border-neutral-100 px-4"
      style={{ paddingTop: insets.top }}
    >
      <View className="flex-row items-center justify-between h-14">
        <TouchableOpacity
          className="w-10 h-10 items-center justify-center rounded-full"
          onPress={() => router.back()}
        >
          <Ionicons name="close" size={24} color={COLORS.NEUTRAL[900]} />
        </TouchableOpacity>

        <Text className="text-lg font-semibold text-neutral-900">
          Add New Item
        </Text>

        <TouchableOpacity
          className="w-10 h-10 items-center justify-center"
          onPress={onSave}
        >
          <Text className="font-bold text-primary-500">Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FormHeader;
