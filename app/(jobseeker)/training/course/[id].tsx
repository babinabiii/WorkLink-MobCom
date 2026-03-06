import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
    Animated,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LessonModuleCard from "../../../../src/components/cards/LessonModuleCard";
import BulletList from "../../../../src/components/ui/BulletList";
import PrimaryButton from "../../../../src/components/ui/PrimaryButton";
import { getCourseById } from "../../../../src/data/coursesData";
import COLORS from "../../../../src/utils/colors";

export default function CourseDetailScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id: string }>();
    const course = getCourseById(id);
    const [isStarted, setIsStarted] = useState(false);

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(20)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 400,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 400,
                useNativeDriver: true,
            }),
        ]).start();
    }, [fadeAnim, slideAnim]);

    const handleStartCourse = () => {
        setIsStarted(true);
        // Could navigate to: router.push(`/(jobseeker)/training/course/start/${id}`)
    };

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

    if (!course) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.errorContainer}>
                    <Ionicons name="alert-circle-outline" size={64} color={COLORS.mutedText} />
                    <Text style={styles.errorTitle}>Course Not Found</Text>
                    <Text style={styles.errorText}>
                        The course you're looking for doesn't exist.
                    </Text>
                    <View style={styles.errorButton}>
                        <PrimaryButton label="Back to Courses" onPress={() => router.back()} />
                    </View>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => router.back()}
                    style={styles.backButton}
                    activeOpacity={0.7}
                >
                    <Ionicons name="arrow-back" size={24} color={COLORS.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Course Details</Text>
                <View style={styles.headerSpacer} />
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
                    {/* Hero Banner */}
                    <View style={styles.heroBanner}>
                        <Image
                            source={{ uri: course.thumbnail || "https://via.placeholder.com/400x200" }}
                            style={styles.bannerImage}
                            resizeMode="cover"
                        />
                        <View style={styles.bannerOverlay}>
                            <View style={styles.bannerBadges}>
                                <View style={[styles.levelBadge, { backgroundColor: getLevelColor(course.level) }]}>
                                    <Text style={styles.levelBadgeText}>{course.level}</Text>
                                </View>
                                <View style={styles.categoryBadge}>
                                    <Text style={styles.categoryBadgeText}>{course.category}</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* Course Info */}
                    <View style={styles.content}>
                        <Text style={styles.courseTitle}>{course.title}</Text>
                        <Text style={styles.courseDescription}>{course.description}</Text>

                        {/* Metadata Row */}
                        <View style={styles.metaRow}>
                            <View style={styles.metaItem}>
                                <Ionicons name="star" size={16} color="#F59E0B" />
                                <Text style={styles.metaText}>{course.rating.toFixed(1)}</Text>
                            </View>
                            <View style={styles.metaItem}>
                                <Ionicons name="people-outline" size={16} color={COLORS.mutedText} />
                                <Text style={styles.metaText}>{course.students} students</Text>
                            </View>
                            <View style={styles.metaItem}>
                                <Ionicons name="time-outline" size={16} color={COLORS.mutedText} />
                                <Text style={styles.metaText}>{course.duration}</Text>
                            </View>
                        </View>

                        {/* Start Course Button */}
                        <View style={styles.buttonContainer}>
                            <PrimaryButton
                                label={isStarted ? "Continue Course" : "Start Course"}
                                onPress={handleStartCourse}
                                style={styles.startButton}
                            />
                        </View>

                        {/* What You'll Learn */}
                        {course.learningOutcomes && course.learningOutcomes.length > 0 && (
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>What you'll learn</Text>
                                <BulletList items={course.learningOutcomes} useCheckmarks />
                            </View>
                        )}

                        {/* Course Content */}
                        {course.modules && course.modules.length > 0 && (
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>Course Content</Text>
                                {course.modules.map((module) => (
                                    <LessonModuleCard key={module.id} module={module} />
                                ))}
                            </View>
                        )}

                        {/* Course Meta */}
                        <View style={styles.courseMetaSection}>
                            {course.instructor && (
                                <View style={styles.metaInfoRow}>
                                    <Text style={styles.metaLabel}>Instructor:</Text>
                                    <Text style={styles.metaValue}>{course.instructor}</Text>
                                </View>
                            )}
                            {course.lastUpdated && (
                                <View style={styles.metaInfoRow}>
                                    <Text style={styles.metaLabel}>Last updated:</Text>
                                    <Text style={styles.metaValue}>{course.lastUpdated}</Text>
                                </View>
                            )}
                            {course.language && (
                                <View style={styles.metaInfoRow}>
                                    <Text style={styles.metaLabel}>Language:</Text>
                                    <Text style={styles.metaValue}>{course.language}</Text>
                                </View>
                            )}
                        </View>
                    </View>
                </Animated.View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: COLORS.background,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    backButton: {
        width: 40,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: COLORS.text,
    },
    headerSpacer: {
        width: 40,
    },
    scrollContent: {
        paddingBottom: 32,
    },
    heroBanner: {
        width: "100%",
        height: 200,
        position: "relative",
    },
    bannerImage: {
        width: "100%",
        height: "100%",
    },
    bannerOverlay: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        padding: 16,
    },
    bannerBadges: {
        flexDirection: "row",
        gap: 8,
    },
    levelBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
    },
    levelBadgeText: {
        fontSize: 11,
        fontWeight: "600",
        color: COLORS.background,
    },
    categoryBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
        backgroundColor: "rgba(255, 255, 255, 0.9)",
    },
    categoryBadgeText: {
        fontSize: 11,
        fontWeight: "600",
        color: COLORS.text,
    },
    content: {
        paddingHorizontal: 16,
        paddingTop: 20,
    },
    courseTitle: {
        fontSize: 22,
        fontWeight: "700",
        color: COLORS.text,
        marginBottom: 8,
    },
    courseDescription: {
        fontSize: 14,
        color: COLORS.mutedText,
        lineHeight: 20,
        marginBottom: 16,
    },
    metaRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 16,
        marginBottom: 20,
    },
    metaItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    metaText: {
        fontSize: 13,
        color: COLORS.mutedText,
    },
    buttonContainer: {
        marginBottom: 24,
    },
    startButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: COLORS.text,
        marginBottom: 12,
    },
    courseMetaSection: {
        backgroundColor: COLORS.surface,
        borderRadius: 12,
        padding: 16,
        marginTop: 8,
    },
    metaInfoRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 8,
    },
    metaLabel: {
        fontSize: 13,
        color: COLORS.mutedText,
    },
    metaValue: {
        fontSize: 13,
        fontWeight: "600",
        color: COLORS.text,
    },
    errorContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 32,
    },
    errorTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: COLORS.text,
        marginTop: 16,
        marginBottom: 8,
    },
    errorText: {
        fontSize: 14,
        color: COLORS.mutedText,
        textAlign: "center",
        lineHeight: 20,
        marginBottom: 24,
    },
    errorButton: {
        width: "100%",
        maxWidth: 200,
    },
});
