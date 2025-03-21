import React from "react";
import { Text, TouchableOpacity, ActivityIndicator } from "react-native";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline";
  isLoading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
}

export default function Button({
  title,
  onPress,
  variant = "primary",
  isLoading = false,
  disabled = false,
  fullWidth = false,
}: ButtonProps) {
  // Button styles based on variant
  let buttonClasses =
    "py-4 px-6 rounded-xl flex items-center justify-center shadow-sm";

  if (fullWidth) {
    buttonClasses += " w-full";
  }

  if (disabled) {
    buttonClasses += " opacity-60";
  }

  // Apply variant-specific styles
  switch (variant) {
    case "primary":
      buttonClasses += " bg-primary-500 active:bg-primary-600";
      break;
    case "secondary":
      buttonClasses += " bg-secondary-500 active:bg-secondary-600";
      break;
    case "outline":
      buttonClasses +=
        " bg-white border-2 border-primary-500 active:bg-primary-50";
      break;
  }

  // Text styles based on variant
  let textClasses = "font-semibold text-center text-base";

  switch (variant) {
    case "primary":
    case "secondary":
      textClasses += " text-white";
      break;
    case "outline":
      textClasses += " text-primary-500";
      break;
  }

  return (
    <TouchableOpacity
      className={buttonClasses}
      onPress={onPress}
      disabled={disabled || isLoading}
      activeOpacity={0.8}
    >
      {isLoading ? (
        <ActivityIndicator
          color={variant === "outline" ? "#6366f1" : "#ffffff"}
          size="small"
        />
      ) : (
        <Text className={textClasses}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}
