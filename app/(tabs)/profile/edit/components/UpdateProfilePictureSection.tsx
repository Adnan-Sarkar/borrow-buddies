import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../../../../constants/Colors";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import * as ImagePicker from "expo-image-picker";
import {
  createFileObject,
  uploadFormData,
} from "../../../../../utils/formDataUploader";
import { tagTypes } from "../../../../../redux/tag-types";

interface ProfilePictureSectionProps {
  profileData: any;
}

const UpdateProfilePictureSection = ({
  profileData,
}: ProfilePictureSectionProps) => {
  const [profileImage, setProfileImage] = useState<string | null>(
    profileData?.profilePicture || null
  );
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (profileData?.profilePicture) {
      setProfileImage(profileData.profilePicture);
    }
  }, [profileData]);

  const handleUpdateProfilePicture = async () => {
    try {
      setIsUploading(true);
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissionResult.granted) {
        Toast.show({
          type: ALERT_TYPE.WARNING,
          title: "Permission Required",
          textBody: "Please allow access to your photo library",
        });
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        const selectedImage = result.assets[0].uri;
        setProfileImage(selectedImage);

        try {
          // Create FormData
          const formData = new FormData();

          // Extract filename from the URI path
          const uriParts = selectedImage.split("/");
          const filename = uriParts[uriParts.length - 1];
          const fileExtension =
            filename.split(".").pop()?.toLowerCase() || "jpg";

          // Determine correct MIME type
          let mimeType = `image/${fileExtension}`;
          if (fileExtension === "jpg" || fileExtension === "jpeg") {
            mimeType = "image/jpeg";
          } else if (fileExtension === "png") {
            mimeType = "image/png";
          } else if (fileExtension === "gif") {
            mimeType = "image/gif";
          }

          // Create file object using the utility function
          const fileObject = createFileObject(
            selectedImage,
            mimeType,
            `profile-picture.${fileExtension}`
          );

          // Add file to FormData
          formData.append("profilePicture", fileObject as any);

          // Use the new uploadFormData utility
          await uploadFormData("/profile", formData, "PATCH", tagTypes.profile);

          Toast.show({
            type: ALERT_TYPE.SUCCESS,
            title: "Profile Picture Updated",
            textBody: "Your profile picture has been updated",
          });
        } catch (uploadError: any) {
          console.error("Upload error:", uploadError);

          // Show failure toast
          Toast.show({
            type: ALERT_TYPE.DANGER,
            title: "Update Failed",
            textBody: uploadError.message || "Failed to update profile picture",
          });
        }
      }
    } catch (error) {
      console.error("Profile picture update error:", error);
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Update Failed",
        textBody: "Failed to update profile picture",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <View className="px-6 py-3 mb-4">
      <View className="bg-white rounded-xl border border-neutral-100 overflow-hidden">
        <View className="px-4 py-3 bg-neutral-50">
          <Text className="text-base font-semibold text-neutral-700">
            Profile Picture
          </Text>
        </View>
        <View className="p-4">
          <View className="items-center my-4">
            <View className="relative">
              {profileImage ? (
                <Image
                  source={{ uri: profileImage }}
                  className="w-28 h-28 rounded-full border-2 border-white"
                  style={{ backgroundColor: COLORS.NEUTRAL[200] }}
                />
              ) : (
                <View className="w-28 h-28 rounded-full bg-primary-100 items-center justify-center border-2 border-white">
                  <Text className="text-4xl font-bold text-primary-500">
                    {profileData?.name?.charAt(0)?.toUpperCase() || "?"}
                  </Text>
                </View>
              )}
              <TouchableOpacity
                className="absolute bottom-0 right-0 bg-primary-500 rounded-full w-9 h-9 items-center justify-center border-2 border-white"
                onPress={handleUpdateProfilePicture}
              >
                <Ionicons name="camera" size={18} color="white" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              className="mt-4 bg-primary-50 px-4 py-2 rounded-lg"
              onPress={handleUpdateProfilePicture}
            >
              <Text className="text-primary-600 font-medium">Change Photo</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default UpdateProfilePictureSection;
