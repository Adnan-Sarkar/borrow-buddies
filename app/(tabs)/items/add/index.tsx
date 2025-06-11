import React, { useEffect, useMemo, useState } from "react";
import { View, ScrollView } from "react-native";
import { useRouter, Stack } from "expo-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useGetAllCategoriesQuery } from "@/redux/api/categoryApi";
import FormHeader from "./components/FormHeader";
import ItemImagesUploader from "./components/ItemImagesUploader";
import BasicInfoSection from "./components/BasicInfoSection";
import PricingSection from "./components/PricingSection";
import FeaturesSection from "./components/FeaturesSection";
import RulesSection from "./components/RulesSection";
import LocationSelector from "./components/LocationSelector";
import SubmitButton from "./components/SubmitButton";
import { useCretaeItemMutation } from "@/redux/api/itemsApi";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";

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

type AddItemFormData = z.infer<typeof itemSchema>;

type Category = {
  id: string;
  name: string;
  icon?: string;
  itemCount?: number;
  createdAt?: string;
  updatedAt?: string;
};

export default function AddItemScreen() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    register,
  } = useForm<AddItemFormData>({
    defaultValues: {
      title: "",
      description: "",
      categoryId: "",
      dailyPrice: "",
      securityDeposit: "",
      images: [],
      location: {
        latitude: 0,
        longitude: 0,
        location: "",
      },
      features: [""],
      rules: ["Return in the same condition"],
    },
    resolver: zodResolver(itemSchema),
    mode: "onChange",
  });

  // Register custom fields
  useEffect(() => {
    register("images");
    register("location");
    register("features");
    register("rules");
  }, [register]);

  // Watch for our values
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
  const [createItem] = useCretaeItemMutation();

  // Filter categories
  const validCategories = useMemo(() => {
    if (!categoriesData) return [];
    return (categoriesData as Category[]).filter(
      (cat: Category) => cat && cat.id && cat.name
    );
  }, [categoriesData]);

  // Form submission
  const onSubmit = async (data: AddItemFormData) => {
    try {
      setIsSubmitting(true);

      const itemData = {
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

      await createItem(itemData);

      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: "Item Created",
        textBody: "Your item has been successfully created",
      });

      router.push("/(tabs)/items");
    } catch (error: any) {
      console.error("Error creating item:", error);
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Failed to Create Item",
        textBody: error?.message || "Could not create item. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header */}
      <FormHeader onSave={handleSubmit(onSubmit)} />

      <ScrollView className="flex-1 p-5" showsVerticalScrollIndicator={false}>
        {/* Item Image */}
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
        <RulesSection control={control} name="rules" error={errors.rules} />

        {/* Location */}
        <LocationSelector
          control={control}
          name="location"
          error={errors.location}
        />

        {/* Submit Button */}
        <SubmitButton
          onPress={handleSubmit(onSubmit)}
          isSubmitting={isSubmitting}
        />
      </ScrollView>
    </View>
  );
}
