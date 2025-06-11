import React from "react";
import { View, Image } from "react-native";

type MessageImageProps = {
  images: string[];
};

export default function MessageImage({ images }: MessageImageProps) {
  return (
    <View className="mb-2">
      {images.length === 1 ? (
        <Image
          source={{ uri: images[0] }}
          className="w-full h-[200px] rounded-lg"
          resizeMode="cover"
        />
      ) : (
        <View className="flex-row flex-wrap">
          {images.map((uri, imgIndex) => (
            <Image
              key={imgIndex}
              source={{ uri }}
              className={`rounded-lg ${
                images.length === 2
                  ? "w-[49%] h-[120px] mr-[2%]"
                  : "w-[32%] h-[100px] mr-[2%]"
              }`}
              style={{
                marginRight:
                  imgIndex === images.length - 1 ||
                  (images.length === 3 && imgIndex === 1)
                    ? 0
                    : "2%",
              }}
              resizeMode="cover"
            />
          ))}
        </View>
      )}
    </View>
  );
}
