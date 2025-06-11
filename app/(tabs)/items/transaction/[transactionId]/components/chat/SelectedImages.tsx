import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type SelectedImagesProps = {
  images: string[];
  onRemoveImage: (index: number) => void;
};

export default function SelectedImages({
  images,
  onRemoveImage,
}: SelectedImagesProps) {
  return (
    <View className="p-2 bg-neutral-50 flex-row">
      {images.map((uri, index) => (
        <View key={index} className="relative mr-2">
          <Image source={{ uri }} className="w-16 h-16 rounded-lg" />
          <TouchableOpacity
            onPress={() => onRemoveImage(index)}
            className="absolute top-1 right-1 bg-black/60 rounded-full w-5 h-5 items-center justify-center"
          >
            <Ionicons name="close" size={12} color="white" />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}
