import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  ActivityIndicator,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { COLORS } from "@/constants/Colors";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSubmitEvidenceMutation } from "@/redux/api/transactionApi";

// Define Zod schema
const evidenceSchema = z.object({
  images: z.array(z.string()).min(1, "At least one photo is required"),
  notes: z.string().min(10, "Description must be at least 10 characters long"),
});

// Type for the form data
type EvidenceFormData = z.infer<typeof evidenceSchema>;

type AddEvidenceModalProps = {
  visible: boolean;
  onClose: () => void;
  transactionId: string;
  evidenceType: "PICKUP" | "HANDOVER" | "RETURN" | "DAMAGE";
  onSuccess?: () => void;
};

export default function AddEvidenceModal({
  visible,
  onClose,
  transactionId,
  evidenceType,
  onSuccess,
}: AddEvidenceModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [addEvidence] = useSubmitEvidenceMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<EvidenceFormData>({
    resolver: zodResolver(evidenceSchema),
    defaultValues: {
      images: [],
      notes: "",
    },
  });

  const selectedImages = watch("images");

  const getTypeInfo = () => {
    switch (evidenceType) {
      case "PICKUP":
        return {
          title: "Add Evidence",
          description: "Document the condition of the item",
          icon: "document-text-outline",
          color: COLORS.PRIMARY[600],
          bgColor: COLORS.PRIMARY[50],
        };
      case "HANDOVER":
        return {
          title: "Handover Documentation",
          description: "Document the condition of the item at handover",
          icon: "camera-outline",
          color: COLORS.PRIMARY[600],
          bgColor: COLORS.PRIMARY[50],
        };
      case "RETURN":
        return {
          title: "Return Documentation",
          description: "Document the condition of the item at return",
          icon: "log-out-outline",
          color: COLORS.SUCCESS[600],
          bgColor: COLORS.SUCCESS[50],
        };
      case "DAMAGE":
        return {
          title: "Damage Report",
          description: "Document any damage to the item",
          icon: "alert-circle-outline",
          color: COLORS.ERROR[600],
          bgColor: COLORS.ERROR[50],
        };
    }
  };

  const typeInfo = getTypeInfo();

  const pickImages = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        alert("We need camera roll permissions to add photos");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        allowsMultipleSelection: true,
        quality: 0.8,
        selectionLimit: 5 - selectedImages.length,
      });

      if (!result.canceled && result.assets.length > 0) {
        if (selectedImages.length + result.assets.length > 5) {
          alert("You can only select up to 5 images");
          return;
        }

        setValue(
          "images",
          [...selectedImages, ...result.assets.map((asset) => asset.uri)],
          { shouldValidate: true }
        );
      }
    } catch (error) {
      console.error("Error picking images:", error);
      alert("Failed to pick images. Please try again.");
    }
  };

  const takePicture = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();

      if (status !== "granted") {
        alert("We need camera permissions to take photos");
        return;
      }

      if (selectedImages.length >= 5) {
        alert("You can only select up to 5 images");
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.8,
      });

      if (!result.canceled && result.assets.length > 0) {
        setValue("images", [...selectedImages, result.assets[0].uri], {
          shouldValidate: true,
        });
      }
    } catch (error) {
      console.error("Error taking picture:", error);
      alert("Failed to take picture. Please try again.");
    }
  };

  const onSubmit = async (data: EvidenceFormData) => {
    try {
      setIsSubmitting(true);

      const formData = new FormData();

      if (data.notes) {
        formData.append("notes", data.notes);
      }

      formData.append("type", evidenceType);

      // Append each image with proper metadata
      if (data.images && data.images.length > 0) {
        data.images.forEach((imageUri, index) => {
          const imageUriParts = imageUri.split(".");
          const fileType = imageUriParts[imageUriParts.length - 1];

          formData.append("images", {
            uri: imageUri,
            name: `evidence_${index}.${fileType}`,
            type: `image/${fileType}`,
          } as any);
        });
      }

      const res = await addEvidence({
        id: transactionId,
        evidence: formData,
      });

      if (res) {
        onSuccess?.();
      }
    } catch (error) {
      console.error("Failed to add evidence:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    reset({ images: [], notes: "" });
  };

  const removeImage = (index: number) => {
    setValue(
      "images",
      selectedImages.filter((_, i) => i !== index),
      { shouldValidate: true }
    );
  };

  const handleModalClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={handleModalClose}
      statusBarTranslucent={true}
    >
      <SafeAreaView className="flex-1 bg-black/50 justify-end">
        <StatusBar barStyle="light-content" backgroundColor="transparent" />

        <View className="bg-white rounded-t-2xl overflow-hidden">
          {/* Header */}
          <View
            className="px-4 py-3 border-b border-neutral-100 flex-row items-center"
            style={{ backgroundColor: typeInfo.bgColor }}
          >
            <TouchableOpacity
              onPress={handleModalClose}
              className="w-9 h-9 rounded-full bg-white/20 items-center justify-center"
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons name="close" size={20} color={typeInfo.color} />
            </TouchableOpacity>

            <View className="flex-1 items-center">
              <Text
                className="font-bold text-base"
                style={{ color: typeInfo.color }}
              >
                {typeInfo.title}
              </Text>
            </View>

            <View className="w-9 h-9" />
          </View>

          {/* Description */}
          <View className="px-4 py-3 bg-neutral-50 border-b border-neutral-100 flex-row items-center">
            <Ionicons
              name={typeInfo.icon as any}
              size={16}
              color={typeInfo.color}
            />
            <Text className="text-neutral-600 text-sm ml-2">
              {typeInfo.description}
            </Text>
          </View>

          <ScrollView className="max-h-[450px]">
            {/* Images Section */}
            <View className="p-4 border-b border-neutral-100">
              <View className="flex-row items-center justify-between mb-2">
                <Text className="text-neutral-800 font-semibold">Photos</Text>
                <Text className="text-neutral-500 text-xs">
                  {selectedImages.length}/5 photos
                </Text>
              </View>

              {/* Image validation error */}
              {errors.images && (
                <Text className="text-error-600 text-xs mb-2">
                  {errors.images.message}
                </Text>
              )}

              {/* Image Grid */}
              <View className="flex-row flex-wrap">
                {selectedImages.map((uri, index) => (
                  <View key={index} className="relative mr-2 mb-2">
                    <Image
                      source={{ uri }}
                      className="w-[72px] h-[72px] rounded-lg"
                      resizeMode="cover"
                    />
                    <TouchableOpacity
                      onPress={() => removeImage(index)}
                      className="absolute -top-1 -right-1 bg-error-500 rounded-full w-5 h-5 items-center justify-center"
                    >
                      <Ionicons name="close" size={12} color="white" />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>

              {/* Camera Buttons */}
              {selectedImages.length < 5 && (
                <View className="flex-row mt-2">
                  <TouchableOpacity
                    onPress={takePicture}
                    className="flex-1 mr-2 bg-primary-50 rounded-lg py-3 flex-row items-center justify-center"
                  >
                    <Ionicons
                      name="camera-outline"
                      size={18}
                      color={COLORS.PRIMARY[600]}
                    />
                    <Text className="text-primary-600 font-medium ml-2">
                      Take Photo
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={pickImages}
                    className="flex-1 bg-neutral-100 rounded-lg py-3 flex-row items-center justify-center"
                  >
                    <Ionicons
                      name="images-outline"
                      size={18}
                      color={COLORS.NEUTRAL[700]}
                    />
                    <Text className="text-neutral-700 font-medium ml-2">
                      Gallery
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            {/* Notes Section */}
            <View className="p-4">
              <Text className="text-neutral-800 font-semibold mb-2">Notes</Text>

              <Controller
                control={control}
                name="notes"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    multiline
                    className={`bg-neutral-50 rounded-lg p-3 min-h-[100px] text-neutral-800 ${
                      errors.notes ? "border border-error-500" : ""
                    }`}
                    placeholder="Describe the condition of the item..."
                    placeholderTextColor={COLORS.NEUTRAL[400]}
                    style={{ textAlignVertical: "top" }}
                  />
                )}
              />

              {/* Description validation error */}
              {errors.notes && (
                <Text className="text-error-600 text-xs mt-1">
                  {errors.notes.message}
                </Text>
              )}
            </View>
          </ScrollView>

          {/* Action Buttons */}
          <View className="w-full p-4 pt-3 border-t border-neutral-100 flex-row gap-3">
            {/* Cancel Button */}
            {!isSubmitting && (
              <TouchableOpacity
                onPress={handleModalClose}
                className="flex-1 rounded-lg py-3 border border-neutral-200 flex-row items-center justify-center"
              >
                <Ionicons
                  name="close-circle-outline"
                  size={18}
                  color={COLORS.NEUTRAL[600]}
                />
                <Text className="text-neutral-700 font-medium ml-2">
                  Cancel
                </Text>
              </TouchableOpacity>
            )}

            {/* Submit Button */}
            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              disabled={isSubmitting}
              className={`flex-1 rounded-lg py-3.5 flex-row items-center justify-center ${
                isSubmitting ? "bg-primary-300" : "bg-primary-600"
              }`}
            >
              {isSubmitting ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <>
                  <Ionicons
                    name={
                      evidenceType === "HANDOVER"
                        ? "checkmark-circle"
                        : "cloud-upload-outline"
                    }
                    size={18}
                    color="white"
                  />
                  <Text className="text-white font-semibold ml-2">
                    {evidenceType === "HANDOVER"
                      ? "Confirm Handover"
                      : "Submit Evidence"}
                  </Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}
