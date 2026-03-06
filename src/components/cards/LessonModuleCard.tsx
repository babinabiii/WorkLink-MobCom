import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    LayoutAnimation,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    UIManager,
    View,
} from "react-native";
import { CourseModule } from "../../data/coursesData";
import COLORS from "../../utils/colors";

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

type Props = {
    module: CourseModule;
};

export default function LessonModuleCard({ module }: Props) {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsExpanded(!isExpanded);
    };

    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={toggleExpand}
            style={styles.card}
        >
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Text style={styles.moduleLabel}>MODULE {module.number}</Text>
                    <Text style={styles.title}>{module.title}</Text>
                    <View style={styles.metaRow}>
                        <Text style={styles.metaText}>
                            {module.lessonCount} lessons • {module.duration}
                        </Text>
                    </View>
                </View>
                <Ionicons
                    name={isExpanded ? "chevron-up" : "chevron-down"}
                    size={20}
                    color={COLORS.mutedText}
                />
            </View>

            {isExpanded && module.lessons && (
                <View style={styles.lessonsContainer}>
                    {module.lessons.map((lesson, index) => (
                        <View key={index} style={styles.lessonRow}>
                            <Ionicons name="play-circle-outline" size={16} color={COLORS.primary} />
                            <Text style={styles.lessonText}>{lesson}</Text>
                        </View>
                    ))}
                </View>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.background,
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: COLORS.border,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },
    headerLeft: {
        flex: 1,
        marginRight: 12,
    },
    moduleLabel: {
        fontSize: 11,
        fontWeight: "600",
        color: COLORS.mutedText,
        letterSpacing: 0.5,
        marginBottom: 4,
    },
    title: {
        fontSize: 15,
        fontWeight: "600",
        color: COLORS.text,
        marginBottom: 6,
    },
    metaRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    metaText: {
        fontSize: 13,
        color: COLORS.mutedText,
    },
    lessonsContainer: {
        marginTop: 12,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
    },
    lessonRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 6,
        gap: 8,
    },
    lessonText: {
        flex: 1,
        fontSize: 13,
        color: COLORS.text,
    },
});
