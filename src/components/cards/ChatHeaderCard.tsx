import React from "react";
import { View, Text, StyleSheet } from "react-native";
import COLORS from "../../utils/colors";
import Avatar from "../ui/Avatar";

export default function ChatHeaderCard() {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Avatar name="AI Assistant" />
        <View style={styles.textContainer}>
          <Text style={styles.title}>AI Assistant</Text>
          <Text style={styles.status}>
            <Text style={styles.dot}>• </Text>
            Online
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.background,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  textContainer: {
    marginLeft: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text,
  },
  status: {
    fontSize: 12,
    color: COLORS.success,
  },
  dot: {
    fontSize: 12,
  },
});

