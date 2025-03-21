import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
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

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
              <View className="flex flex-col gap-2">
                <Text className="text-neutral-600 font-medium ml-1">Email</Text>
                <View className="flex-row items-center bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3">
                  <Ionicons name="mail-outline" size={20} color="#737373" />
                  <TextInput
                    className="flex-1 ml-3 text-neutral-800"
                    placeholder="Enter your email"
                    placeholderTextColor="#a3a3a3"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                  />
                </View>
              </View>

              {/* Password */}
              <View>
                <View className="flex flex-col gap-2">
                  <Text className="text-neutral-600 font-medium ml-1">
                    Password
                  </Text>
                  <View className="flex-row items-center bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3">
                    <Ionicons
                      name="lock-closed-outline"
                      size={20}
                      color="#737373"
                    />
                    <TextInput
                      className="flex-1 ml-3 text-neutral-800"
                      placeholder="Enter your password"
                      placeholderTextColor="#a3a3a3"
                      secureTextEntry={!showPassword}
                      value={password}
                      onChangeText={setPassword}
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                    >
                      <Ionicons
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        size={20}
                        color="#737373"
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Forgot password */}
                <TouchableOpacity className="items-end mt-2">
                  <Text className="text-primary-500 font-medium">
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Login button */}
              <View className="mt-6">
                <Button
                  title="Sign In"
                  onPress={() => {}}
                  variant="primary"
                  fullWidth
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

            {/* Register link */}
            <View className="flex-row justify-center mt-4">
              <Text className="text-neutral-600">Don't have an account? </Text>
              <Pressable>
                <Text className="text-primary-500 font-bold">Register</Text>
              </Pressable>
            </View>
          </View>

          {/* Bottom circle element */}
          <View
            className="absolute bottom-0 left-0 w-64 h-64 bg-secondary-100 rounded-tr-full opacity-50 z-0"
            pointerEvents="none"
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
