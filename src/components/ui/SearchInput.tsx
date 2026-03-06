import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
    StyleSheet,
    TextInput,
    TextInputProps,
    View,
} from "react-native";
import COLORS from "../../utils/colors";

type Props = TextInputProps & {
    value: string;
    onChangeText: (text: string) => void;
};

export default function SearchInput({ value, onChangeText, ...props }: Props) {
    return (
        <View style={styles.container}>
            <Ionicons name="search" size={20} color={COLORS.mutedText} style={styles.icon} />
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                placeholderTextColor={COLORS.mutedText}
                {...props}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.surface,
        borderRadius: 24,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    icon: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        fontSize: 15,
        color: COLORS.text,
    },
});
