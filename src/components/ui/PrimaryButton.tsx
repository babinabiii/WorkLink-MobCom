import React from "react";
import { GestureResponderEvent, StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from "react-native";
import COLORS from "../../utils/colors";

type Props = {
    label: string;
    onPress?: (event: GestureResponderEvent) => void;
    style?: ViewStyle;
    textStyle?: TextStyle;
    disabled?: boolean;
};

export default function PrimaryButton({ label, onPress, style, textStyle, disabled = false }: Props) {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPress}
            disabled={disabled}
            style={[
                styles.button,
                disabled && styles.buttonDisabled,
                style,
            ]}
        >
            <Text style={[styles.label, textStyle]}>{label}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: COLORS.primary,
        paddingVertical: 14,
        borderRadius: 999,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonDisabled: {
        opacity: 0.6,
    },
    label: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "600",
    },
});
