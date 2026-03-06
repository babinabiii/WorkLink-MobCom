import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import COLORS from "../../utils/colors";

type Props = {
  label: string;
  onPress: () => void;
  active?: boolean;
};

export default function ChipButton({ label, onPress, active = false }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.chip, active && styles.chipActive]}
    >
      <Text style={[styles.label, active && styles.labelActive]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    borderRadius: 999,
    paddingHorizontal: 18,
    paddingVertical: 10,
    backgroundColor: COLORS.primaryLight,
    marginRight: 8,
    alignSelf: "flex-start",
  },
  chipActive: {
    backgroundColor: COLORS.primary,
  },
  label: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: "500",
  },
  labelActive: {
    color: COLORS.background,
    fontWeight: "600",
  },
});

