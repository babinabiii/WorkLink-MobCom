import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../utils/colors";
import ToggleSettingRow from "./ToggleSettingRow";

type ToggleItem = {
  type: "toggle";
  iconName: React.ComponentProps<typeof Ionicons>["name"];
  label: string;
  value: boolean;
  onValueChange: (next: boolean) => void;
};

type LinkItem = {
  type: "link";
  iconName: React.ComponentProps<typeof Ionicons>["name"];
  label: string;
  onPress: () => void;
};

type Props = {
  items: (ToggleItem | LinkItem)[];
};

export default function SettingsCard({ items }: Props) {
  return (
    <View style={styles.card}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        if (item.type === "toggle") {
          return (
            <View key={item.label}>
              <ToggleSettingRow
                iconName={item.iconName}
                label={item.label}
                value={item.value}
                onValueChange={item.onValueChange}
              />
              {!isLast && <View style={styles.divider} />}
            </View>
          );
        }
        return (
          <View key={item.label}>
            <TouchableOpacity
              activeOpacity={0.75}
              onPress={item.onPress}
              style={styles.linkRow}
            >
              <View style={styles.linkLeft}>
                <View style={styles.iconWrapper}>
                  <Ionicons
                    name={item.iconName}
                    size={18}
                    color={COLORS.primary}
                  />
                </View>
                <Text style={styles.linkLabel}>{item.label}</Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={18}
                color={COLORS.icon}
              />
            </TouchableOpacity>
            {!isLast && <View style={styles.divider} />}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    backgroundColor: COLORS.background,
    shadowColor: COLORS.shadowSubtle,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 2,
    marginBottom: 24,
    overflow: "hidden",
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.border,
  },
  linkRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  linkLeft: {
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
  linkLabel: {
    fontSize: 13,
    color: COLORS.text,
  },
});

