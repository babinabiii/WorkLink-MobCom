import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import COLORS from "../../utils/colors";

type Props = {
    items: string[];
};

export default function AccommodationCard({ items }: Props) {
    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <Ionicons name="accessibility-outline" size={20} color={COLORS.primary} />
                <Text style={styles.title}>Accessibility & Accommodations</Text>
            </View>
            <View style={styles.list}>
                {items.map((item, index) => (
                    <View key={index} style={styles.row}>
                        <Ionicons name="checkmark-circle-outline" size={18} color={COLORS.primary} />
                        <Text style={styles.text}>{item}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.softBlueCard,
        borderRadius: 16,
        padding: 16,
        marginTop: 16,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    title: {
        fontSize: 15,
        fontWeight: "600",
        color: COLORS.text,
        marginLeft: 8,
    },
    list: {
        gap: 8,
    },
    row: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 6,
    },
    text: {
        flex: 1,
        fontSize: 13,
        color: COLORS.mutedText,
        marginLeft: 8,
        lineHeight: 18,
    },
});
