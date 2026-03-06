import React from "react";
import { View, StyleSheet } from "react-native";
import COLORS from "../../utils/colors";
import InfoRow from "../ui/InfoRow";

type Props = {
  email: string;
  skills: string;
  resume: string;
  onPressEmail: () => void;
  onPressSkills: () => void;
  onPressResume: () => void;
};

export default function ProfileInfoCard({
  email,
  skills,
  resume,
  onPressEmail,
  onPressSkills,
  onPressResume,
}: Props) {
  return (
    <View style={styles.card}>
      <InfoRow
        iconName="mail-outline"
        label="Email"
        value={email}
        onPress={onPressEmail}
      />
      <View style={styles.divider} />
      <InfoRow
        iconName="ribbon-outline"
        label="Skills"
        value={skills}
        onPress={onPressSkills}
      />
      <View style={styles.divider} />
      <InfoRow
        iconName="document-text-outline"
        label="Resume"
        value={resume}
        onPress={onPressResume}
      />
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
});

