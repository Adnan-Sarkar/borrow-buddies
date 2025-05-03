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
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomInput from "../../components/common/CustomInput";
import CustomSelect from "../../components/common/CustomSelect";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import { useRegisterMutation } from "../../redux/api/authApi";

// Gender
const genderOptions = [
  { label: "Male", value: "MALE" },
  { label: "Female", value: "FEMALE" },
];

// Registration validation schema with Zod
const registrationSchema = z.object({
  name: z.string().min(3, "Full name must be at least 3 characters"),
  email: z
    .string()
    .email("Please enter a valid email address")
    .min(6, "Email must be at least 6 characters"),
  gender: z.string().min(1, "Please select a gender"),
  location: z.string().min(3, "Please enter your location"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

export default function RegisterScreen() {
  const [register, { isLoading }] = useRegisterMutation();

  const { control, handleSubmit } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      location: "",
      gender: "",
    },
  });

  const handleRegistration = async (data: RegistrationFormData) => {
    try {
      const newUserData = {
        ...data,
        role: "USER",
      };
      await register(newUserData).unwrap();

      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: "Registration Successful",
        textBody: "Your account has been created successfully.",
      });

      router.replace("/auth/login");
    } catch (error: any) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Registration Failed",
        textBody:
          error?.data?.message || "Could not create account. Please try again.",
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
          {/* Back button */}
          <TouchableOpacity
            className="absolute top-12 left-6 z-20 p-3 rounded-full bg-white shadow-md"
            onPress={() => router.push("/auth/login")}
          >
            <Ionicons name="arrow-back" size={24} color="#404040" />
          </TouchableOpacity>

          {/* Top design element */}
          <View className="absolute top-0 right-0 w-64 h-64 bg-primary-100 rounded-bl-full opacity-50 z-0" />

          <View className="px-8 pt-16 pb-8 flex-1 z-10">
            {/* Header */}
            <View className="items-center mb-8 mt-4">
              <View className="w-20 h-20 bg-primary-500 rounded-2xl items-center justify-center mb-4">
                <Ionicons name="person-add-outline" size={36} color="white" />
              </View>
              <View className="items-center">
                <Text className="text-4xl font-extrabold text-primary-500 mb-1">
                  Create Account
                </Text>
              </View>
              <Text className="text-neutral-600 text-center leading-5 px-3">
                Join our community to start borrowing and lending items with
                people around you.
              </Text>
            </View>

            {/* Form */}
            <View className="flex flex-col gap-5">
              {/* Full Name */}
              <CustomInput
                control={control}
                name="name"
                label="Full Name"
                placeholder="Enter your full name"
                icon="person-outline"
                disabled={isLoading}
              />

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
              <CustomInput
                control={control}
                name="password"
                label="Password"
                placeholder="Create a password"
                type="password"
                disabled={isLoading}
              />

              {/* Location */}
              <CustomInput
                control={control}
                name="location"
                label="Location"
                placeholder="Enter your city"
                icon="location-outline"
                disabled={isLoading}
              />

              {/* Gender */}
              <CustomSelect
                control={control}
                name="gender"
                label="Gender"
                placeholder="Select your gender"
                icon="person-outline"
                options={genderOptions}
                disabled={isLoading}
              />

              {/* Register button */}
              <View className="mt-6">
                <Button
                  title="Create Account"
                  onPress={handleSubmit(handleRegistration)}
                  variant="primary"
                  fullWidth
                  isLoading={isLoading}
                />
              </View>

              {/* Social register options */}
              <View className="my-6">
                <View className="flex-row items-center mb-6">
                  <View className="flex-1 h-[1px] bg-neutral-200" />
                  <Text className="mx-4 text-neutral-500">
                    OR REGISTER WITH
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

            {/* Login link */}
            <View className="flex-row justify-center mt-2">
              <Text className="text-neutral-600">
                Already have an account?{" "}
              </Text>
              <Pressable onPress={() => router.push("/auth/login")}>
                <Text className="text-primary-500 font-bold">Sign In</Text>
              </Pressable>
            </View>
          </View>

          {/* Bottom design element */}
          <View
            className="absolute bottom-0 left-0 w-64 h-64 bg-secondary-100 rounded-tr-full opacity-50 z-0"
            pointerEvents="none"
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
