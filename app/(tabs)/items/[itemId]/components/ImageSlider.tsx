import React, { useState } from "react";
import {
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { EdgeInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

interface ImageSliderProps {
  images: string[];
  insets: EdgeInsets;
  onBackPress: () => void;
}

export default function ImageSlider({ images, onBackPress }: ImageSliderProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // If there are no images, use a placeholder
  const imageUrls =
    images?.length > 0
      ? images
      : ["https://via.placeholder.com/800x600?text=No+Image+Available"];

  return (
    <View>
      <View style={{ height: StatusBar.currentHeight || 0 }} />

      <FlatList
        data={imageUrls}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          const index = Math.floor(e.nativeEvent.contentOffset.x / width);
          setCurrentImageIndex(index);
        }}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item }}
            style={{ width, height: 300 }}
            resizeMode="cover"
          />
        )}
        keyExtractor={(_, index) => index.toString()}
      />

      {/* Back button  */}
      <TouchableOpacity
        className="absolute left-0 w-10 h-10 bg-black/30 rounded-full m-4 items-center justify-center"
        style={{
          top: (StatusBar.currentHeight || 0) + 10,
        }}
        onPress={onBackPress}
      >
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>

      {/* Image indicator */}
      <View className="absolute bottom-4 left-0 right-0 flex-row justify-center">
        {imageUrls.map((_, index) => (
          <View
            key={index}
            className={`h-2 w-2 rounded-full mx-1 ${
              index === currentImageIndex ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </View>
    </View>
  );
}
