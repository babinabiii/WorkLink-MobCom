import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../../../src/utils/colors";
import ScreenContainer from "../../../src/components/ui/ScreenContainer";

export default function CommunityAllScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScreenContainer>
        <Text style={styles.title}>All Community Posts</Text>
        <View style={styles.card}>
          <Text style={styles.body}>
            This is a placeholder screen where you can later show a full list of
            community posts and filters.
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
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 12,
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

