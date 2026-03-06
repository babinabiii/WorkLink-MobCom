import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import COLORS from "../../utils/colors";

type Props = {
  followed: boolean;
  onToggle: () => void;
};

export default function FollowButton({ followed, onToggle }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onToggle}
      style={[styles.button, followed && styles.buttonFollowed]}
    >
      <Text style={[styles.label, followed && styles.labelFollowed]}>
        {followed ? "Following" : "Follow"}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 6,
    backgroundColor: COLORS.primary,
  },
  buttonFollowed: {
    backgroundColor: COLORS.primaryLight,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  labelFollowed: {
    color: COLORS.primary,
  },
});

