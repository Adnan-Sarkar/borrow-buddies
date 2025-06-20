import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type ActionButtonsProps = {
  onApprove: () => void;
  onReject: () => void;
  isProcessing: boolean;
};

export default function ActionButtons({
  onApprove,
  onReject,
  isProcessing,
}: ActionButtonsProps) {
  return (
    <View className="flex-row gap-3 mt-3">
      <TouchableOpacity
        onPress={onReject}
        disabled={isProcessing}
        className="flex-1 border border-error-200 rounded-lg py-3 flex-row justify-center items-center"
      >
        <Text className="text-error-600 font-medium">Decline</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onApprove}
        disabled={isProcessing}
        className="flex-1 bg-primary-600 rounded-lg py-3 flex-row justify-center items-center"
      >
        {isProcessing ? (
          <View className="mr-2 h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <Ionicons name="checkmark-outline" size={18} color="white" />
        )}
        <Text className="text-white font-medium ml-1">Approve</Text>
      </TouchableOpacity>
    </View>
  );
}
