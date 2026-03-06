import React, { useEffect, useRef } from "react";
import { Animated, View, StyleSheet } from "react-native";
import COLORS from "../../utils/colors";

type Props = {
  progress: number; // 0 - 1
  height?: number;
};

export default function ProgressBar({ progress, height = 6 }: Props) {
  const animated = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animated, {
      toValue: Math.min(Math.max(progress, 0), 1),
      duration: 600,
      useNativeDriver: false,
    }).start();
  }, [progress, animated]);

  const widthInterpolation = animated.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={[styles.track, { height }]}>
      <Animated.View style={[styles.fill, { width: widthInterpolation }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    width: "100%",
    borderRadius: 999,
    backgroundColor: COLORS.primaryLight,
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: COLORS.primary,
  },
});

