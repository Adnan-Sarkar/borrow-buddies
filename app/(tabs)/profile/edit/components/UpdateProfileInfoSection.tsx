import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { useForm, type FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import { useUpdateProfileMutation } from "../../../../../redux/api/profileApi";
import CustomInput from "../../../../../components/common/CustomInput";
import CustomTextArea from "../../../../../components/common/CustomTextArea";
import Button from "../../../../../components/common/Button";

// Validation schema
const ProfileInfoSchema = z.object({
  bio: z.string().optional(),
  phoneNumber: z.string().optional(),
});

type ProfileInfoFormData = z.infer<typeof ProfileInfoSchema>;

interface ProfileInfoSectionProps {
  profileData: any;
}

const UpdateProfileInfoSection = ({ profileData }: ProfileInfoSectionProps) => {
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
    watch,
  } = useForm<ProfileInfoFormData>({
    resolver: zodResolver(ProfileInfoSchema),
    defaultValues: {
      bio: "",
      phoneNumber: "",
    },
    mode: "onChange",
  });

  const formValues = watch();
  const initialBio = profileData?.bio || "";
  const initialPhone = profileData?.phoneNumber || "";

  const hasChanges =
    (formValues.bio !== initialBio && formValues.bio?.trim() !== initialBio) ||
    (formValues.phoneNumber !== initialPhone &&
      formValues.phoneNumber?.trim() !== initialPhone);

  useEffect(() => {
    if (profileData) {
      reset({
        bio: profileData.bio || "",
        phoneNumber: profileData.phoneNumber || "",
      });
    }
  }, [profileData, reset]);

  // Handle form submission
  const handleUpdate = async (data: FieldValues) => {
    try {
      const formData = new FormData();

      if (data.bio !== profileData?.bio && data.bio?.trim() !== "") {
        formData.append("bio", data.bio);
      }

      if (
        data.phoneNumber !== profileData?.phoneNumber &&
        data.phoneNumber?.trim() !== ""
      ) {
        formData.append("phoneNumber", data.phoneNumber);
      }

      if (formData.has("bio") || formData.has("phoneNumber")) {
        await updateProfile(formData).unwrap();
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Profile Updated",
          textBody: "Your profile information has been updated",
        });
      }
    } catch (error: any) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Update Failed",
        textBody: error?.data?.message || "Failed to update profile",
      });
    }
  };

  return (
    <View className="px-6 py-3 mb-4">
      <View className="bg-white rounded-xl border border-neutral-100 overflow-hidden">
        <View className="px-4 py-3 bg-primary-50 border-b border-neutral-200">
          <Text className="text-base font-semibold text-primary-700">
            Profile Information
          </Text>
        </View>
        <View className="p-4">
          {/* Phone Number */}
          <CustomInput
            control={control}
            name="phoneNumber"
            label="Phone Number"
            placeholder="Enter your phone number"
            icon="call-outline"
            type="phone"
          />

          {/* Bio */}
          <CustomTextArea
            control={control}
            name="bio"
            label="Bio"
            placeholder="Tell us about yourself..."
          />

          {/* Update Button */}
          <Button
            title="Update Profile Information"
            onPress={handleSubmit(handleUpdate)}
            variant="primary"
            fullWidth
            isLoading={isLoading}
            disabled={!hasChanges || !isDirty}
          />
        </View>
      </View>
    </View>
  );
};

export default UpdateProfileInfoSection;
