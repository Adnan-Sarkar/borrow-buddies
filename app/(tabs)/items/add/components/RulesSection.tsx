import React from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../../../../constants/Colors";
import type { Control } from "react-hook-form";
import { Controller } from "react-hook-form";

type RulesSectionProps = {
  control: Control<any>;
  name: string;
  error?: any;
};

const RulesSection: React.FC<RulesSectionProps> = ({
  control,
  name,
  error,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={["Return in the same condition"]}
      render={({
        field: { onChange, value = ["Return in the same condition"] },
      }) => {
        const rules = value;

        const addRule = () => onChange([...rules, ""]);

        const updateRule = (text: string, index: number) => {
          const newRules = [...rules];
          newRules[index] = text;
          onChange(newRules);
        };

        const removeRule = (index: number) => {
          const newRules = [...rules];
          newRules.splice(index, 1);
          onChange(newRules);
        };

        return (
          <View className="mb-6">
            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-neutral-900 font-bold">
                Borrowing Rules
              </Text>
              <TouchableOpacity onPress={addRule}>
                <Text className="text-primary-500 font-medium">Add Rule</Text>
              </TouchableOpacity>
            </View>

            {rules.map((rule: string, index: number) => (
              <View key={index} className="flex-row items-center mb-2">
                <TextInput
                  className="flex-1 border border-neutral-200 rounded-lg p-3 text-neutral-900 mr-2"
                  value={rule}
                  onChangeText={(text) => updateRule(text, index)}
                  placeholder="Enter a rule..."
                  placeholderTextColor={COLORS.NEUTRAL[400]}
                />
                <TouchableOpacity
                  className="w-8 h-8 items-center justify-center"
                  onPress={() => removeRule(index)}
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

export default RulesSection;
