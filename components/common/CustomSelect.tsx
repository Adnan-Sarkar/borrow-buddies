import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated,
  Easing,
  TouchableWithoutFeedback,
  BackHandler,
  Platform,
} from "react-native";
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

export type SelectOption = {
  label: string;
  value: string;
};

interface CustomSelectProps<T extends FieldValues> {
  label: string;
  placeholder?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  options: SelectOption[];
  name: Path<T>;
  control: Control<T>;
  error?: FieldError;
  disabled?: boolean;
}

function CustomSelect<T extends FieldValues>({
  label,
  placeholder = "Select an option",
  icon = "chevron-down-outline",
  options,
  name,
  control,
  error,
  disabled = false,
}: CustomSelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const dropdownAnimation = useRef(new Animated.Value(0)).current;
  const rotateAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (Platform.OS !== "web" && isOpen) {
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        () => {
          if (isOpen) {
            toggleDropdown();
            return true;
          }
          return false;
        }
      );

      return () => backHandler.remove();
    }
  }, [isOpen]);

  const toggleDropdown = () => {
    if (!disabled) {
      const toValue = isOpen ? 0 : 1;

      Animated.timing(dropdownAnimation, {
        toValue,
        duration: 300,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
        useNativeDriver: false,
      }).start();

      Animated.timing(rotateAnimation, {
        toValue,
        duration: 300,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
        useNativeDriver: false,
      }).start();

      setIsOpen(!isOpen);
      setIsFocused(!isOpen);
    }
  };

  const getDisplayValue = (value: any): string => {
    if (!value) return "";
    const selectedOption = options.find((option) => option.value === value);
    return selectedOption ? selectedOption.label : "";
  };

  const maxDropdownHeight = Math.min(options.length * 48, 240);

  const rotateInterpolate = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const dropdownHeight = dropdownAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, maxDropdownHeight],
  });

  const dropdownOpacity = dropdownAnimation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0.5, 1],
  });

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, value },
        fieldState: { error: fieldError },
      }) => {
        const inputError = error || fieldError;
        const displayValue = getDisplayValue(value);

        return (
          <View className="flex flex-col gap-2 mb-4">
            <Text className="text-neutral-600 font-medium ml-1">{label}</Text>

            {/* TouchableWithoutFeedback to close dropdown when clicking outside */}
            {isOpen && (
              <TouchableWithoutFeedback onPress={toggleDropdown}>
                <View
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                  }}
                />
              </TouchableWithoutFeedback>
            )}

            <View className="relative z-10">
              <TouchableOpacity
                activeOpacity={disabled ? 1 : 0.7}
                onPress={toggleDropdown}
                className={`flex-row items-center justify-between bg-neutral-50 border rounded-xl px-4 py-6
                  ${isFocused ? "border-primary-500" : "border-neutral-200"}
                  ${inputError ? "border-red-500" : ""}
                  ${isOpen ? "rounded-b-none" : ""}
                `}
              >
                <View className="flex-row items-center flex-1">
                  <Ionicons
                    name={icon}
                    size={20}
                    color={
                      isFocused
                        ? PRIMARY_COLOR
                        : inputError
                        ? ERROR_COLOR
                        : NEUTRAL_COLOR
                    }
                  />
                  <Text
                    className={`ml-3 ${
                      displayValue ? "text-neutral-800" : "text-neutral-400"
                    } ${disabled ? "text-neutral-400" : ""}`}
                    numberOfLines={1}
                  >
                    {displayValue || placeholder}
                  </Text>
                </View>
                <Animated.View
                  style={{ transform: [{ rotate: rotateInterpolate }] }}
                >
                  <Ionicons
                    name="chevron-down"
                    size={20}
                    color={
                      disabled
                        ? COLORS.NEUTRAL[400]
                        : inputError
                        ? ERROR_COLOR
                        : isFocused
                        ? PRIMARY_COLOR
                        : NEUTRAL_COLOR
                    }
                  />
                </Animated.View>
              </TouchableOpacity>

              {/* Dropdown options */}
              {isOpen && (
                <Animated.View
                  style={{
                    height: dropdownHeight,
                    opacity: dropdownOpacity,
                    overflow: "hidden",
                    zIndex: 1000,
                  }}
                  className="absolute top-[100%] left-0 right-0 bg-white border border-neutral-200 rounded-b-xl shadow-md"
                >
                  <ScrollView
                    style={{ maxHeight: maxDropdownHeight }}
                    showsVerticalScrollIndicator={false}
                    nestedScrollEnabled={true}
                  >
                    {options.map((item, index) => (
                      <TouchableOpacity
                        key={item.value}
                        className={`py-3 px-4 flex-row justify-between items-center border-b border-neutral-100
                          ${value === item.value ? "bg-primary-50" : ""}
                          ${index === options.length - 1 ? "border-b-0" : ""}
                        `}
                        onPress={() => {
                          onChange(item.value);
                          toggleDropdown();
                        }}
                      >
                        <Text
                          className={`text-base ${
                            value === item.value
                              ? "text-primary-500 font-medium"
                              : "text-neutral-800"
                          }`}
                        >
                          {item.label}
                        </Text>
                        {value === item.value && (
                          <Ionicons
                            name="checkmark"
                            size={20}
                            color={PRIMARY_COLOR}
                          />
                        )}
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </Animated.View>
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

export default CustomSelect;
