import React from "react";
import { View, Text, StyleSheet } from "react-native";
import COLORS from "../../utils/colors";
import PrimaryButton from "../ui/PrimaryButton";

type Props = {
  onConnect: () => void;
};

export default function MentorCTA({ onConnect }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Find a Mentor</Text>
      <Text style={styles.body}>
        Connect with industry leader to accelerate your career growth and get
        personalized guidance.
      </Text>
      <PrimaryButton label="CONNECT" onPress={onConnect} style={styles.button} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 22,
    backgroundColor: COLORS.softBlueCard,
    padding: 18,
    marginTop: 16,
    marginBottom: 24,
    shadowColor: COLORS.shadowSubtle,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 6,
  },
  body: {
    fontSize: 13,
    color: COLORS.mutedText,
    lineHeight: 20,
    marginBottom: 14,
  },
  button: {
    alignSelf: "flex-start",
    paddingHorizontal: 28,
  },
});

