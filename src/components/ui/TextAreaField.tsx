import React from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    View,
} from "react-native";
import COLORS from "../../utils/colors";

type Props = TextInputProps & {
    label?: string;
    error?: string;
    maxLength?: number;
    showCharCount?: boolean;
};

export default function TextAreaField({
    label,
    error,
    maxLength,
    showCharCount = false,
    value,
    ...props
}: Props) {
    const charCount = value?.length || 0;

    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            <TextInput
                style={[
                    styles.textArea,
                    error && styles.textAreaError,
                ]}
                multiline
                textAlignVertical="top"
                placeholderTextColor={COLORS.mutedText}
                maxLength={maxLength}
                value={value}
                {...props}
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
            {showCharCount && maxLength && (
                <Text style={styles.charCount}>
                    {charCount} / {maxLength}
                </Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    label: {
        fontSize: 15,
        fontWeight: "600",
        color: COLORS.text,
        marginBottom: 8,
    },
    textArea: {
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 12,
        padding: 14,
        fontSize: 14,
        color: COLORS.text,
        backgroundColor: COLORS.background,
        minHeight: 140,
        maxHeight: 200,
    },
    textAreaError: {
        borderColor: COLORS.danger,
    },
    errorText: {
        fontSize: 12,
        color: COLORS.danger,
        marginTop: 4,
    },
    charCount: {
        fontSize: 12,
        color: COLORS.mutedText,
        textAlign: "right",
        marginTop: 4,
    },
});
