import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Pressable,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Button from "../../components/common/Button";
import { useRouter } from "expo-router";
import { useLoginMutation } from "../../redux/api/authApi";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomInput from "../../components/common/CustomInput";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/redux/feature/auth/authSlice";

// Login validation schema with Zod
const loginSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .min(6, "Email must be at least 6 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginScreen() {
  const [login, { isLoading }] = useLoginMutation();
  const router = useRouter();
  const dispatch = useDispatch();

  const { control, handleSubmit } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (data: LoginFormData) => {
    try {
      const response = await login(data).unwrap();

      if (response.data?.token) {
        await AsyncStorage.setItem("authToken", response.data.token);
      }

      if (response.data) {
        dispatch(setCredentials(response.data));
      }

      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: "Login Successful",
        textBody: "Welcome back to BorrowBuddies!",
      });

      router.replace("/(tabs)/home" as any);
    } catch (error: any) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Login Failed",
        textBody:
          error?.data?.message || "Invalid credentials. Please try again.",
      });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 bg-white"
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Top circle shape */}
          <View className="absolute top-0 right-0 w-64 h-64 bg-primary-100 rounded-bl-full opacity-50 z-0" />

          <View className="px-8 pt-16 pb-8 flex-1 z-10">
            {/* Logo and header */}
            <View className="items-center mb-8">
              <View className="w-20 h-20 bg-primary-500 rounded-2xl items-center justify-center mb-4">
                <Ionicons name="share-social-outline" size={36} color="white" />
              </View>
              <View className="items-center">
                <Text className="text-4xl font-extrabold text-primary-500 mb-1">
                  Welcome Back
                </Text>
              </View>
              <Text className="text-neutral-600 text-center leading-5 px-3">
                Connect with your community and share what matters most. Just
                one step away.
              </Text>
            </View>

            {/* Form */}
            <View className="flex flex-col gap-5">
              {/* Email */}
              <CustomInput
                control={control}
                name="email"
                label="Email"
                placeholder="Enter your email"
                type="email"
                disabled={isLoading}
              />

              {/* Password */}
              <View>
                <CustomInput
                  control={control}
                  name="password"
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  disabled={isLoading}
                />
              </View>

              {/* Login button */}
              <View className="mt-6">
                <Button
                  title="Sign In"
                  onPress={handleSubmit(handleLogin)}
                  variant="primary"
                  fullWidth
                  isLoading={isLoading}
                />
              </View>

              {/* Social login options */}
              <View className="my-6">
                <View className="flex-row items-center mb-6">
                  <View className="flex-1 h-[1px] bg-neutral-200" />
                  <Text className="mx-4 text-neutral-500">
                    OR CONTINUE WITH
                  </Text>
                  <View className="flex-1 h-[1px] bg-neutral-200" />
                </View>

                <View className="flex-row justify-center gap-4">
                  <TouchableOpacity className="w-14 h-14 bg-neutral-50 border border-neutral-200 rounded-full items-center justify-center">
                    <Ionicons name="logo-google" size={24} color="#EA4335" />
                  </TouchableOpacity>

                  <TouchableOpacity className="w-14 h-14 bg-neutral-50 border border-neutral-200 rounded-full items-center justify-center">
                    <Ionicons name="logo-apple" size={24} color="#000000" />
                  </TouchableOpacity>

                  <TouchableOpacity className="w-14 h-14 bg-neutral-50 border border-neutral-200 rounded-full items-center justify-center">
                    <Ionicons name="logo-facebook" size={24} color="#1877F2" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Registration page link */}
            <View className="flex-row justify-center mt-4">
              <Text className="text-neutral-600">Don't have an account? </Text>
              <Pressable onPress={() => router.push("/auth/registration")}>
                <Text className="text-primary-500 font-bold">Register</Text>
              </Pressable>
            </View>
          </View>

          {/* Bottom circle shape */}
          <View
            className="absolute bottom-0 left-0 w-64 h-64 bg-secondary-100 rounded-tr-full opacity-50 z-0"
            pointerEvents="none"
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
