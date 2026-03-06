import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import COLORS from "../../utils/colors";

type Props = {
    items: string[];
    useCheckmarks?: boolean;
};

export default function BulletList({ items, useCheckmarks = false }: Props) {
    return (
        <View style={styles.container}>
            {items.map((item, index) => (
                <View key={index} style={styles.row}>
                    {useCheckmarks ? (
                        <Ionicons name="checkmark-circle" size={18} color={COLORS.primary} style={styles.icon} />
                    ) : (
                        <Text style={styles.bullet}>•</Text>
                    )}
                    <Text style={styles.text}>{item}</Text>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 8,
    },
    row: {
        flexDirection: "row",
        marginBottom: 10,
        alignItems: "flex-start",
    },
    bullet: {
        fontSize: 16,
        color: COLORS.text,
        marginRight: 8,
        lineHeight: 20,
    },
    icon: {
        marginRight: 8,
        marginTop: 1,
    },
    text: {
        flex: 1,
        fontSize: 14,
        color: COLORS.mutedText,
        lineHeight: 20,
    },
});
