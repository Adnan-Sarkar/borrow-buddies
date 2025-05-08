import React from "react";
import { Text, View } from "react-native";
import type { ViewStyle } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { COLORS } from "@/constants/Colors";

type LogoProps = {
  size?: number;
  variant?: "horizontal" | "vertical" | "icon-only";
  color?: "light" | "primary" | "dark";
  style?: ViewStyle;
};

const Logo: React.FC<LogoProps> = ({
  size = 40,
  variant = "horizontal",
  color = "light",
  style,
}) => {
  const getColors = () => {
    switch (color) {
      case "light":
        return {
          iconBg: "bg-white/20",
          iconColor: "white",
          textColor: "text-white",
        };
      case "primary":
        return {
          iconBg: "bg-primary-100",
          iconColor: COLORS.PRIMARY[600],
          textColor: "text-primary-600",
        };
      case "dark":
        return {
          iconBg: "bg-neutral-100",
          iconColor: COLORS.NEUTRAL[800],
          textColor: "text-neutral-900",
        };
      default:
        return {
          iconBg: "bg-primary-100",
          iconColor: COLORS.PRIMARY[600],
          textColor: "text-primary-600",
        };
    }
  };

  const { iconBg, iconColor, textColor } = getColors();
  const iconSize = size * 0.45;
  const fontSize = size * 0.4;

  if (variant === "icon-only") {
    return (
      <View
        style={[{ width: size, height: size }, style]}
        className={`${iconBg} rounded-lg items-center justify-center`}
      >
        <FontAwesome5 name="hands-helping" size={iconSize} color={iconColor} />
      </View>
    );
  }

  if (variant === "vertical") {
    return (
      <View className="items-center" style={style}>
        <View
          style={{ width: size, height: size }}
          className={`${iconBg} rounded-lg items-center justify-center mb-2`}
        >
          <FontAwesome5
            name="hands-helping"
            size={iconSize}
            color={iconColor}
          />
        </View>
        <Text
          className={`font-bold ${textColor}`}
          style={{ fontSize: fontSize * 1.2 }}
        >
          BorrowBuddies
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-row items-center" style={style}>
      <View
        style={{ width: size, height: size }}
        className={`${iconBg} rounded-lg items-center justify-center mr-2`}
      >
        <FontAwesome5 name="hands-helping" size={iconSize} color={iconColor} />
      </View>
      <Text
        className={`font-bold ${textColor}`}
        style={{ fontSize: fontSize * 1.2 }}
      >
        BorrowBuddies
      </Text>
    </View>
  );
};

export default Logo;
