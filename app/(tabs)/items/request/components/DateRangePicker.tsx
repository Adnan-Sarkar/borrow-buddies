import React from "react";
import { View, Text } from "react-native";
import type { Control, FieldErrors } from "react-hook-form";
import { Controller } from "react-hook-form";
import { Calendar, type DateData } from "react-native-calendars";
import { COLORS } from "@/constants/Colors";
import CustomInput from "@/components/common/CustomInput";

type DateRangePickerProps = {
  control: Control<any>;
  errors: FieldErrors<any>;
  availabilityRange: {
    min: Date;
    max: Date;
  };
};

export default function DateRangePicker({
  control,
  errors,
  availabilityRange,
}: DateRangePickerProps) {
  const formatDate = (date: Date): string => {
    return date.toISOString().split("T")[0]; // YYYY-MM-DD
  };

  return (
    <View>
      <View className="flex flex-row gap-4 space-x-4 mb-4">
        <View className="flex-1">
          <Controller
            control={control}
            name="startDate"
            render={({ field: { value } }) => (
              <CustomInput
                name="startDate"
                control={control}
                label="Start Date"
                value={value.toLocaleDateString()}
                editable={false}
                error={
                  Array.isArray(errors.startDate)
                    ? undefined
                    : (errors.startDate as
                        | import("react-hook-form").FieldError
                        | undefined)
                }
                icon="calendar-outline"
              />
            )}
          />
        </View>

        <View className="flex-1">
          <Controller
            control={control}
            name="endDate"
            render={({ field: { onChange, value } }) => (
              <CustomInput
                name="endDate"
                control={control}
                label="End Date"
                value={value.toLocaleDateString()}
                editable={false}
                error={
                  Array.isArray(errors.endDate)
                    ? undefined
                    : (errors.endDate as
                        | import("react-hook-form").FieldError
                        | undefined)
                }
                icon="calendar-outline"
              />
            )}
          />
        </View>
      </View>

      <Controller
        control={control}
        name="startDate"
        render={({ field: { onChange: onStartChange, value: startValue } }) => (
          <Controller
            control={control}
            name="endDate"
            render={({ field: { onChange: onEndChange, value: endValue } }) => {
              // Format dates for calendar
              const startFormatted = formatDate(startValue);
              const endFormatted = formatDate(endValue);

              // Create marked dates object for the period selection
              const markedDates: any = {};

              // Mark the period
              if (startFormatted && endFormatted) {
                // Add start date
                markedDates[startFormatted] = {
                  startingDay: true,
                  color: COLORS.PRIMARY[500],
                  textColor: "white",
                };

                // Add end date
                markedDates[endFormatted] = {
                  endingDay: true,
                  color: COLORS.PRIMARY[500],
                  textColor: "white",
                };

                // Add dates in between
                let currentDate = new Date(startValue);
                currentDate.setDate(currentDate.getDate() + 1);

                while (currentDate < endValue) {
                  const dateString = formatDate(currentDate);
                  markedDates[dateString] = {
                    color: COLORS.PRIMARY[100],
                    textColor: COLORS.PRIMARY[800],
                  };
                  currentDate.setDate(currentDate.getDate() + 1);
                }
              }

              return (
                <Calendar
                  minDate={formatDate(availabilityRange.min)}
                  maxDate={formatDate(availabilityRange.max)}
                  markingType={"period"}
                  markedDates={markedDates}
                  onDayPress={(day: DateData) => {
                    const selectedDate = new Date(day.dateString);

                    if (
                      !startValue ||
                      selectedDate < startValue ||
                      (endValue && selectedDate < endValue)
                    ) {
                      // Set as start date
                      onStartChange(selectedDate);

                      // If end date is now before start date, reset it
                      if (endValue && selectedDate > endValue) {
                        const nextDay = new Date(selectedDate);
                        nextDay.setDate(nextDay.getDate() + 1);
                        onEndChange(nextDay);
                      }
                    } else {
                      // Set as end date
                      onEndChange(selectedDate);
                    }
                  }}
                  theme={{
                    selectedDayBackgroundColor: COLORS.PRIMARY[500],
                    todayTextColor: COLORS.PRIMARY[500],
                    arrowColor: COLORS.PRIMARY[500],
                    calendarBackground: "transparent",
                  }}
                />
              );
            }}
          />
        )}
      />

      {errors.startDate && (
        <Text className="text-red-500 text-xs mt-1">
          {errors.startDate.message?.toString()}
        </Text>
      )}

      {errors.endDate && (
        <Text className="text-red-500 text-xs mt-1">
          {errors.endDate.message?.toString()}
        </Text>
      )}
    </View>
  );
}
