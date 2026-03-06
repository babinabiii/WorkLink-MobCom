import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../utils/colors";
import Avatar from "../ui/Avatar";
import FollowButton from "../ui/FollowButton";

type Props = {
  name: string;
  role: string;
  timeAgo: string;
  text: string;
  likes: number;
  comments: number;
  liked: boolean;
  followed: boolean;
  onToggleFollow: () => void;
  onToggleLike: () => void;
  onPressComment: () => void;
  onPressShare: () => void;
  onPressMore: () => void;
};

export default function DiscussionPostCard({
  name,
  role,
  timeAgo,
  text,
  likes,
  comments,
  liked,
  followed,
  onToggleFollow,
  onToggleLike,
  onPressComment,
  onPressShare,
  onPressMore,
}: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <Avatar name={name} />
        <View style={styles.headerTextContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.subtitle}>
            {role} • {timeAgo}
          </Text>
        </View>
        <FollowButton followed={followed} onToggle={onToggleFollow} />
        <TouchableOpacity
          style={styles.moreButton}
          onPress={onPressMore}
          activeOpacity={0.7}
        >
          <Ionicons
            name="ellipsis-horizontal"
            size={18}
            color={COLORS.icon}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.text}>{text}</Text>

      <View style={styles.divider} />

      <View style={styles.actionsRow}>
        <TouchableOpacity
          style={styles.actionItem}
          onPress={onToggleLike}
          activeOpacity={0.7}
        >
          <Ionicons
            name={liked ? "heart" : "heart-outline"}
            size={18}
            color={liked ? COLORS.danger : COLORS.icon}
          />
          <Text style={styles.actionText}>{likes}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionItem}
          onPress={onPressComment}
          activeOpacity={0.7}
        >
          <Ionicons name="chatbubble-outline" size={18} color={COLORS.icon} />
          <Text style={styles.actionText}>{comments}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionItem}
          onPress={onPressShare}
          activeOpacity={0.7}
        >
          <Ionicons name="share-social-outline" size={18} color={COLORS.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    backgroundColor: COLORS.background,
    padding: 12,
    marginBottom: 12,
    shadowColor: COLORS.shadowSubtle,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 1,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  headerTextContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  name: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text,
  },
  subtitle: {
    fontSize: 12,
    color: COLORS.mutedText,
  },
  moreButton: {
    marginLeft: 4,
    padding: 4,
  },
  text: {
    fontSize: 13,
    color: COLORS.text,
    marginBottom: 10,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.border,
    marginBottom: 8,
  },
  actionsRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 18,
  },
  actionText: {
    fontSize: 12,
    color: COLORS.mutedText,
    marginLeft: 4,
  },
});

