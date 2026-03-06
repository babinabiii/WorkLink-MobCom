import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import COLORS from "../../utils/colors";

type Course = {
    id: string;
    title: string;
    description: string;
    duration: string;
    students: string;
    rating: number;
    level: string;
    category: string;
    image?: string;
    thumbnail?: string;
};

type Props = {
    course: Course;
    onPress: () => void;
};

export default function CourseListingCard({ course, onPress }: Props) {
    const getLevelColor = (level: string) => {
        switch (level.toLowerCase()) {
            case "beginner":
                return "#22C55E";
            case "intermediate":
                return "#F59E0B";
            case "advanced":
                return "#374151";
            default:
                return COLORS.mutedText;
        }
    };

    const getCategoryColor = (category: string) => {
        switch (category.toLowerCase()) {
            case "development":
                return COLORS.primary;
            case "design":
                return "#EC4899";
            case "business":
                return "#8B5CF6";
            case "data":
                return "#10B981";
            default:
                return COLORS.primary;
        }
    };

    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={onPress}
            style={styles.card}
        >
            {/* Course Image with Level Badge */}
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: course.image || course.thumbnail || "https://via.placeholder.com/400x200" }}
                    style={styles.image}
                    resizeMode="cover"
                />
                <View style={[styles.levelBadge, { backgroundColor: getLevelColor(course.level) }]}>
                    <Text style={styles.levelText}>{course.level}</Text>
                </View>
            </View>

            {/* Course Info */}
            <View style={styles.content}>
                <View style={styles.titleRow}>
                    <Text style={styles.title} numberOfLines={1}>
                        {course.title}
                    </Text>
                    <View style={styles.ratingContainer}>
                        <Ionicons name="star" size={16} color="#F59E0B" />
                        <Text style={styles.rating}>{course.rating.toFixed(1)}</Text>
                    </View>
                </View>

                <Text style={styles.description} numberOfLines={2}>
                    {course.description}
                </Text>

                <View style={styles.footer}>
                    <View style={styles.metaRow}>
                        <Ionicons name="time-outline" size={14} color={COLORS.mutedText} />
                        <Text style={styles.metaText}>{course.duration}</Text>
                        <Text style={styles.metaDot}>•</Text>
                        <Text style={styles.metaText}>{course.students} students</Text>
                    </View>
                    <View style={[styles.categoryBadge, { backgroundColor: `${getCategoryColor(course.category)}15` }]}>
                        <Text style={[styles.categoryText, { color: getCategoryColor(course.category) }]}>
                            {course.category}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.background,
        borderRadius: 16,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
        overflow: "hidden",
    },
    imageContainer: {
        width: "100%",
        height: 160,
        position: "relative",
    },
    image: {
        width: "100%",
        height: "100%",
    },
    levelBadge: {
        position: "absolute",
        top: 12,
        left: 12,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
    },
    levelText: {
        fontSize: 11,
        fontWeight: "600",
        color: COLORS.background,
    },
    content: {
        padding: 16,
    },
    titleRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 8,
    },
    title: {
        flex: 1,
        fontSize: 16,
        fontWeight: "700",
        color: COLORS.text,
        marginRight: 8,
    },
    ratingContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    rating: {
        fontSize: 14,
        fontWeight: "600",
        color: COLORS.text,
    },
    description: {
        fontSize: 13,
        color: COLORS.mutedText,
        lineHeight: 18,
        marginBottom: 12,
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    metaRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    metaText: {
        fontSize: 12,
        color: COLORS.mutedText,
    },
    metaDot: {
        fontSize: 12,
        color: COLORS.mutedText,
        marginHorizontal: 2,
    },
    categoryBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 999,
    },
    categoryText: {
        fontSize: 11,
        fontWeight: "600",
    },
});
