import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import type { Control } from "react-hook-form";
import { Controller } from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../../../../constants/Colors";
import CustomInput from "../../../../../components/common/CustomInput";
import CustomTextArea from "../../../../../components/common/CustomTextArea";

type Category = {
  id: string;
  name: string;
  icon?: string;
};

type BasicInfoSectionProps = {
  control: Control<any>;
  errors: any;
  categories: Category[];
  isLoading: boolean;
  selectedCategoryId: string;
};

const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({
  control,
  errors,
  categories,
  isLoading,
  selectedCategoryId,
}) => {
  const renderCategoryIcon = (
    iconName?: string,
    isSelected: boolean = false,
    hasError: boolean = false
  ) => {
    let iconColor = isSelected
      ? "white"
      : hasError
      ? COLORS.ERROR[500]
      : COLORS.NEUTRAL[600];

    const iconSize = 16;
    const cleanIconName = iconName?.trim();

    try {
      return (
        <Ionicons
          name={(cleanIconName || "grid-outline") as any}
          size={iconSize}
          color={iconColor}
        />
      );
    } catch (error) {
      return <Ionicons name="grid-outline" size={iconSize} color={iconColor} />;
    }
  };

  const hasCategoryError = !!errors.categoryId;

  return (
    <View className="mb-2">
      <CustomInput
        label="Item Name"
        placeholder="Name of your item"
        name="title"
        control={control}
        error={errors.title}
        showIcon={false}
      />

      {/* Category Selector */}
      <View className="mb-4">
        <Text className={`font-medium ml-1 mb-2 "text-neutral-600`}>
          Category
        </Text>

        <View>
          {isLoading ? (
            <Text className="text-neutral-500">Loading categories...</Text>
          ) : (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingRight: 20 }}
            >
              {categories.map((item) => (
                <Controller
                  key={item.id}
                  control={control}
                  name="categoryId"
                  rules={{ required: "Please select a category" }}
                  render={({ field: { onChange } }) => {
                    const isSelected = selectedCategoryId === item.id;
                    const showErrorStyle = hasCategoryError && !isSelected;

                    return (
                      <TouchableOpacity
                        onPress={() => onChange(item.id)}
                        className={`mr-2 px-4 py-2 rounded-full flex-row items-center gap-1 ${
                          isSelected
                            ? "bg-primary-500"
                            : showErrorStyle
                            ? "bg-red-50 border border-red-200"
                            : "bg-neutral-100"
                        }`}
                      >
                        {renderCategoryIcon(
                          item.icon,
                          isSelected,
                          hasCategoryError
                        )}
                        <Text
                          className={`ml-1 font-medium ${
                            isSelected
                              ? "text-white"
                              : showErrorStyle
                              ? "text-red-500"
                              : "text-neutral-700"
                          }`}
                        >
                          {item.name}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                />
              ))}
            </ScrollView>
          )}
          {errors.categoryId && (
            <Text className="text-red-500 text-xs mt-2 ml-1">
              {errors.categoryId.message}
            </Text>
          )}
        </View>
      </View>

      <CustomTextArea
        label="Description"
        placeholder="Describe your item in detail..."
        name="description"
        control={control}
        error={errors.description}
        numberOfLines={4}
      />
    </View>
  );
};

export default BasicInfoSection;
