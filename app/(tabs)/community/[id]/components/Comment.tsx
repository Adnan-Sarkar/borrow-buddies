import { View, Text, Image, Alert } from "react-native";
import { formatDate } from "../../../../../utils/dateUtils";

export interface CommentType {
  id: string;
  content: string;
  createdAt: string;
  authorId: string;
  author?: {
    id?: string;
    name?: string;
    profilePicture?: string;
  };
}

interface CommentProps {
  comment: CommentType;
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
  const authorName = comment?.author?.name;
  const authorInitial = authorName?.charAt(0)?.toUpperCase() || "?";

  const formattedDate = formatDate(comment?.createdAt);

  const handleReport = () => {
    Alert.alert(
      "Report Comment",
      "Are you sure you want to report this comment?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Report",
          onPress: () => {
            Alert.alert(
              "Thank You",
              "Thank you for your report. We will review this comment."
            );
          },
          style: "destructive",
        },
      ]
    );
  };

  return (
    comment && (
      <View className={`mb-4`}>
        <View className="flex-row mb-3">
          {/* Author avatar */}
          {comment?.author?.profilePicture ? (
            <Image
              source={{ uri: comment?.author.profilePicture }}
              className="w-10 h-10 rounded-full mr-3"
            />
          ) : (
            <View className="w-10 h-10 rounded-full bg-primary-100 items-center justify-center mr-3">
              <Text className="font-bold text-lg text-primary-600">
                {authorInitial}
              </Text>
            </View>
          )}

          {/* Comment content */}
          <View className="flex-1">
            <View className="bg-neutral-100 p-3.5 rounded-2xl shadow-sm">
              <Text className="font-semibold text-neutral-800 mb-1.5">
                {authorName}
              </Text>
              <Text className="text-neutral-700 leading-5">
                {comment?.content}
              </Text>
            </View>

            {/* Datetime */}
            <View className="flex-row items-center justify-between mt-2 ml-1">
              <View className="flex-row items-center space-x-4">
                <Text className="text-xs text-neutral-500">
                  {formattedDate}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  );
};

export default Comment;
