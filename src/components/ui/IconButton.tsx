import React from "react";
import { TouchableOpacity, StyleSheet, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../utils/colors";

type Props = {
  name: React.ComponentProps<typeof Ionicons>["name"];
  size?: number;
  color?: string;
  onPress?: () => void;
  style?: ViewStyle;
};

export default function IconButton({ name, size = 20, color, onPress, style }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[styles.button, style]}
    >
      <Ionicons name={name} size={size} color={color || COLORS.icon} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 6,
    borderRadius: 999,
  },
});

