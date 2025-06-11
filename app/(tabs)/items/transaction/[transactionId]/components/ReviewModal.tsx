import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/Colors";

type ReviewModalProps = {
  visible: boolean;
  onClose: () => void;
  transaction: any;
  itemId: string;
  reviewerId: string;
  recipientId: string;
  onReviewSubmitted: () => void;
};

export default function ReviewModal({
  visible,
  onClose,
  transaction,
  itemId,
  reviewerId,
  recipientId,
  onReviewSubmitted,
}: ReviewModalProps) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Determine if the reviewer is the owner
  const isOwner = reviewerId === transaction?.ownerId;

  const handleSubmitReview = async () => {
    try {
      setIsSubmitting(true);

      // Fake API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      onReviewSubmitted();
      onClose();
    } catch (error) {
      console.error("Failed to submit review:", error);
      Alert.alert("Error", "Failed to submit review. Please try again.", [
        { text: "OK" },
      ]);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/40 justify-end">
        <View className="bg-white rounded-t-2xl p-5">
          <View className="flex-row items-center justify-between mb-5">
            <Text className="text-xl font-semibold text-neutral-800">
              Rate Your Experience
            </Text>
            <TouchableOpacity
              onPress={onClose}
              className="w-8 h-8 rounded-full bg-neutral-100 items-center justify-center"
            >
              <Ionicons name="close" size={18} color={COLORS.NEUTRAL[700]} />
            </TouchableOpacity>
          </View>

          <Text className="text-neutral-600 mb-4">
            How was your experience {isOwner ? "lending" : "borrowing"} this
            item?
          </Text>

          {/* Star Rating */}
          <View className="flex-row justify-center mb-6">
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity
                key={star}
                onPress={() => setRating(star)}
                className="mx-2"
              >
                <Ionicons
                  name={star <= rating ? "star" : "star-outline"}
                  size={32}
                  color={
                    star <= rating ? COLORS.WARNING[500] : COLORS.NEUTRAL[300]
                  }
                />
              </TouchableOpacity>
            ))}
          </View>

          {/* Comment */}
          <View className="mb-5">
            <Text className="text-neutral-800 font-medium mb-2">
              Additional Comments (Optional)
            </Text>
            <TextInput
              value={comment}
              onChangeText={setComment}
              multiline
              className="bg-neutral-50 rounded-lg p-3 min-h-[120px] text-neutral-800"
              placeholder="Share your experience about this transaction..."
              placeholderTextColor={COLORS.NEUTRAL[400]}
            />
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            onPress={handleSubmitReview}
            disabled={isSubmitting}
            className={`bg-primary-600 rounded-lg py-3.5 items-center ${
              isSubmitting ? "opacity-70" : "opacity-100"
            }`}
          >
            {isSubmitting ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text className="text-white font-medium">Submit Review</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
