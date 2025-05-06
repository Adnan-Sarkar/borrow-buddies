import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Controller } from "react-hook-form";
import {
  COLORS,
  PRIMARY_COLOR,
  NEUTRAL_COLOR,
  ERROR_COLOR,
} from "../../constants/Colors";

interface CustomTextAreaProps {
  label: string;
  placeholder: string;
  name: string;
  control: any;
  numberOfLines?: number;
  className?: string;
  error?: any;
}

const CustomTextArea = ({
  label,
  placeholder,
  name,
  control,
  numberOfLines = 4,
  className = "",
  error: propError,
}: CustomTextAreaProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className="mb-4">
      <Text className="text-neutral-600 font-medium ml-1 mb-2">{label}</Text>
      <Controller
        control={control}
        name={name}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error: fieldError },
        }) => {
          const error = propError || fieldError;

          return (
            <>
              <View
                className={`flex-row items-start bg-neutral-50 border rounded-xl px-4 py-3
                  ${isFocused ? "border-primary-500" : "border-neutral-200"}
                  ${error ? "border-red-500" : ""}
                  ${className}`}
              >
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  onBlur={() => {
                    setIsFocused(false);
                    onBlur();
                  }}
                  onFocus={() => setIsFocused(true)}
                  placeholder={placeholder}
                  multiline
                  numberOfLines={numberOfLines}
                  className={`flex-1 text-neutral-800 text-base`}
                  style={styles.input}
                  placeholderTextColor={COLORS.NEUTRAL[400]}
                />
              </View>
              {error && (
                <Text
                  style={{ color: ERROR_COLOR }}
                  className="text-xs ml-1 mt-1"
                >
                  {error.message}
                </Text>
              )}
            </>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    textAlignVertical: "top",
    minHeight: 100,
  },
});

export default CustomTextArea;
