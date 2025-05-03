import { Stack, useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../components/common/Button";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/Colors";

export default function NotFoundScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: "Page Not Found" }} />
      <View style={styles.iconContainer}>
        <Ionicons
          name="alert-circle-outline"
          size={80}
          color={COLORS.NEUTRAL[400]}
        />
      </View>
      <Text style={styles.title}>Page not found</Text>
      <Text style={styles.subtitle}>
        The page you are looking for doesn't exist or has been moved.
      </Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Go to Home"
          variant="primary"
          fullWidth
          onPress={() => {
            router.replace("/(tabs)/home" as any);
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  iconContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.NEUTRAL[800],
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.NEUTRAL[600],
    textAlign: "center",
    marginBottom: 32,
  },
  buttonContainer: {
    width: "100%",
  },
});
