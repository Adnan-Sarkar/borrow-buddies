import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Modal,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../../../../constants/Colors";
import {
  communityApi,
  useTogglePostLikeMutation,
} from "../../../../../redux/api/communityApi";
import { useAppDispatch } from "@/redux/store";
import { tagTypes } from "@/redux/tag-types";

const { width, height } = Dimensions.get("window");
const IMAGE_SIZE = width - 40;

type PostContentProps = {
  post: {
    id: string;
    title: string;
    content: string;
    images?: string[];
    hasLiked?: boolean;
    _count?: {
      comments?: number;
      reactions?: number;
    };
  };
  refetch: () => void;
};

const PostContent: React.FC<PostContentProps> = ({ post, refetch }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [liked, setLiked] = useState(post?.hasLiked || false);
  const [likeCount, setLikeCount] = useState(post?._count?.reactions || 0);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [toggleLike] = useTogglePostLikeMutation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (post?.hasLiked !== undefined) {
      setLiked(post?.hasLiked);
      setLikeCount(post?._count?.reactions || 0);
    }
  }, [post?.hasLiked]);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));

    toggleLike(post.id)
      .unwrap()
      .then(() => {
        dispatch(communityApi.util.invalidateTags([tagTypes.communityPost]));
      })
      .catch((error) => {
        console.error("Failed to toggle like:", error);
        setLiked(liked);
        setLikeCount((prev) => (liked ? prev + 1 : prev - 1));
      })
      .finally(() => {
        refetch();
      });
  };

  // Function to open modal with specific image
  const openImageViewer = (index: number) => {
    setSelectedImageIndex(index);
    setModalVisible(true);
  };

  const renderImageIndicator = () => {
    if (!post.images || post.images.length <= 1) return null;

    return (
      <View className="absolute bottom-3 self-center flex-row">
        {post?.images.map((_, index) => (
          <View
            key={index}
            className={`h-2 w-2 rounded-full mx-1 ${
              index === currentImageIndex ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </View>
    );
  };

  return (
    post && (
      <View className="px-5 pb-4">
        <Text className="text-2xl font-bold text-neutral-900 mb-3">
          {post?.title}
        </Text>

        <Text className="text-neutral-700 leading-6 mb-5">{post?.content}</Text>

        {post?.images && post?.images.length > 0 && (
          <View className="mb-5 relative">
            <FlatList
              data={post?.images}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={(e) => {
                const newIndex = Math.round(
                  e.nativeEvent.contentOffset.x / IMAGE_SIZE
                );
                setCurrentImageIndex(newIndex);
              }}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => openImageViewer(index)}
                >
                  <View
                    style={{ width: IMAGE_SIZE, height: IMAGE_SIZE }}
                    className="rounded-xl overflow-hidden mr-2"
                  >
                    <Image
                      source={{ uri: item }}
                      className="h-full w-full bg-neutral-100"
                      resizeMode="cover"
                    />
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(_, index) => `image-${index}`}
            />
            {renderImageIndicator()}
          </View>
        )}

        <View className="pb-2 pt-3 border-b border-t border-neutral-100">
          <View className="flex-row items-center justify-between">
            <TouchableOpacity
              className="flex-row items-center mr-6"
              onPress={handleLike}
            >
              <Ionicons
                name={liked ? "heart" : "heart-outline"}
                size={30}
                color={liked ? COLORS.PRIMARY[500] : COLORS.NEUTRAL[500]}
              />
              <Text
                className={`ml-2 text-xl ${
                  liked ? "text-primary-500 font-medium" : "text-neutral-500"
                }`}
              >
                {likeCount}
              </Text>
            </TouchableOpacity>

            <View className="flex-row items-center">
              <Ionicons
                name="chatbubble-outline"
                size={28}
                color={COLORS.NEUTRAL[500]}
              />
              <Text className="ml-2 text-xl text-neutral-500">
                {post?._count?.comments || 0}
              </Text>
            </View>
          </View>
        </View>

        {/* Image Viewer Modal */}
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <SafeAreaView className="flex-1 bg-black">
            <StatusBar barStyle="light-content" backgroundColor="#000000" />

            {/* Close button */}
            <TouchableOpacity
              className="absolute top-10 right-5 z-10 bg-black/50 rounded-full p-2"
              onPress={() => setModalVisible(false)}
            >
              <Ionicons name="close" size={24} color="white" />
            </TouchableOpacity>

            {/* Image gallery */}
            <FlatList
              data={post?.images || []}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              initialScrollIndex={selectedImageIndex}
              getItemLayout={(_, index) => ({
                length: width,
                offset: width * index,
                index,
              })}
              renderItem={({ item }) => (
                <View style={{ width, height, justifyContent: "center" }}>
                  <Image
                    source={{ uri: item }}
                    style={{ width, height: height * 0.8 }}
                    resizeMode="contain"
                  />
                </View>
              )}
              keyExtractor={(_, index) => `fullscreen-image-${index}`}
            />

            {/* Counter indicator */}
            <View className="absolute bottom-10 self-center bg-black/50 px-4 py-2 rounded-full">
              <Text className="text-white font-medium">
                {selectedImageIndex + 1} / {post?.images?.length || 0}
              </Text>
            </View>
          </SafeAreaView>
        </Modal>
      </View>
    )
  );
};

export default PostContent;
