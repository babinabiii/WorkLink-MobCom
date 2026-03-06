import React from "react";
import { View, Text, StyleSheet } from "react-native";
import COLORS from "../../utils/colors";

type Props = {
  name: string;
};

export default function Avatar({ name }: Props) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <View style={styles.avatar}>
      <Text style={styles.text}>{initials}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.softBlueCard,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.primary,
  },
});

