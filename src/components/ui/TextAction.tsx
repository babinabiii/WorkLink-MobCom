import React from "react";
import { Text, TouchableOpacity, StyleSheet, GestureResponderEvent } from "react-native";
import COLORS from "../../utils/colors";

type Props = {
  label: string;
  onPress?: (event: GestureResponderEvent) => void;
};

export default function TextAction({ label, onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 13,
    fontWeight: "500",
    color: COLORS.primary,
  },
});

