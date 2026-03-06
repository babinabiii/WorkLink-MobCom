import React from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../utils/colors";

type Props = {
  iconName: React.ComponentProps<typeof Ionicons>["name"];
  label: string;
  value: boolean;
  onValueChange: (next: boolean) => void;
};

export default function ToggleSettingRow({
  iconName,
  label,
  value,
  onValueChange,
}: Props) {
  return (
    <View style={styles.row}>
      <View style={styles.left}>
        <View style={styles.iconWrapper}>
          <Ionicons name={iconName} size={18} color={COLORS.primary} />
        </View>
        <Text style={styles.label}>{label}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: COLORS.grayLight, true: COLORS.primaryLight }}
        thumbColor={value ? COLORS.primary : "#FFFFFF"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
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
  label: {
    fontSize: 13,
    color: COLORS.text,
  },
});

