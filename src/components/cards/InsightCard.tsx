import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import COLORS from "../../utils/colors";
import ProgressBar from "../ui/ProgressBar";

type Props = {
  matchPercent: number;
  onImproveSkills: () => void;
};

export default function InsightCard({ matchPercent, onImproveSkills }: Props) {
  const progress = Math.min(Math.max(matchPercent / 100, 0), 1);

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.trendIcon}>📈</Text>
        <Text style={styles.title}>Skill Gap Insight</Text>
      </View>
      <Text style={styles.body}>
        You're {matchPercent}% match for "Senior Product Designer" roles. Improve
        your prototyping skills to close the gap.
      </Text>

      <View style={styles.labelRow}>
        <Text style={styles.labelLeft}>Current Skills Match</Text>
        <Text style={styles.labelRight}>{matchPercent}%</Text>
      </View>

      <ProgressBar progress={progress} height={8} />

      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onImproveSkills}
        style={styles.button}
      >
        <Text style={styles.buttonLabel}>Improve Skills</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    backgroundColor: COLORS.softBlueCard,
    padding: 16,
    marginBottom: 24,
    shadowColor: COLORS.shadowSubtle,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  trendIcon: {
    fontSize: 18,
    marginRight: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text,
  },
  body: {
    fontSize: 13,
    color: COLORS.mutedText,
    marginBottom: 12,
    lineHeight: 20,
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  labelLeft: {
    fontSize: 12,
    color: COLORS.mutedText,
  },
  labelRight: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.text,
  },
  button: {
    marginTop: 16,
    borderRadius: 999,
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    alignItems: "center",
  },
  buttonLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});

