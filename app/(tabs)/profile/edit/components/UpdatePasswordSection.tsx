import React from "react";
import { View, Text } from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import { useUpdateProfileMutation } from "../../../../../redux/api/profileApi";
import CustomInput from "../../../../../components/common/CustomInput";
import Button from "../../../../../components/common/Button";

// Change password validation schema
const PasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "New password must be different from current password",
    path: ["newPassword"],
  });

type PasswordFormData = z.infer<typeof PasswordSchema>;

const UpdatePasswordSection = () => {
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
    watch,
  } = useForm<PasswordFormData>({
    resolver: zodResolver(PasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const fields = watch();
  const isFormEmpty =
    !fields.currentPassword && !fields.newPassword && !fields.confirmPassword;

  const handleUpdate = async (data: PasswordFormData) => {
    try {
      const passwordData = {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      };

      await updateProfile(passwordData).unwrap();
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: "Password Updated",
        textBody: "Your password has been changed",
      });
      reset();
    } catch (error: any) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Update Failed",
        textBody: error?.data?.message || "Failed to update password",
      });
    }
  };

  return (
    <View className="px-6 py-3 mb-4">
      <View className="bg-white rounded-xl border border-neutral-100 overflow-hidden">
        <View className="px-4 py-3 bg-primary-50 border-b border-neutral-200">
          <Text className="text-base font-semibold text-primary-700">
            Change Password
          </Text>
        </View>
        <View className="p-4">
          {/* Current Password */}
          <CustomInput
            control={control}
            name="currentPassword"
            label="Current Password"
            placeholder="Enter current password"
            icon="lock-closed-outline"
            type="password"
            error={errors.currentPassword}
          />

          {/* New Password */}
          <CustomInput
            control={control}
            name="newPassword"
            label="New Password"
            placeholder="Enter new password"
            icon="key-outline"
            type="password"
            error={errors.newPassword}
          />

          {/* Confirm Password */}
          <CustomInput
            control={control}
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Confirm new password"
            icon="checkmark-circle-outline"
            type="password"
            error={errors.confirmPassword}
          />

          {/* Update Button */}
          <Button
            title="Update Password"
            onPress={handleSubmit(handleUpdate)}
            variant="primary"
            fullWidth
            isLoading={isLoading}
            disabled={isFormEmpty || !isDirty || !isValid}
          />
        </View>
      </View>
    </View>
  );
};

export default UpdatePasswordSection;
