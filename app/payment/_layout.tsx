import { Stack } from "expo-router";
import React from "react";

export default function PaymentLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="checkout/index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="success/index"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
