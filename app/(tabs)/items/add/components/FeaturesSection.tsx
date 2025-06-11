import React from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../../../../constants/Colors";
import type { Control } from "react-hook-form";
import { Controller } from "react-hook-form";

type FeaturesSectionProps = {
  control: Control<any>;
  name: string;
  error?: any;
};

const FeaturesSection: React.FC<FeaturesSectionProps> = ({
  control,
  name,
  error,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={[""]}
      render={({ field: { onChange, value = [""] } }) => {
        const features = value;

        const addFeature = () => onChange([...features, ""]);

        const updateFeature = (text: string, index: number) => {
          const newFeatures = [...features];
          newFeatures[index] = text;
          onChange(newFeatures);
        };

        const removeFeature = (index: number) => {
          const newFeatures = [...features];
          newFeatures.splice(index, 1);
          onChange(newFeatures);
        };

        return (
          <View className="mb-6">
            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-neutral-900 font-bold">Features</Text>
              <TouchableOpacity onPress={addFeature}>
                <Text className="text-primary-500 font-medium">
                  Add Feature
                </Text>
              </TouchableOpacity>
            </View>

            {features.map((feature: string, index: number) => (
              <View key={index} className="flex-row items-center mb-2">
                <TextInput
                  className="flex-1 border border-neutral-200 rounded-lg p-3 text-neutral-900 mr-2"
                  value={feature}
                  onChangeText={(text) => updateFeature(text, index)}
                  placeholder="Enter a feature..."
                  placeholderTextColor={COLORS.NEUTRAL[400]}
                />
                <TouchableOpacity
                  className="w-8 h-8 items-center justify-center"
                  onPress={() => removeFeature(index)}
                >
                  <Ionicons
                    name="trash-outline"
                    size={18}
                    color={COLORS.NEUTRAL[500]}
                  />
                </TouchableOpacity>
              </View>
            ))}

            {error && (
              <Text className="text-red-500 text-xs mt-1">{error.message}</Text>
            )}
          </View>
        );
      }}
    />
  );
};

export default FeaturesSection;
