import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../../../../constants/Colors";
import { useCreatePostCommentMutation } from "../../../../../redux/api/communityApi";

interface CommentInputProps {
  postId: string;
}

const CommentInput: React.FC<CommentInputProps> = ({ postId }) => {
  const [comment, setComment] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [createComment, { isLoading }] = useCreatePostCommentMutation();

  const handleSubmit = async () => {
    if (!comment?.trim() || isLoading) return;

    try {
      await createComment({
        postId,
        content: comment.trim(),
      }).unwrap();

      setComment("");
      Keyboard.dismiss();
    } catch (error) {
      console.error("Failed to submit comment:", error);
    }
  };

  return (
    <View
      className={`flex-row items-center bg-neutral-50 border rounded-xl px-4 py-2
        ${isFocused ? "border-primary-500" : "border-neutral-200"}
      `}
    >
      <TextInput
        className="flex-1 ml-1 text-neutral-800 min-h-[36px]"
        placeholder="Write a comment..."
        placeholderTextColor={COLORS.NEUTRAL[400]}
        value={comment}
        onChangeText={setComment}
        multiline
        maxLength={500}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />

      <TouchableOpacity
        className={`ml-2 ${!comment.trim() || isLoading ? "opacity-50" : ""}`}
        onPress={handleSubmit}
        disabled={!comment.trim() || isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color={COLORS.PRIMARY[500]} />
        ) : (
          <Ionicons
            name="send"
            size={20}
            color={isFocused ? COLORS.PRIMARY[500] : COLORS.NEUTRAL[500]}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default CommentInput;
