import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import Button from "../../../../components/common/Button";
import CustomInput from "../../../../components/common/CustomInput";
import CustomTextArea from "../../../../components/common/CustomTextArea";
import ImageUploader from "../../../../components/common/ImageUploader";
import PageHeader from "../components/PageHeader";
import { COLORS } from "../../../../constants/Colors";
import { createPost } from "../../../../redux/services/communityFormServices";

// Create post Validation schema
const createPostValidationSchema = z.object({
  title: z
    .string({
      required_error: "Post title is required",
      invalid_type_error: "Post title must be a string",
    })
    .min(5, "Title must be at least 5 characters long"),
  content: z
    .string({
      required_error: "Post content is required",
      invalid_type_error: "Post content must be a string",
    })
    .min(10, "Content must be at least 10 characters long"),
  images: z.array(z.string()).optional(),
});

type CreatePostFormData = z.infer<typeof createPostValidationSchema>;

const CreateCommunityPost = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePostFormData>({
    resolver: zodResolver(createPostValidationSchema),
    defaultValues: {
      title: "",
      content: "",
      images: [],
    },
  });

  const handleCreatePost = async (data: CreatePostFormData) => {
    try {
      setIsSubmitting(true);

      const imageDataArray =
        data.images && data.images.length > 0
          ? data.images.map((uri) => {
              const fileName =
                uri.split("/").pop() || `image-${Date.now()}.jpg`;

              const fileType = fileName.split(".").pop()?.toLowerCase();

              return {
                uri,
                type: `image/${fileType || "jpeg"}`,
                name: fileName,
              };
            })
          : [];

      await createPost({
        title: data.title,
        content: data.content,
        images: imageDataArray,
      });

      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: "Post Created",
        textBody: "Your post has been successfully published!",
      });

      router.push("/community");
    } catch (error: any) {
      console.error("Post creation error:", error);
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Failed to Create Post",
        textBody: error?.message || "Could not create post. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <PageHeader title="Create Post" showBackButton />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="px-5 pt-4">
            {/* Info card */}
            <View className="bg-primary-50 rounded-xl p-4 mb-6 flex-row items-center">
              <View className="bg-primary-100 rounded-full p-2 mr-3">
                <Ionicons
                  name="information-circle"
                  size={20}
                  color={COLORS.PRIMARY[500]}
                />
              </View>
              <Text className="text-neutral-700 flex-1">
                Share your thoughts, questions, or resources with the community!
              </Text>
            </View>

            {/* Form */}
            <View className="mb-6">
              <CustomInput
                control={control}
                name="title"
                label="Title"
                placeholder="Give your post title"
                icon="create-outline"
                error={errors.title}
                disabled={isSubmitting}
              />
            </View>

            <View className="mb-6">
              <CustomTextArea
                control={control}
                name="content"
                label="Content"
                placeholder="Share your thoughts, experiences, or ask a question..."
                numberOfLines={8}
                error={errors.content}
                disabled={isSubmitting}
              />
            </View>

            {/* Image Uploader */}
            <View className="mb-8">
              <ImageUploader
                control={control}
                name="images"
                label="Add Images (Optional)"
                error={
                  Array.isArray(errors.images)
                    ? errors.images[0]
                    : errors.images
                }
                maxImages={5}
                disabled={isSubmitting}
                placeholder="Add images"
              />
            </View>

            {/* Submit Button */}
            <Button
              title="Publish Post"
              onPress={handleSubmit(handleCreatePost)}
              variant="primary"
              fullWidth
              isLoading={isSubmitting}
            />

            {/* Cancel Button */}
            <TouchableOpacity
              className="mt-4 items-center justify-center py-3"
              onPress={() => router.back()}
              disabled={isSubmitting}
            >
              <Text className="text-neutral-500 font-medium">Cancel</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CreateCommunityPost;
