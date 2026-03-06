import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import COLORS from "../../utils/colors";
import IconCircleButton from "./IconCircleButton";

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
};

export default function MessageComposer({ value, onChangeText, onSend }: Props) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={80}
    >
      <View style={styles.container}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Ask anything...."
            placeholderTextColor={COLORS.mutedText}
            value={value}
            onChangeText={onChangeText}
            multiline
          />
        </View>
        <IconCircleButton name="send" onPress={onSend} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.background,
  },
  inputWrapper: {
    flex: 1,
    marginRight: 10,
    borderRadius: 999,
    backgroundColor: COLORS.inputBg,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  input: {
    fontSize: 14,
    color: COLORS.text,
    maxHeight: 100,
  },
});

