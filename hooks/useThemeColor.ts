/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { COLORS } from "../constants/Colors";
import { useColorScheme } from "react-native";

const Colors = {
  light: {
    text: COLORS.NEUTRAL[800],
    background: COLORS.NEUTRAL[50],
    primary: COLORS.PRIMARY[500],
    secondary: COLORS.SECONDARY[500],
    border: COLORS.NEUTRAL[200],
    notification: COLORS.ERROR[500],
    card: COLORS.NEUTRAL[100],
    tint: COLORS.PRIMARY[500],
    tabIconDefault: COLORS.NEUTRAL[400],
    tabIconSelected: COLORS.PRIMARY[500],
  },
  dark: {
    text: COLORS.NEUTRAL[50],
    background: COLORS.NEUTRAL[900],
    primary: COLORS.PRIMARY[400],
    secondary: COLORS.SECONDARY[400],
    border: COLORS.NEUTRAL[700],
    notification: COLORS.ERROR[400],
    card: COLORS.NEUTRAL[800],
    tint: COLORS.PRIMARY[400],
    tabIconDefault: COLORS.NEUTRAL[500],
    tabIconSelected: COLORS.PRIMARY[400],
  },
};

export type ThemeColorName = keyof typeof Colors.light &
  keyof typeof Colors.dark;

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: ThemeColorName
) {
  const theme = useColorScheme() ?? "light";
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

export default Colors;
