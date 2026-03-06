import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import COLORS from "../../../../src/utils/colors";
import ScreenContainer from "../../../../src/components/ui/ScreenContainer";

export default function SuccessStoryDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScreenContainer>
        <Text style={styles.title}>Success Story</Text>
        <View style={styles.card}>
          <Text style={styles.subtitle}>Story ID: {id}</Text>
          <Text style={styles.body}>
            This is a placeholder success story detail page. Later you can load
            the full story content from your backend based on the ID.
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
    borderRadius: 18,
    backgroundColor: COLORS.surface,
    padding: 16,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 8,
  },
  body: {
    fontSize: 14,
    color: COLORS.mutedText,
    lineHeight: 20,
  },
});

