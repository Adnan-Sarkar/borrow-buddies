import React from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { COLORS } from "@/constants/Colors";

type ChatInputProps = {
  message: string;
  onChangeMessage: (text: string) => void;
  onSend: () => void;
  onAddImages: (images: string[]) => void;
  isSending: boolean;
  disableSend: boolean;
};

export default function ChatInput({
  message,
  onChangeMessage,
  onSend,
  onAddImages,
  isSending,
  disableSend,
}: ChatInputProps) {
  const pickImages = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      allowsMultipleSelection: true,
      quality: 0.8,
      selectionLimit: 5,
    });

    if (!result.canceled && result.assets.length > 0) {
      onAddImages(result.assets.map((asset) => asset.uri));
    }
  };

  return (
    <View className="px-3 py-4 border-t border-neutral-200 bg-white flex-row items-center">
      <TouchableOpacity
        onPress={pickImages}
        className="w-12 h-12 items-center justify-center bg-neutral-100 rounded-md"
      >
        <Ionicons name="image-outline" size={24} color={COLORS.NEUTRAL[500]} />
      </TouchableOpacity>
      <TextInput
        value={message}
        onChangeText={onChangeMessage}
        className="flex-1 bg-neutral-100 rounded-md px-4 py-3 mx-2 text-neutral-800"
        placeholder="Type a message..."
        placeholderTextColor={COLORS.NEUTRAL[400]}
        multiline
        maxLength={500}
      />
      <TouchableOpacity
        onPress={onSend}
        disabled={disableSend}
        className={`w-12 h-12 rounded-md items-center justify-center ${
          disableSend ? "bg-neutral-200" : "bg-primary-500"
        }`}
      >
        {isSending ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Ionicons name="send" size={18} color="white" />
        )}
      </TouchableOpacity>
    </View>
  );
}
