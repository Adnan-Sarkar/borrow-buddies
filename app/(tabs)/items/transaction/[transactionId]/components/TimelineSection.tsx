import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/Colors";
import { format, formatDistance } from "date-fns";

type TimelineSectionProps = {
  status: string;
  createdAt: string;
  updatedAt: string;
  startDate: string;
  endDate: string;
};

export default function TimelineSection({
  status,
  createdAt,
  updatedAt,
  startDate,
  endDate,
}: TimelineSectionProps) {
  const safeCreatedAt = createdAt ? new Date(createdAt) : new Date();
  const safeUpdatedAt = updatedAt ? new Date(updatedAt) : new Date();
  const safeStartDate = startDate ? new Date(startDate) : new Date();
  const safeEndDate = endDate ? new Date(endDate) : new Date();

  // Format dates for display
  const formatDateWithTime = (date: Date) => {
    return format(date, "MMM d, yyyy • h:mm a");
  };

  // Format relative time
  const getTimeAgo = (date: Date) => {
    return formatDistance(date, new Date(), { addSuffix: true });
  };

  // Timeline steps based on status
  const getTimelineSteps = () => {
    const steps = [
      {
        icon: "create-outline",
        title: "Request Created",
        date: safeCreatedAt,
        isCompleted: true,
        description: "Transaction request was submitted",
        timeAgo: getTimeAgo(safeCreatedAt),
      },
      {
        icon: "checkmark-circle-outline",
        title: "Request Approved",
        date: safeUpdatedAt,
        isCompleted: ["APPROVED", "ACTIVE", "COMPLETED"].includes(status || ""),
        description: ["APPROVED", "ACTIVE", "COMPLETED"].includes(status || "")
          ? "Owner approved the request"
          : status === "REJECTED"
          ? "Request was rejected"
          : "Waiting for owner approval",
        timeAgo: ["APPROVED", "ACTIVE", "COMPLETED"].includes(status || "")
          ? getTimeAgo(safeUpdatedAt)
          : null,
      },
      {
        icon: "calendar-outline",
        title: "Rental Period Starts",
        date: safeStartDate,
        isCompleted: ["ACTIVE", "COMPLETED"].includes(status || ""),
        description: ["ACTIVE", "COMPLETED"].includes(status || "")
          ? "Item was picked up"
          : "Scheduled start date",
        timeAgo: ["ACTIVE", "COMPLETED"].includes(status || "")
          ? getTimeAgo(safeStartDate)
          : null,
      },
      {
        icon: "calendar-clear-outline",
        title: "Rental Period Ends",
        date: safeEndDate,
        isCompleted: status === "COMPLETED",
        description:
          status === "COMPLETED"
            ? "Item was returned"
            : "Scheduled return date",
        timeAgo: status === "COMPLETED" ? getTimeAgo(safeEndDate) : null,
      },
    ];

    // for rejected request
    if (status === "REJECTED") {
      steps[1] = {
        ...steps[1],
        icon: "close-circle-outline",
        title: "Request Rejected",
        isCompleted: true,
        description: "Owner declined this request",
        timeAgo: getTimeAgo(safeUpdatedAt),
      };
    }

    return steps;
  };

  const timelineSteps = getTimelineSteps();

  return (
    <View className="px-4 mt-6 mb-6">
      <Text className="text-neutral-800 font-semibold text-lg mb-3">
        Transaction Timeline
      </Text>
      <View className="bg-white rounded-xl border border-neutral-200 p-4">
        <View className="ml-3">
          {timelineSteps.map((step, index) => (
            <View key={index} className="flex-row">
              {/* Timeline shape */}
              <View className="items-center">
                {/* circle */}
                <View
                  className={`w-3 h-3 rounded-full z-10 ${
                    step.isCompleted ? "bg-primary-500" : "bg-neutral-300"
                  }`}
                />
                {/* vertical line */}
                {index < timelineSteps.length - 1 && (
                  <View
                    className={`w-0.5 h-20 ${
                      step.isCompleted && timelineSteps[index + 1].isCompleted
                        ? "bg-primary-500"
                        : "bg-neutral-200"
                    }`}
                  />
                )}
              </View>

              {/* Timeline Content */}
              <View className="ml-4 mb-6 flex-1">
                <View className="flex-row items-center mb-1">
                  <Ionicons
                    name={step.icon as any}
                    size={16}
                    color={
                      step.isCompleted
                        ? COLORS.PRIMARY[600]
                        : COLORS.NEUTRAL[400]
                    }
                  />
                  <Text
                    className={`ml-2 font-semibold ${
                      step.isCompleted ? "text-neutral-800" : "text-neutral-400"
                    }`}
                  >
                    {step.title}
                  </Text>
                </View>

                <Text
                  className={`text-sm ${
                    step.isCompleted ? "text-neutral-600" : "text-neutral-400"
                  }`}
                >
                  {step.description}
                </Text>

                <View className="flex-row items-center mt-1">
                  <Text
                    className={`text-xs ${
                      step.isCompleted ? "text-neutral-500" : "text-neutral-400"
                    }`}
                  >
                    {formatDateWithTime(step.date)}
                  </Text>

                  {step.timeAgo && (
                    <View className="bg-neutral-100 rounded-full px-2 py-0.5 ml-2">
                      <Text className="text-neutral-600 text-[10px]">
                        {step.timeAgo}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
