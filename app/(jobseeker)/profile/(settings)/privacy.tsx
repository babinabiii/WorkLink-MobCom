import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../../../../src/utils/colors";
import ScreenContainer from "../../../../src/components/ui/ScreenContainer";

export default function ProfilePrivacyScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScreenContainer>
        <Text style={styles.title}>Privacy & Security</Text>
        <View style={styles.card}>
          <Text style={styles.body}>
            This is a placeholder screen. Later you can add controls for account
            privacy, sign-in alerts, and security preferences here.
          </Text>
        </View>
      </ScreenContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 16,
  },
  card: {
    borderRadius: 16,
    backgroundColor: COLORS.surface,
    padding: 16,
  },
  body: {
    fontSize: 14,
    color: COLORS.mutedText,
  },
});

