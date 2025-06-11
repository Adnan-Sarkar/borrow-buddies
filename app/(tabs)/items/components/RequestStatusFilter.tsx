import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";

type StatusOption = {
  value: string | null;
  label: string;
  activeColorClass: string;
  activeBorderClass: string;
  activeTextClass: string;
};

type RequestStatusFilterProps = {
  activeStatus: string | null;
  onStatusChange: (status: string | null) => void;
  containerClassName?: string;
  showAllOption?: boolean;
  statusOptions?: StatusOption[];
};

export default function RequestStatusFilter({
  activeStatus,
  onStatusChange,
  containerClassName = "px-4 pt-3 pb-3 border-b border-neutral-100",
  showAllOption = true,
  statusOptions,
}: RequestStatusFilterProps) {
  const defaultOptions: StatusOption[] = [
    {
      value: null,
      label: "All",
      activeColorClass: "bg-primary-100",
      activeBorderClass: "border-primary-300",
      activeTextClass: "text-primary-800",
    },
    {
      value: "REQUESTED",
      label: "Pending",
      activeColorClass: "bg-warning-100",
      activeBorderClass: "border-warning-300",
      activeTextClass: "text-warning-800",
    },
    {
      value: "APPROVED",
      label: "Approved",
      activeColorClass: "bg-success-100",
      activeBorderClass: "border-success-300",
      activeTextClass: "text-success-800",
    },
    {
      value: "REJECTED",
      label: "Rejected",
      activeColorClass: "bg-error-100",
      activeBorderClass: "border-error-300",
      activeTextClass: "text-error-800",
    },
    {
      value: "ACTIVE",
      label: "Active",
      activeColorClass: "bg-primary-100",
      activeBorderClass: "border-primary-300",
      activeTextClass: "text-primary-800",
    },
    {
      value: "COMPLETED",
      label: "Completed",
      activeColorClass: "bg-success-100",
      activeBorderClass: "border-success-300",
      activeTextClass: "text-success-800",
    },
  ];

  const options = statusOptions || defaultOptions;

  const displayOptions = showAllOption
    ? options
    : options.filter((option) => option.value !== null);

  return (
    <View className={containerClassName}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="flex-row"
      >
        {displayOptions.map((option) => (
          <TouchableOpacity
            key={option.value || "all"}
            onPress={() => onStatusChange(option.value)}
            className={`mr-3 rounded-md px-4 py-2 ${
              activeStatus === option.value
                ? `${option.activeColorClass} border ${option.activeBorderClass}`
                : "bg-neutral-100 border border-neutral-200"
            }`}
          >
            <Text
              className={`${
                activeStatus === option.value
                  ? `${option.activeTextClass} font-medium`
                  : "text-neutral-600"
              }`}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
