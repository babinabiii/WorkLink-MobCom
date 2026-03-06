import React from "react";
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../utils/colors";

type Props = {
  label: string;
  onPress?: (event: GestureResponderEvent) => void;
  style?: ViewStyle;
};

export default function OutlineDangerButton({ label, onPress, style }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={[styles.button, style]}
    >
      <Ionicons
        name="log-out-outline"
        size={18}
        color={COLORS.danger}
        style={styles.icon}
      />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    borderWidth: 1,
    borderColor: COLORS.danger,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
  },
  icon: {
    marginRight: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.danger,
  },
});

