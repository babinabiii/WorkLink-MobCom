import React, { ReactNode } from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import COLORS from "../../utils/colors";

type Props = {
  children: ReactNode;
  style?: ViewStyle;
};

export default function ScreenContainer({ children, style }: Props) {
  return <View style={[styles.container, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
});

