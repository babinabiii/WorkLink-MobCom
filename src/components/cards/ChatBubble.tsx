import React from "react";
import { View, Text, StyleSheet } from "react-native";
import COLORS from "../../utils/colors";
import Avatar from "../ui/Avatar";

type Props = {
  from: "bot" | "user" | "typing";
  text?: string;
};

export default function ChatBubble({ from, text }: Props) {
  if (from === "typing") {
    return (
      <View style={[styles.row, styles.leftRow]}>
        <View style={[styles.bubble, styles.botBubble]}>
          <View style={styles.typingDots}>
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
        </View>
      </View>
    );
  }

  const isBot = from === "bot";

  return (
    <View style={[styles.row, isBot ? styles.leftRow : styles.rightRow]}>
      {isBot && (
        <View style={styles.side}>
          <Avatar name="AI" />
        </View>
      )}
      <View
        style={[
          styles.bubble,
          isBot ? styles.botBubble : styles.userBubble,
        ]}
      >
        <Text style={isBot ? styles.botText : styles.userText}>{text}</Text>
      </View>
      {!isBot && (
        <View style={styles.side}>
          <Avatar name="You" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    marginVertical: 6,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  leftRow: {
    justifyContent: "flex-start",
  },
  rightRow: {
    justifyContent: "flex-end",
  },
  side: {
    marginHorizontal: 6,
  },
  bubble: {
    maxWidth: "70%",
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 10,
    shadowColor: COLORS.shadowSubtle,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 1,
  },
  botBubble: {
    backgroundColor: COLORS.chatBotBubble,
  },
  userBubble: {
    backgroundColor: COLORS.chatUserBubble,
  },
  botText: {
    fontSize: 13,
    color: COLORS.text,
  },
  userText: {
    fontSize: 13,
    color: "#FFFFFF",
  },
  typingDots: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 32,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.mutedText,
  },
});

