import React from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const AddItemButton = () => {
  const router = useRouter();

  const handleAddPress = () => {
    router.push("/items/add");
  };

  return (
    <TouchableOpacity
      className="absolute justify-center items-center w-14 h-14 rounded-full bg-primary-500 z-10"
      style={{
        right: 20,
        bottom: 20,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      }}
      onPress={handleAddPress}
    >
      <Ionicons name="add" size={24} color="white" />
    </TouchableOpacity>
  );
};

export default AddItemButton;
