import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import COLORS from "../../utils/colors";
import ProgressBar from "../ui/ProgressBar";

type Props = {
  title: string;
  completedModules: number;
  totalModules: number;
  progressPercent: number;
  onContinue?: () => void;
};

export default function ProgressCard({
  title,
  completedModules,
  totalModules,
  progressPercent,
  onContinue,
}: Props) {
  const progress = Math.min(Math.max(progressPercent / 100, 0), 1);

  return (
    <View style={styles.card}>
      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>
      <Text style={styles.modules}>
        {completedModules}/{totalModules} Modules
      </Text>
      <Text style={styles.progressLabel}>Progress</Text>

      <View style={styles.progressRow}>
        <View style={styles.progressBarWrapper}>
          <ProgressBar progress={progress} />
        </View>
        <Text style={styles.percent}>{progressPercent}%</Text>
      </View>

      <TouchableOpacity activeOpacity={0.7} onPress={onContinue}>
        <Text style={styles.continue}>Continue →</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 220,
    borderRadius: 18,
    backgroundColor: COLORS.background,
    padding: 14,
    marginRight: 12,
    shadowColor: COLORS.shadowSubtle,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 2,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 4,
  },
  modules: {
    fontSize: 12,
    color: COLORS.mutedText,
    marginBottom: 4,
  },
  progressLabel: {
    fontSize: 11,
    color: COLORS.mutedText,
    marginBottom: 6,
  },
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  progressBarWrapper: {
    flex: 1,
    marginRight: 8,
  },
  percent: {
    fontSize: 12,
    fontWeight: "500",
    color: COLORS.text,
  },
  continue: {
    fontSize: 13,
    fontWeight: "500",
    color: COLORS.primary,
  },
});

