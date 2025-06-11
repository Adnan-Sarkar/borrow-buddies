import { Stack } from "expo-router";
import React from "react";

export default function StackLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="notifications"
        options={{
          headerTitle: "Notifications",
          animation: "slide_from_right",
        }}
      />
    </Stack>
  );
}
