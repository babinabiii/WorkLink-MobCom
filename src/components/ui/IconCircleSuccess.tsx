import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import COLORS from "../../utils/colors";

type Props = {
    size?: number;
};

export default function IconCircleSuccess({ size = 120 }: Props) {
    const outerSize = size;
    const innerSize = size * 0.5;
    const iconSize = innerSize * 0.6;

    return (
        <View
            style={[
                styles.outerCircle,
                {
                    width: outerSize,
                    height: outerSize,
                    borderRadius: outerSize / 2,
                },
            ]}
        >
            <View
                style={[
                    styles.innerCircle,
                    {
                        width: innerSize,
                        height: innerSize,
                        borderRadius: innerSize / 2,
                    },
                ]}
            >
                <Ionicons name="checkmark" size={iconSize} color={COLORS.primary} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    outerCircle: {
        backgroundColor: "#DCE8FF",
        alignItems: "center",
        justifyContent: "center",
    },
    innerCircle: {
        backgroundColor: COLORS.background,
        borderWidth: 3,
        borderColor: COLORS.primary,
        alignItems: "center",
        justifyContent: "center",
    },
});
