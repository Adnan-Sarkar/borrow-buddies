import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  ScrollView,
  Modal,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../../../../constants/Colors";
import { useGetAllCategoriesQuery } from "@/redux/api/categoryApi";
import { useUpdateItemMutation } from "@/redux/api/itemsApi";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import ItemImagesUploader from "../../add/components/ItemImagesUploader";
import BasicInfoSection from "../../add/components/BasicInfoSection";
import PricingSection from "../../add/components/PricingSection";
import FeaturesSection from "../../add/components/FeaturesSection";
import RulesSection from "../../add/components/RulesSection";
import LocationSelector from "../../add/components/LocationSelector";
import { isEqual } from "lodash";

// Validation schema for item
const itemSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  categoryId: z.string().min(1, "Please select a category"),
  dailyPrice: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Daily price must be greater than 0",
    }),
  securityDeposit: z
    .string()
    .refine((val) => val === "" || (!isNaN(Number(val)) && Number(val) >= 0), {
      message: "Security deposit must be a valid number",
    }),
  images: z
    .array(z.string())
    .min(1, "Please add at least one image of your item"),
  location: z.object({
    latitude: z.number(),
    longitude: z.number(),
    location: z.string().min(1, "Please set a pickup location"),
  }),
  features: z.array(z.string()).optional(),
  rules: z.array(z.string()).optional(),
});

type UpdateItemFormData = z.infer<typeof itemSchema>;

type Category = {
  id: string;
  name: string;
  icon?: string;
  itemCount?: number;
  createdAt?: string;
  updatedAt?: string;
};

type UpdateItemDetailsProps = {
  visible: boolean;
  onClose: () => void;
  item: any;
};

export default function UpdateItemDetails({
  visible,
  onClose,
  item,
}: UpdateItemDetailsProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasFormChanged, setHasFormChanged] = useState(false);
  const [originalValues, setOriginalValues] = useState<any>(null);

  // Initialize form with current item values
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    register,
    reset,
    getValues,
  } = useForm<UpdateItemFormData>({
    defaultValues: {
      title: item?.title || "",
      description: item?.description || "",
      categoryId: item?.categoryId || "",
      dailyPrice: item?.dailyPrice?.toString() || "",
      securityDeposit: item?.securityDeposit?.toString() || "",
      images: item?.images || [],
      location: {
        latitude: item?.latitude || 0,
        longitude: item?.longitude || 0,
        location: item?.location || "",
      },
      features: item?.features?.length ? item.features : [""],
      rules: item?.rules?.length
        ? item.rules
        : ["Return in the same condition"],
    },
    resolver: zodResolver(itemSchema),
    mode: "onChange",
  });

  // Store the original values for comparison
  useEffect(() => {
    if (item) {
      const initialValues = {
        title: item.title || "",
        description: item.description || "",
        categoryId: item.categoryId || "",
        dailyPrice: item.dailyPrice?.toString() || "",
        securityDeposit: item.securityDeposit?.toString() || "",
        images: item.images || [],
        location: {
          latitude: item.latitude || 0,
          longitude: item.longitude || 0,
          location: item.location || "",
        },
        features: item.features?.length ? item.features : [""],
        rules: item.rules?.length
          ? item.rules
          : ["Return in the same condition"],
      };
      setOriginalValues(initialValues);
    }
  }, [item]);

  // Register custom fields
  useEffect(() => {
    register("images");
    register("location");
    register("features");
    register("rules");
  }, [register]);

  // Reset form when item changes
  useEffect(() => {
    if (item) {
      reset({
        title: item.title || "",
        description: item.description || "",
        categoryId: item.categoryId || "",
        dailyPrice: item.dailyPrice?.toString() || "",
        securityDeposit: item.securityDeposit?.toString() || "",
        images: item.images || [],
        location: {
          latitude: item.latitude || 0,
          longitude: item.longitude || 0,
          location: item.location || "",
        },
        features: item.features?.length ? item.features : [""],
        rules: item.rules?.length
          ? item.rules
          : ["Return in the same condition"],
      });
    }
  }, [item, reset]);

  // Watch all form values to detect changes
  const formValues = watch();

  // Check if form has changed compared to original values
  useEffect(() => {
    if (originalValues) {
      // Deep compare current values with original
      const currentValues = getValues();

      const normalizedOriginal = {
        ...originalValues,
        features:
          originalValues.features?.filter(
            (feature: string) => feature?.trim() !== ""
          ) || [],
        rules:
          originalValues.rules?.filter((rule: string) => rule?.trim() !== "") ||
          [],
      };

      const normalizedCurrent = {
        ...currentValues,
        features:
          currentValues.features?.filter(
            (feature: string) => feature?.trim() !== ""
          ) || [],
        rules:
          currentValues.rules?.filter((rule: string) => rule?.trim() !== "") ||
          [],
      };

      const hasChanged = !isEqual(normalizedOriginal, normalizedCurrent);
      setHasFormChanged(hasChanged);
    }
  }, [formValues, originalValues, getValues]);

  const selectedCategoryId = watch("categoryId");

  // Fetch categories
  const { data: categoriesData, isLoading } = useGetAllCategoriesQuery(
    { limit: 20 },
    {
      selectFromResult: (result) => ({
        ...result,
        data: result?.data?.data,
      }),
    }
  );

  const [updateItem] = useUpdateItemMutation();

  // Filter categories
  const validCategories = useMemo(() => {
    if (!categoriesData) return [];
    return (categoriesData as Category[]).filter(
      (cat: Category) => cat && cat.id && cat.name
    );
  }, [categoriesData]);

  // Form submission
  const onSubmit = async (data: UpdateItemFormData) => {
    try {
      setIsSubmitting(true);

      const itemData = {
        id: item.id,
        title: data.title,
        description: data.description,
        dailyPrice: parseFloat(data.dailyPrice),
        securityDeposit: parseFloat(data.securityDeposit || "0"),
        categoryId: data.categoryId,
        location: data.location.location,
        latitude: data.location.latitude,
        longitude: data.location.longitude,
        images: data.images.filter((img) => img.trim() !== ""),
        features: (data.features ?? []).filter((f) => f.trim() !== ""),
        rules: (data.rules ?? []).filter((r) => r.trim() !== ""),
      };

      await updateItem(itemData);

      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: "Item Updated",
        textBody: "Your item has been successfully updated",
      });

      onClose();
    } catch (error: any) {
      console.error("Error updating item:", error);
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Failed to Update Item",
        textBody: error?.message || "Could not update item. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1 bg-black/50 justify-end">
          <TouchableWithoutFeedback>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              className="bg-white rounded-t-2xl h-[90%]"
            >
              {/* Header */}
              <View className="flex-row justify-between items-center p-4 border-b border-neutral-200">
                <TouchableOpacity onPress={onClose}>
                  <Ionicons
                    name="close"
                    size={24}
                    color={COLORS.NEUTRAL[500]}
                  />
                </TouchableOpacity>
                <Text className="text-lg font-semibold text-neutral-800">
                  Edit Item
                </Text>
                <TouchableOpacity
                  onPress={handleSubmit(onSubmit)}
                  disabled={isSubmitting || !hasFormChanged}
                >
                  <Text
                    className={`font-semibold ${
                      hasFormChanged ? "text-primary-600" : "text-neutral-400"
                    }`}
                  >
                    {isSubmitting ? "Saving..." : "Save"}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Form */}
              <ScrollView
                className="flex-1 p-5"
                showsVerticalScrollIndicator={false}
              >
                {/* Image Upload */}
                <ItemImagesUploader
                  control={control}
                  name="images"
                  error={errors.images}
                  maxImages={5}
                />

                {/* Basic Info */}
                <BasicInfoSection
                  control={control}
                  errors={errors}
                  categories={validCategories}
                  isLoading={isLoading}
                  selectedCategoryId={selectedCategoryId}
                />

                {/* Pricing */}
                <PricingSection control={control} errors={errors} />

                {/* Features */}
                <FeaturesSection
                  control={control}
                  name="features"
                  error={errors.features}
                />

                {/* Rules */}
                <RulesSection
                  control={control}
                  name="rules"
                  error={errors.rules}
                />

                {/* Location */}
                <LocationSelector
                  control={control}
                  name="location"
                  error={errors.location}
                />

                {/* Bottom padding */}
                <View className="h-10" />
              </ScrollView>

              {/* Submit Button (Fixed at bottom) */}
              <View className="p-4 border-t border-neutral-200">
                <TouchableOpacity
                  className={`h-12 rounded-full items-center justify-center ${
                    !hasFormChanged
                      ? "bg-neutral-300"
                      : isSubmitting
                      ? "bg-primary-300"
                      : "bg-primary-500"
                  }`}
                  onPress={handleSubmit(onSubmit)}
                  disabled={isSubmitting || !hasFormChanged}
                >
                  <Text className="text-white font-bold">
                    {!hasFormChanged
                      ? "No Changes Made"
                      : isSubmitting
                      ? "Updating..."
                      : "Update Item"}
                  </Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
