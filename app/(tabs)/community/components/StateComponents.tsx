import React from "react";
import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../../../constants/Colors";

// Loading indicator for lists, full-screen
export const LoadingIndicator: React.FC = () => (
  <View className="flex-1 items-center justify-center py-10">
    <ActivityIndicator size="large" color={COLORS.PRIMARY[500]} />
    <Text className="mt-4 text-neutral-500">Loading posts...</Text>
  </View>
);

// Footer loader for pagination
export const ListFooterLoader: React.FC = () => (
  <View className="py-4">
    <ActivityIndicator size="small" color={COLORS.PRIMARY[500]} />
  </View>
);

// Error view when loading fails
type ErrorViewProps = {
  message: string;
  onRetry?: () => void;
};

export const ErrorView: React.FC<ErrorViewProps> = ({ message, onRetry }) => (
  <View className="flex-1 items-center justify-center py-10 px-6">
    <View className="w-16 h-16 rounded-full bg-red-50 items-center justify-center mb-4">
      <Ionicons name="alert-circle" size={32} color={COLORS.WARNING[500]} />
    </View>
    <Text className="text-lg font-bold text-neutral-800 mb-2 text-center">
      Something went wrong
    </Text>
    <Text className="text-neutral-600 text-center mb-6">{message}</Text>
    {onRetry && (
      <TouchableOpacity
        className="bg-primary-500 px-6 py-2.5 rounded-full"
        onPress={onRetry}
        activeOpacity={0.8}
      >
        <Text className="text-white font-medium">Try Again</Text>
      </TouchableOpacity>
    )}
  </View>
);

// Empty state for lists
type EmptyStateProps = {
  icon: string;
  title: string;
  message: string;
  buttonText?: string;
  onButtonPress?: () => void;
};

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  message,
  buttonText,
  onButtonPress,
}) => (
  <View className="items-center justify-center px-6 py-16">
    <View className="w-20 h-20 rounded-full bg-neutral-100 items-center justify-center mb-4">
      <Ionicons name={icon as any} size={40} color={COLORS.NEUTRAL[400]} />
    </View>
    <Text className="text-xl font-bold text-neutral-800 mb-2 text-center">
      {title}
    </Text>
    <Text className="text-neutral-500 text-center mb-6">{message}</Text>
    {buttonText && onButtonPress && (
      <TouchableOpacity
        className="bg-primary-500 py-3 px-6 rounded-full"
        onPress={onButtonPress}
        activeOpacity={0.8}
      >
        <Text className="text-white font-medium">{buttonText}</Text>
      </TouchableOpacity>
    )}
  </View>
);

// Comment skeleton loader
export const CommentSkeleton: React.FC = () => (
  <View className="flex-row mb-4">
    <View className="w-10 h-10 rounded-full bg-neutral-100 mr-3" />
    <View className="flex-1">
      <View className="h-4 bg-neutral-100 w-1/3 rounded mb-2" />
      <View className="h-3 bg-neutral-100 w-2/3 rounded mb-2" />
      <View className="h-3 bg-neutral-100 w-3/4 rounded mb-3" />
      <View className="flex-row">
        <View className="h-3 bg-neutral-100 w-10 rounded mr-4" />
        <View className="h-3 bg-neutral-100 w-10 rounded" />
      </View>
    </View>
  </View>
);

// Content loading skeleton
export const ContentSkeleton: React.FC = () => (
  <View className="mb-4">
    <View className="h-6 bg-neutral-100 w-3/4 rounded mb-3" />
    <View className="h-4 bg-neutral-100 w-full rounded mb-2" />
    <View className="h-4 bg-neutral-100 w-full rounded mb-2" />
    <View className="h-4 bg-neutral-100 w-2/3 rounded mb-4" />
    <View className="h-40 bg-neutral-100 w-full rounded-lg" />
  </View>
);
