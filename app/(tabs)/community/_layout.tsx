import { Slot } from "expo-router";
import { Stack } from "expo-router/stack";

export default function CommunityLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "white" },
      }}
    >
      <Slot />
    </Stack>
  );
}
