import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../utils/colors";

type Props = {
  iconName: React.ComponentProps<typeof Ionicons>["name"];
  label: string;
  value: string;
  onPress?: () => void;
};

export default function InfoRow({ iconName, label, value, onPress }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={onPress}
      style={styles.row}
    >
      <View style={styles.iconWrapper}>
        <Ionicons name={iconName} size={18} color={COLORS.primary} />
      </View>
      <View style={styles.texts}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value} numberOfLines={1}>
          {value}
        </Text>
      </View>
      <Ionicons
        name="chevron-forward"
        size={18}
        color={COLORS.icon}
        style={styles.chevron}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  iconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: COLORS.softBlueCard,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  texts: {
    flex: 1,
  },
  label: {
    fontSize: 11,
    textTransform: "uppercase",
    color: COLORS.mutedText,
    marginBottom: 2,
  },
  value: {
    fontSize: 13,
    color: COLORS.text,
  },
  chevron: {
    marginLeft: 8,
  },
});

