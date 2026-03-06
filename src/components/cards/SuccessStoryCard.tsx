import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import COLORS from "../../utils/colors";

type Props = {
  title: string;
  quote: string;
  onReadMore: () => void;
};

export default function SuccessStoryCard({ title, quote, onReadMore }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.thumbnail} />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        <Text style={styles.quote} numberOfLines={2}>
          {quote}
        </Text>
        <TouchableOpacity activeOpacity={0.7} onPress={onReadMore}>
          <Text style={styles.readMore}>Read More</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    borderRadius: 20,
    backgroundColor: COLORS.background,
    padding: 12,
    marginBottom: 20,
    shadowColor: COLORS.shadowSubtle,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 2,
  },
  thumbnail: {
    width: 70,
    height: 70,
    borderRadius: 18,
    backgroundColor: COLORS.softBlueCard,
    marginRight: 12,
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 4,
  },
  quote: {
    fontSize: 12,
    color: COLORS.mutedText,
    marginBottom: 6,
  },
  readMore: {
    fontSize: 12,
    fontWeight: "500",
    color: COLORS.primary,
  },
});

