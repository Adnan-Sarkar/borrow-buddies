import { View, Text, TouchableOpacity, Image } from "react-native";
import type { Control, FieldError } from "react-hook-form";
import { Controller } from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/Colors";

interface PaymentMethodSelectorProps {
  control: Control<any>;
  error?: FieldError;
}

const paymentMethods = [
  {
    id: "bkash",
    name: "bKash",
    icon: require("../../../../assets/images/bkash.png"),
    isImage: true,
  },
  {
    id: "card",
    name: "Credit/Debit Card",
    icon: "card-outline",
    isImage: false,
  },
];

export default function PaymentMethodSelector({
  control,
  error,
}: PaymentMethodSelectorProps) {
  return (
    <View>
      <Controller
        control={control}
        name="paymentMethod"
        render={({ field: { onChange, value } }) => (
          <View className="gap-3">
            {paymentMethods.map((method) => (
              <TouchableOpacity
                key={method.id}
                className={`flex-row items-center p-3 border rounded-lg ${
                  value === method.id
                    ? "border-primary-500 bg-primary-50"
                    : "border-neutral-200"
                }`}
                onPress={() => onChange(method.id)}
              >
                <View
                  className={`w-10 h-10 rounded-full items-center justify-center ${
                    value === method.id ? "bg-primary-100" : "bg-neutral-100"
                  }`}
                >
                  {method.isImage ? (
                    <Image
                      source={method.icon as any}
                      className="w-full"
                      resizeMode="contain"
                    />
                  ) : (
                    <Ionicons
                      name={method.icon as any}
                      size={20}
                      color={
                        value === method.id
                          ? COLORS.PRIMARY[600]
                          : COLORS.NEUTRAL[500]
                      }
                    />
                  )}
                </View>
                <Text
                  className={`ml-3 flex-1 font-medium ${
                    value === method.id
                      ? "text-primary-700"
                      : "text-neutral-700"
                  }`}
                >
                  {method.name}
                </Text>
                <View
                  className={`w-5 h-5 rounded-full border-2 items-center justify-center ${
                    value === method.id
                      ? "border-primary-500"
                      : "border-neutral-300"
                  }`}
                >
                  {value === method.id && (
                    <View className="w-3 h-3 rounded-full bg-primary-500" />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      />

      {error && (
        <Text className="text-red-500 text-xs mt-1 ml-1">{error.message}</Text>
      )}
    </View>
  );
}
