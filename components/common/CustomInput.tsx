import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  COLORS,
  PRIMARY_COLOR,
  NEUTRAL_COLOR,
  ERROR_COLOR,
} from "../../constants/Colors";
import {
  Controller,
  type Control,
  type FieldValues,
  type FieldError,
  type Path,
} from "react-hook-form";

interface CustomInputProps<T extends FieldValues> {
  label: string;
  placeholder?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  type?: "email" | "password" | "text" | "phone" | "number";
  name: Path<T>;
  control: Control<T>;
  error?: FieldError;
  disabled?: boolean;
}

function CustomInput<T extends FieldValues>({
  label,
  placeholder = "",
  icon,
  type = "text",
  name,
  control,
  error,
  disabled = false,
}: CustomInputProps<T>) {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const getIconName = (): keyof typeof Ionicons.glyphMap => {
    if (icon) return icon;

    switch (type) {
      case "email":
        return "mail-outline";
      case "password":
        return "lock-closed-outline";
      case "phone":
        return "call-outline";
      case "number":
        return "calculator-outline";
      default:
        return "create-outline";
    }
  };

  const getKeyboardType = () => {
    switch (type) {
      case "email":
        return "email-address";
      case "phone":
        return "phone-pad";
      case "number":
        return "numeric";
      default:
        return "default";
    }
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error: fieldError },
      }) => {
        const inputError = error || fieldError;

        return (
          <View className="flex flex-col gap-2 mb-4">
            <Text className="text-neutral-600 font-medium ml-1">{label}</Text>
            <View
              className={`flex-row items-center bg-neutral-50 border rounded-xl px-4 py-3
                ${isFocused ? "border-primary-500" : "border-neutral-200"}
                ${inputError ? "border-red-500" : ""}
              `}
            >
              <Ionicons
                name={getIconName()}
                size={20}
                color={
                  isFocused
                    ? PRIMARY_COLOR
                    : inputError
                    ? ERROR_COLOR
                    : NEUTRAL_COLOR
                }
              />
              <TextInput
                className="flex-1 ml-3 text-neutral-800"
                placeholder={placeholder}
                placeholderTextColor={COLORS.NEUTRAL[400]}
                value={value}
                onChangeText={onChange}
                onBlur={() => {
                  setIsFocused(false);
                  onBlur();
                }}
                onFocus={() => setIsFocused(true)}
                secureTextEntry={type === "password" && !isPasswordVisible}
                keyboardType={getKeyboardType()}
                autoCapitalize={type === "email" ? "none" : "sentences"}
                editable={!disabled}
                selectTextOnFocus={!disabled}
                style={disabled ? { color: COLORS.NEUTRAL[400] } : undefined}
              />

              {/* Toggle button for password visibility */}
              {type === "password" && (
                <TouchableOpacity
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                  <Ionicons
                    name={isPasswordVisible ? "eye-off-outline" : "eye-outline"}
                    size={20}
                    color={inputError ? ERROR_COLOR : NEUTRAL_COLOR}
                  />
                </TouchableOpacity>
              )}
            </View>

            {/* Error message */}
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

export default CustomInput;
