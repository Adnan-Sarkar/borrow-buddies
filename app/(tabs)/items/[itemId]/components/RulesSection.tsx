import React from "react";
import { View, Text } from "react-native";

interface RulesSectionProps {
  rules: string[];
}

export default function RulesSection({ rules }: RulesSectionProps) {
  if (!rules || rules.length === 0) {
    return null;
  }

  return (
    <View className="mb-6">
      <View className="flex-row items-center mb-4">
        <View className="flex-1 h-[1px] bg-neutral-200" />
        <Text className="mx-3 text-neutral-700 font-semibold">
          Borrowing Rules
        </Text>
        <View className="flex-1 h-[1px] bg-neutral-200" />
      </View>

      {/* Warning banner at the top */}
      <View className="mb-3 px-3 py-2.5 border-l-4 border-warning-500 bg-warning-50 rounded-r-md">
        <Text className="text-warning-800 font-medium">
          Please follow these rules while borrowing the item
        </Text>
      </View>

      {/* rules list */}
      <View>
        {rules.map((rule, index) => (
          <View
            key={index}
            className="flex-row items-start mb-3 border-b border-neutral-100 pb-2"
            style={{
              borderBottomWidth: index === rules.length - 1 ? 0 : 1,
            }}
          >
            <View className="w-6 h-6 rounded-full border-2 border-warning-400 items-center justify-center mt-0.5">
              <Text className="text-warning-500 font-bold text-xs">
                {index + 1}
              </Text>
            </View>
            <Text className="text-neutral-800 ml-3 flex-1 font-medium">
              {rule}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
