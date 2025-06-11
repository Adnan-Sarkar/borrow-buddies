import React from "react";
import { TouchableOpacity, Text, ActivityIndicator } from "react-native";

interface SubmitButtonProps {
  onPress: () => void;
  isSubmitting: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  onPress,
  isSubmitting,
}) => {
  return (
    <TouchableOpacity
      className="bg-primary-500 rounded-lg py-4 items-center justify-center mb-8"
      onPress={onPress}
      disabled={isSubmitting}
    >
      {isSubmitting ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text className="text-white font-bold text-base">Add Item</Text>
      )}
    </TouchableOpacity>
  );
};

export default SubmitButton;
