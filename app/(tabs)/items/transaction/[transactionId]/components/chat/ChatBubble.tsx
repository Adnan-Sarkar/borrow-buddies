import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  Dimensions,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { Message } from "./types";

const { width, height } = Dimensions.get("window");

type ChatBubbleProps = {
  message: Message;
  isCurrentUser: boolean;
  formatTime: (date: string) => string;
};

export default function ChatBubble({
  message,
  isCurrentUser,
  formatTime,
}: ChatBubbleProps) {
  const [viewerVisible, setViewerVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const flatListRef = React.useRef<FlatList<string>>(null);

  // Extract profile picture if available
  const profilePic = !isCurrentUser && message.sender?.profilePicture;

  // Get valid image URLs
  const images: string[] = [];
  if (message.images && Array.isArray(message.images)) {
    for (const img of message.images) {
      if (!img) continue;

      if (typeof img === "string") {
        images.push(img);
      } else if (
        typeof img === "object" &&
        img !== null &&
        "uri" in img &&
        typeof (img as any).uri === "string"
      ) {
        images.push((img as any).uri);
      }
    }
  }

  // Open the full-screen image viewer
  const openViewer = (index: number) => {
    setSelectedIndex(index);
    setViewerVisible(true);
  };

  return (
    <View className="mb-3">
      {/* Message Row */}
      <View
        className={`flex-row ${
          isCurrentUser ? "justify-end" : "justify-start"
        }`}
      >
        {/* Profile Picture (only for received messages) */}
        {!isCurrentUser && (
          <View className="mr-2 mt-1">
            {profilePic ? (
              <Image
                source={{ uri: profilePic }}
                className="w-8 h-8 rounded-full"
              />
            ) : (
              <View className="w-8 h-8 rounded-full bg-neutral-200 items-center justify-center">
                <Text className="text-neutral-600 font-medium">
                  {message.sender?.name?.[0]?.toUpperCase() || "?"}
                </Text>
              </View>
            )}
          </View>
        )}

        {/* Message Content */}
        <View className="max-w-[75%]">
          {/* Images (if any) */}
          {images.length > 0 && (
            <View className="mb-1 overflow-hidden rounded-xl">
              {images.length === 1 ? (
                // Single image - full size
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => openViewer(0)}
                >
                  <Image
                    source={{ uri: images[0] }}
                    className="w-full h-48 rounded-lg"
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              ) : images.length === 2 ? (
                // Two images - side by side
                <View className="flex-row h-40">
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => openViewer(0)}
                    className="flex-1 mr-0.5"
                  >
                    <Image
                      source={{ uri: images[0] }}
                      className="h-full rounded-lg"
                      resizeMode="cover"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => openViewer(1)}
                    className="flex-1 ml-0.5"
                  >
                    <Image
                      source={{ uri: images[1] }}
                      className="h-full rounded-lg"
                      resizeMode="cover"
                    />
                  </TouchableOpacity>
                </View>
              ) : images.length === 3 ? (
                // Three images - one large left, two stacked right
                <View className="flex-row h-60">
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => openViewer(0)}
                    className="w-1/2 mr-0.5"
                  >
                    <Image
                      source={{ uri: images[0] }}
                      className="h-full rounded-lg"
                      resizeMode="cover"
                    />
                  </TouchableOpacity>
                  <View className="w-1/2 ml-0.5">
                    <TouchableOpacity
                      activeOpacity={0.9}
                      onPress={() => openViewer(1)}
                      className="h-1/2 mb-0.5"
                    >
                      <Image
                        source={{ uri: images[1] }}
                        className="h-full rounded-lg"
                        resizeMode="cover"
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      activeOpacity={0.9}
                      onPress={() => openViewer(2)}
                      className="h-1/2 mt-0.5"
                    >
                      <Image
                        source={{ uri: images[2] }}
                        className="h-full rounded-lg"
                        resizeMode="cover"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              ) : images.length === 4 ? (
                // Four images - 2x2 grid
                <View className="h-60">
                  <View className="flex-row h-1/2 mb-0.5">
                    <TouchableOpacity
                      activeOpacity={0.9}
                      onPress={() => openViewer(0)}
                      className="w-1/2 mr-0.5"
                    >
                      <Image
                        source={{ uri: images[0] }}
                        className="h-full rounded-lg"
                        resizeMode="cover"
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      activeOpacity={0.9}
                      onPress={() => openViewer(1)}
                      className="w-1/2 ml-0.5"
                    >
                      <Image
                        source={{ uri: images[1] }}
                        className="h-full rounded-lg"
                        resizeMode="cover"
                      />
                    </TouchableOpacity>
                  </View>
                  <View className="flex-row h-1/2 mt-0.5">
                    <TouchableOpacity
                      activeOpacity={0.9}
                      onPress={() => openViewer(2)}
                      className="w-1/2 mr-0.5"
                    >
                      <Image
                        source={{ uri: images[2] }}
                        className="h-full rounded-lg"
                        resizeMode="cover"
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      activeOpacity={0.9}
                      onPress={() => openViewer(3)}
                      className="w-1/2 ml-0.5"
                    >
                      <Image
                        source={{ uri: images[3] }}
                        className="h-full rounded-lg"
                        resizeMode="cover"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                // Five images - 2 on top, 3 on bottom
                <View className="h-64">
                  {/* Top row - 2 large images */}
                  <View className="flex-row h-3/5 mb-0.5">
                    <TouchableOpacity
                      activeOpacity={0.9}
                      onPress={() => openViewer(0)}
                      className="w-1/2 mr-0.5"
                    >
                      <Image
                        source={{ uri: images[0] }}
                        className="h-full rounded-lg"
                        resizeMode="cover"
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      activeOpacity={0.9}
                      onPress={() => openViewer(1)}
                      className="w-1/2 ml-0.5"
                    >
                      <Image
                        source={{ uri: images[1] }}
                        className="h-full rounded-lg"
                        resizeMode="cover"
                      />
                    </TouchableOpacity>
                  </View>

                  {/* Bottom row - 3 smaller images */}
                  <View className="flex-row h-2/5 mt-0.5">
                    <TouchableOpacity
                      activeOpacity={0.9}
                      onPress={() => openViewer(2)}
                      className="w-1/3 mr-0.5"
                    >
                      <Image
                        source={{ uri: images[2] }}
                        className="h-full rounded-lg"
                        resizeMode="cover"
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      activeOpacity={0.9}
                      onPress={() => openViewer(3)}
                      className="w-1/3 mx-0.5"
                    >
                      <Image
                        source={{ uri: images[3] }}
                        className="h-full rounded-lg"
                        resizeMode="cover"
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      activeOpacity={0.9}
                      onPress={() => openViewer(4)}
                      className="w-1/3 ml-0.5"
                    >
                      <Image
                        source={{ uri: images[4] }}
                        className="h-full rounded-lg"
                        resizeMode="cover"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          )}

          {/* Text Message */}
          {message.content && (
            <View
              className={`rounded-2xl px-3 py-2 ${
                isCurrentUser
                  ? "bg-primary-500 rounded-tr-none"
                  : "bg-neutral-100 rounded-tl-none"
              }`}
            >
              <Text
                className={isCurrentUser ? "text-white" : "text-neutral-800"}
              >
                {message.content}
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* Timestamp */}
      <Text
        className={`text-xs text-neutral-400 mt-1 ${
          isCurrentUser ? "text-right" : "text-left"
        }`}
        style={{
          marginLeft: !isCurrentUser ? 36 : 0,
          marginRight: isCurrentUser ? 8 : 0,
        }}
      >
        {formatTime(message.createdAt)}
      </Text>

      {/* Image Viewer Modal */}
      <Modal visible={viewerVisible} transparent animationType="fade">
        <View className="flex-1 bg-black">
          {/* Close Button */}
          <TouchableOpacity
            className="absolute top-10 right-5 z-10 bg-black/30 p-2 rounded-full"
            onPress={() => setViewerVisible(false)}
          >
            <Ionicons name="close" size={24} color="white" />
          </TouchableOpacity>

          <FlatList
            ref={flatListRef}
            data={images}
            horizontal
            pagingEnabled
            initialScrollIndex={selectedIndex}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, i) => `image-${i}`}
            getItemLayout={(_, index) => ({
              length: width,
              offset: width * index,
              index,
            })}
            onScrollToIndexFailed={(info) => {
              setTimeout(() => {
                if (
                  info.index === selectedIndex &&
                  info.index < images.length
                ) {
                  flatListRef.current?.scrollToIndex({
                    index: info.index,
                    animated: false,
                  });
                }
              }, 100);
            }}
            renderItem={({ item }) => (
              <View style={{ width, height, justifyContent: "center" }}>
                <Image
                  source={{ uri: item }}
                  style={{ width, height: height * 0.8 }}
                  resizeMode="contain"
                />
              </View>
            )}
          />
        </View>
      </Modal>
    </View>
  );
}
