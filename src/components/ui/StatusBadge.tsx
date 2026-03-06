import React from "react";
import { Text, View, StyleSheet } from "react-native";
import COLORS from "../../utils/colors";

type Props = {
  label: string;
};

export default function StatusBadge({ label }: Props) {
  return (
    <View style={styles.badge}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: COLORS.primaryLight,
  },
  text: {
    fontSize: 11,
    fontWeight: "500",
    color: COLORS.primary,
  },
});

