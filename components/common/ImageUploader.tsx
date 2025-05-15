import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
  type FieldError,
} from "react-hook-form";
import * as ImagePicker from "expo-image-picker";
import { COLORS, ERROR_COLOR } from "../../constants/Colors";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";

interface ImageUploaderProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  control: Control<T>;
  error?: FieldError;
  maxImages?: number;
  disabled?: boolean;
  placeholder?: string;
}

function ImageUploader<T extends FieldValues>({
  label,
  name,
  control,
  error,
  maxImages = 5,
  disabled = false,
  placeholder = "Add images",
}: ImageUploaderProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, value },
        fieldState: { error: fieldError },
      }) => {
        const images = value || [];
        const inputError = error || fieldError;

        const pickImage = async () => {
          if (images.length >= maxImages) {
            Toast.show({
              type: ALERT_TYPE.WARNING,
              title: "Maximum images reached",
              textBody: `You can only upload up to ${maxImages} images`,
            });
            return;
          }

          const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.8,
          });

          if (!result.canceled && result.assets && result.assets.length > 0) {
            const newImage = result.assets[0].uri;
            const updatedImages = [...images, newImage];
            onChange(updatedImages);
          }
        };

        const removeImage = (index: number) => {
          const updatedImages = images.filter((_, i) => i !== index);
          onChange(updatedImages);
        };

        return (
          <View className="mb-4">
            <Text className="text-neutral-600 font-medium ml-1 mb-2">
              {label}
            </Text>

            {/* Images preview */}
            {images.length > 0 && (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="mb-4"
              >
                {images.map((uri: string, index: number) => (
                  <View key={index} className="mr-3 relative">
                    <Image source={{ uri }} className="w-24 h-24 rounded-lg" />
                    <TouchableOpacity
                      className="absolute top-1 right-1 bg-neutral-800/70 rounded-full p-1"
                      onPress={() => removeImage(index)}
                      disabled={disabled}
                    >
                      <Ionicons name="close" size={16} color="white" />
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>
            )}

            <TouchableOpacity
              className="border-2 border-dashed border-neutral-300 rounded-xl h-20 items-center justify-center bg-neutral-50"
              onPress={pickImage}
              disabled={disabled}
            >
              <Ionicons
                name="image-outline"
                size={24}
                color={COLORS.NEUTRAL[400]}
              />
              <Text className="text-neutral-500 mt-1">
                {images.length === 0
                  ? `${placeholder} (up to ${maxImages})`
                  : `${images.length}/${maxImages} images added`}
              </Text>
            </TouchableOpacity>

            {inputError && (
              <Text
                style={{ color: ERROR_COLOR }}
                className="text-xs ml-1 mt-1"
              >
                {inputError.message}
              </Text>
            )}
          </View>
        );
      }}
    />
  );
}

export default ImageUploader;
