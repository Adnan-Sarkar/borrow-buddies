import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, Animated } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../../../constants/Colors";
import {
  communityApi,
  useTogglePostLikeMutation,
} from "../../../../redux/api/communityApi";
import { formatDate } from "@/utils/dateUtils";
import { useAppDispatch } from "@/redux/store";
import { tagTypes } from "@/redux/tag-types";

type PostCardProps = {
  post: {
    id: string;
    title: string;
    content: string;
    images?: string[];
    author: {
      id: string;
      name: string;
      profilePicture?: string;
    };
    _count: {
      comments: number;
      reactions: number;
    };
    hasLiked?: boolean;
    createdAt: string;
    updatedAt: string;
  };
  refetch: () => void;
};

const PostCard: React.FC<PostCardProps> = ({ post, refetch }) => {
  const [liked, setLiked] = useState(post.hasLiked || false);
  const [likeCount, setLikeCount] = useState(post._count?.reactions || 0);
  const [heartScale] = useState(new Animated.Value(1));
  const dispatch = useAppDispatch();

  const [toggleLike] = useTogglePostLikeMutation();

  if (!post || !post.id) {
    console.log("Invalid post data received in PostCard");
    return null;
  }

  // Update state if props change
  useEffect(() => {
    if (post.hasLiked !== undefined) {
      setLiked(post.hasLiked);
    }
    setLikeCount(post._count?.reactions || 0);
  }, [post.hasLiked, post._count?.reactions]);

  const formattedDate = formatDate(post.createdAt);

  const truncatedContent =
    post.content.length > 120
      ? `${post.content.substring(0, 120)}...`
      : post.content;

  const handleLike = () => {
    // Animate heart icon
    Animated.sequence([
      Animated.timing(heartScale, {
        toValue: 1.3,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(heartScale, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();

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

  return (
    <TouchableOpacity
      className="bg-white mb-4 mx-5 rounded-xl overflow-hidden border border-neutral-100"
      activeOpacity={0.97}
    >
      <View className="p-4">
        {/* Author section */}
        <View className="flex-row items-center mb-3.5">
          {post.author?.profilePicture ? (
            <Image
              source={{ uri: post.author.profilePicture }}
              className="w-10 h-10 rounded-full bg-neutral-200"
            />
          ) : (
            <View className="w-10 h-10 rounded-full bg-primary-100 items-center justify-center">
              <Text className="font-bold text-primary-600">
                {post.author?.name?.charAt(0)?.toUpperCase() || "?"}
              </Text>
            </View>
          )}

          <View className="ml-3 flex-1">
            <Text className="font-semibold text-neutral-800">
              {post.author?.name || "Anonymous"}
            </Text>
            <Text className="text-xs text-neutral-500">{formattedDate}</Text>
          </View>
        </View>

        {/* Content */}
        <View>
          <Text className="font-bold text-lg text-neutral-800 mb-1.5">
            {post.title}
          </Text>
          <Text className="text-neutral-600 leading-5 mb-3">
            {truncatedContent}
          </Text>
        </View>

        {/* Image (if exists) */}
        {post.images && post.images.length > 0 && (
          <View className="mb-3 rounded-lg overflow-hidden">
            <Image
              source={{ uri: post.images[0] }}
              className="w-full h-48 bg-neutral-100"
              resizeMode="cover"
            />
            {post.images.length > 1 && (
              <View className="absolute top-2 right-2 bg-black/60 px-2 py-1 rounded-md">
                <Text className="text-white font-medium text-xs">
                  +{post.images.length - 1}
                </Text>
              </View>
            )}
          </View>
        )}

        {/* Post card footer */}
        <View className="flex-row items-center justify-between mt-1 pt-3 border-t border-neutral-100">
          <View className="flex-row items-center">
            {/* Like button */}
            <TouchableOpacity
              className="flex-row items-center mr-4"
              onPress={handleLike}
              activeOpacity={0.7}
            >
              <Animated.View style={{ transform: [{ scale: heartScale }] }}>
                <Ionicons
                  name={liked ? "heart" : "heart-outline"}
                  size={26}
                  color={liked ? COLORS.PRIMARY[500] : COLORS.NEUTRAL[400]}
                />
              </Animated.View>
              <Text
                className={`ml-1.5 text-lg ${
                  liked ? "text-primary-500 font-medium" : "text-neutral-500"
                }`}
              >
                {likeCount}
              </Text>
            </TouchableOpacity>

            {/* Comment count */}
            <View className="flex-row items-center">
              <Ionicons
                name="chatbubble-outline"
                size={22}
                color={COLORS.NEUTRAL[400]}
              />
              <Text className="ml-1.5 text-lg text-neutral-500">
                {post._count?.comments || 0}
              </Text>
            </View>
          </View>

          {/* View post button */}
          <TouchableOpacity
            className="flex-row items-center px-5 py-1.5 bg-neutral-50 rounded-full"
            onPress={() => router.push(`/community/${post.id}`)}
            activeOpacity={0.7}
          >
            <Text className="text-sm text-neutral-500 font-medium mr-1.5">
              View Details
            </Text>
            <Ionicons
              name="chevron-forward"
              size={16}
              color={COLORS.NEUTRAL[500]}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PostCard;
