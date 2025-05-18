import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../../../../constants/Colors";
import { formatDate } from "../../../../../utils/dateUtils";
import ReportModal from "./ReportModal";
import { selectCurrentUser } from "@/redux/feature/auth/authSlice";
import { useAppSelector } from "@/redux/store";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface PostHeaderProps {
  post: {
    id: string;
    author?: {
      id?: string;
      name?: string;
      profilePicture?: string;
    };
    createdAt: string;
    hasReported?: boolean;
  };
  refetch?: () => void;
}

const PostHeader: React.FC<PostHeaderProps> = ({ post, refetch }) => {
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const currentUser = useAppSelector(selectCurrentUser);
  const authorName = post?.author?.name || "Anonymous";
  const authorInitial = authorName.charAt(0)?.toUpperCase() || "?";
  const hasReported = post?.hasReported || false;

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem("user");
        if (userData) {
          const parsedUser = JSON.parse(userData);
          setUserId(parsedUser?.id);
        }
      } catch (error) {
        console.error("Failed to load user data from AsyncStorage:", error);
      }
    };

    loadUserData();
  }, []);

  // Check if the current user is the post author
  const isCurrentUserAuthor =
    (currentUser?.id &&
      post?.author?.id &&
      currentUser.id === post.author.id) ||
    (userId && post?.author?.id && userId === post.author.id);

  const handleReportSuccess = () => {
    if (refetch) {
      refetch();
    }
  };

  return (
    post && (
      <View className="px-5 pt-4 pb-2">
        <View className="flex-row items-center mb-3">
          {post?.author?.profilePicture ? (
            <Image
              source={{ uri: post.author.profilePicture }}
              className="w-12 h-12 rounded-full bg-neutral-200"
            />
          ) : (
            <View className="w-12 h-12 rounded-full bg-primary-100 items-center justify-center">
              <Text className="font-bold text-xl text-primary-600">
                {authorInitial}
              </Text>
            </View>
          )}

          <View className="ml-3 flex-1">
            <Text className="font-bold text-lg text-neutral-800">
              {authorName}
            </Text>
            <Text className="text-sm text-neutral-500">
              {formatDate(post.createdAt)}
            </Text>
          </View>

          {!isCurrentUserAuthor && !hasReported && (
            <TouchableOpacity
              className="flex-row items-center px-3 py-2 bg-warning-50 rounded-full border border-warning-200"
              onPress={() => setReportModalVisible(true)}
            >
              <Ionicons
                name="flag-outline"
                size={14}
                color={COLORS.WARNING[500]}
              />
              <Text className="ml-1.5 text-xs font-medium text-neutral-600">
                Report
              </Text>
            </TouchableOpacity>
          )}

          {/* Show reported badge if the post has been reported */}
          {!isCurrentUserAuthor && hasReported && (
            <View className="flex-row items-center px-3 py-2 bg-warning-100 rounded-full">
              <Ionicons
                name="checkmark-circle"
                size={14}
                color={COLORS.WARNING[500]}
              />
              <Text className="ml-1.5 text-xs font-medium text-neutral-500">
                Reported
              </Text>
            </View>
          )}
        </View>

        <ReportModal
          visible={reportModalVisible}
          onClose={() => setReportModalVisible(false)}
          postId={post.id}
          onSuccess={handleReportSuccess}
        />
      </View>
    )
  );
};

export default PostHeader;
