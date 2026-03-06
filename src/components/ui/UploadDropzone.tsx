import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
    Alert,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import COLORS from "../../utils/colors";

type Props = {
    label?: string;
    placeholder?: string;
    subtitle?: string;
    selectedFile?: string | null;
    onFileSelect: (fileName: string) => void;
    onFileRemove?: () => void;
    error?: string;
};

export default function UploadDropzone({
    label,
    placeholder = "Tap to upload file",
    subtitle = "(PDF, DOCX - Max 5MB)",
    selectedFile,
    onFileSelect,
    onFileRemove,
    error,
}: Props) {
    const handlePress = () => {
        if (selectedFile) {
            // Show options to replace or remove
            Alert.alert(
                "File Selected",
                selectedFile,
                [
                    { text: "Cancel", style: "cancel" },
                    {
                        text: "Remove",
                        style: "destructive",
                        onPress: onFileRemove,
                    },
                    {
                        text: "Replace",
                        onPress: simulateFilePicker,
                    },
                ]
            );
        } else {
            simulateFilePicker();
        }
    };

    const simulateFilePicker = () => {
        // Simulate file picker with mock files
        const mockFiles = [
            "resume_2026.pdf",
            "john_doe_resume.pdf",
            "my_cv.docx",
            "professional_resume.pdf",
        ];
        const randomFile = mockFiles[Math.floor(Math.random() * mockFiles.length)];

        Alert.alert(
            "Select File",
            "Choose a file to upload",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: randomFile,
                    onPress: () => onFileSelect(randomFile),
                },
            ]
        );
    };

    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={handlePress}
                style={[
                    styles.dropzone,
                    selectedFile && styles.dropzoneSelected,
                    error && styles.dropzoneError,
                ]}
            >
                {selectedFile ? (
                    <View style={styles.fileSelected}>
                        <Ionicons name="document-text" size={32} color={COLORS.primary} />
                        <Text style={styles.fileName}>{selectedFile}</Text>
                        <TouchableOpacity
                            onPress={(e) => {
                                e.stopPropagation();
                                if (onFileRemove) onFileRemove();
                            }}
                            style={styles.removeButton}
                        >
                            <Ionicons name="close-circle" size={20} color={COLORS.danger} />
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.placeholder}>
                        <Ionicons name="cloud-upload-outline" size={40} color={COLORS.mutedText} />
                        <Text style={styles.placeholderText}>{placeholder}</Text>
                        <Text style={styles.subtitleText}>{subtitle}</Text>
                    </View>
                )}
            </TouchableOpacity>
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 24,
    },
    label: {
        fontSize: 15,
        fontWeight: "600",
        color: COLORS.text,
        marginBottom: 8,
    },
    dropzone: {
        borderWidth: 2,
        borderStyle: "dashed",
        borderColor: COLORS.border,
        borderRadius: 12,
        padding: 32,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.surface,
        minHeight: 160,
    },
    dropzoneSelected: {
        borderStyle: "solid",
        borderColor: COLORS.primary,
        backgroundColor: COLORS.softBlueCard,
    },
    dropzoneError: {
        borderColor: COLORS.danger,
    },
    placeholder: {
        alignItems: "center",
    },
    placeholderText: {
        fontSize: 14,
        color: COLORS.mutedText,
        marginTop: 12,
        fontWeight: "500",
    },
    subtitleText: {
        fontSize: 12,
        color: COLORS.mutedText,
        marginTop: 4,
    },
    fileSelected: {
        alignItems: "center",
        width: "100%",
    },
    fileName: {
        fontSize: 14,
        fontWeight: "600",
        color: COLORS.text,
        marginTop: 8,
        textAlign: "center",
    },
    removeButton: {
        marginTop: 12,
        padding: 4,
    },
    errorText: {
        fontSize: 12,
        color: COLORS.danger,
        marginTop: 4,
    },
});
