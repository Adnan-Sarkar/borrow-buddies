import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { COLORS } from "../../../../../constants/Colors";
import { Controller } from "react-hook-form";
import type { Control } from "react-hook-form";

type ItemImagesUploaderProps = {
  control: Control<any>;
  name: string;
  error?: any;
  maxImages?: number;
};

const ItemImagesUploader: React.FC<ItemImagesUploaderProps> = ({
  control,
  name,
  error,
  maxImages = 5,
}) => {
  const [loading, setLoading] = useState(false);
  const screenWidth = Dimensions.get("window").width;
  const imageSize = 80;

  const pickImage = async (
    currentImages: string[],
    onChange: (value: string[]) => void
  ) => {
    setLoading(true);
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        onChange([...currentImages, result.assets[0].uri]);
      }
    } catch (error) {
      console.error("Error picking image:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeImage = (
    index: number,
    images: string[],
    onChange: (value: string[]) => void
  ) => {
    onChange(images.filter((_, i) => i !== index));
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value = [] } }) => {
        // Get current validation state
        const isValid = !error;
        const images = value || [];

        const mainUploadButtonStyle: any = {
          width: screenWidth - 40,
          height: 160,
          borderRadius: 12,
          borderWidth: 2,
          borderColor: !isValid ? COLORS.ERROR[100] : COLORS.PRIMARY[100],
          borderStyle: "dashed",
          backgroundColor: !isValid ? COLORS.ERROR[50] : COLORS.PRIMARY[50],
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 10,
        };

        return (
          <View className="mb-6">
            {/* Header */}
            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-neutral-900 font-bold">Item Photos</Text>
              <Text className="text-neutral-500 text-xs">
                {images.length}/{maxImages}
              </Text>
            </View>

            {images.length === 0 ? (
              <TouchableOpacity
                style={mainUploadButtonStyle}
                onPress={() => pickImage(images, onChange)}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color={COLORS.PRIMARY[500]} size="small" />
                ) : (
                  <>
                    <Ionicons
                      name="camera-outline"
                      size={28}
                      color={!isValid ? COLORS.ERROR[500] : COLORS.PRIMARY[500]}
                    />
                    <Text
                      className={`${
                        !isValid ? "text-red-500" : "text-primary-500"
                      } font-medium mt-2`}
                    >
                      Add Item Photos
                    </Text>
                    <Text
                      className={`${
                        !isValid ? "text-red-500" : "text-neutral-500"
                      } text-xs mt-1 text-center`}
                    >
                      High-quality photos help your item get noticed
                    </Text>
                  </>
                )}
              </TouchableOpacity>
            ) : (
              <>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ paddingRight: 12 }}
                  className="mb-2"
                >
                  {/* Existing images */}
                  {images.map((image: string, index: number) => (
                    <View key={index} className="mr-3">
                      <View
                        style={[
                          styles.imageContainer,
                          { width: imageSize, height: imageSize },
                        ]}
                      >
                        <Image
                          source={{ uri: image }}
                          style={styles.image}
                          resizeMode="cover"
                        />
                        <TouchableOpacity
                          style={styles.removeButton}
                          onPress={() => removeImage(index, images, onChange)}
                        >
                          <Ionicons name="close" size={12} color="white" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))}

                  {/* Add photo button */}
                  {images.length < maxImages && (
                    <TouchableOpacity
                      style={[
                        styles.addButton,
                        { width: imageSize, height: imageSize },
                      ]}
                      onPress={() => pickImage(images, onChange)}
                      disabled={loading}
                    >
                      {loading ? (
                        <ActivityIndicator
                          color={COLORS.PRIMARY[500]}
                          size="small"
                        />
                      ) : (
                        <>
                          <Ionicons
                            name="add"
                            size={24}
                            color={COLORS.NEUTRAL[500]}
                          />
                          <Text className="text-neutral-500 text-xs mt-1 text-center">
                            Add Photo
                          </Text>
                        </>
                      )}
                    </TouchableOpacity>
                  )}
                </ScrollView>

                {/* Caption when images exist */}
                <Text className="text-neutral-500 text-xs">
                  {`${images.length} ${
                    images.length > 1 ? "photos" : "photo"
                  }  added - ${maxImages - images.length} more allowed`}
                </Text>
              </>
            )}

            {/* Error message */}
            {error && (
              <Text className="text-red-500 text-xs mt-1">{error.message}</Text>
            )}
          </View>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    borderRadius: 8,
    overflow: "hidden",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  addButton: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.NEUTRAL[300],
    borderStyle: "dashed",
    backgroundColor: COLORS.NEUTRAL[100],
    justifyContent: "center",
    alignItems: "center",
  },
  removeButton: {
    position: "absolute",
    top: 4,
    right: 4,
    backgroundColor: "rgba(0,0,0,0.6)",
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ItemImagesUploader;
