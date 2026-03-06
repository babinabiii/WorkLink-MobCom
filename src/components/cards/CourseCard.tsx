import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  GestureResponderEvent,
} from "react-native";
import COLORS from "../../utils/colors";

type Props = {
  title: string;
  description: string;
  duration: string;
  rating: string;
  image?: string;
  started?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
  onPressPlay?: () => void;
  highlighted?: boolean;
};

export default function CourseCard({
  title,
  description,
  duration,
  rating,
  image,
  started,
  onPress,
  onPressPlay,
  highlighted,
}: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={[
        styles.card,
        highlighted && { borderColor: COLORS.primary, borderWidth: 1.2 },
      ]}
    >
      <View style={styles.thumbnailWrapper}>
        {image ? (
          <Image source={{ uri: image }} style={styles.thumbnail} />
        ) : (
          <View style={styles.thumbnailPlaceholder} />
        )}
      </View>
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {description}
        </Text>
        <View style={styles.metaRow}>
          <Text style={styles.metaText}>⏱ {duration}</Text>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.metaText}>⭐ {rating}</Text>
          {started ? (
            <>
              <Text style={styles.dot}>•</Text>
              <Text style={styles.started}>In progress</Text>
            </>
          ) : null}
        </View>
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.playButton}
        onPress={onPressPlay}
      >
        <Text style={styles.playIcon}>▶</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 18,
    backgroundColor: COLORS.background,
    padding: 12,
    marginBottom: 12,
    shadowColor: COLORS.shadowSubtle,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 2,
  },
  thumbnailWrapper: {
    marginRight: 10,
  },
  thumbnail: {
    width: 52,
    height: 52,
    borderRadius: 12,
  },
  thumbnailPlaceholder: {
    width: 52,
    height: 52,
    borderRadius: 12,
    backgroundColor: COLORS.softBlueCard,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 2,
  },
  description: {
    fontSize: 12,
    color: COLORS.mutedText,
    marginBottom: 6,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  metaText: {
    fontSize: 11,
    color: COLORS.mutedText,
  },
  dot: {
    marginHorizontal: 4,
    fontSize: 10,
    color: COLORS.mutedText,
  },
  started: {
    fontSize: 11,
    color: COLORS.primary,
    fontWeight: "500",
  },
  playButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  playIcon: {
    fontSize: 14,
    color: COLORS.primary,
  },
});

