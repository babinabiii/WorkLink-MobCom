import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Animated,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AccommodationCard from "../../../src/components/cards/AccommodationCard";
import BulletList from "../../../src/components/ui/BulletList";
import PrimaryButton from "../../../src/components/ui/PrimaryButton";
import SecondaryButton from "../../../src/components/ui/SecondaryButton";
import { getJobById } from "../../../src/firebase/jobService";
import COLORS from "../../../src/utils/colors";

type Job = {
    id: string;
    title: string;
    companyName: string;
    locationText: string;
    salaryRange: string;
    badgeText: string;
    description: string;
    responsibilities: string[];
    requirements: string[];
    accommodations: string[];
    image?: string;
    matchPercent?: number;
};

export default function JobDetailScreen() {
    const router = useRouter();
    const { jobId } = useLocalSearchParams<{ jobId: string }>();
    const [job, setJob] = useState<Job | null>(null);
    const [loading, setLoading] = useState(true);
    const [isSaved, setIsSaved] = useState(false);

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(30)).current;

    useEffect(() => {
        const loadJob = async () => {
            try {
                const jobData = await getJobById(jobId);
                setJob(jobData);
            } finally {
                setLoading(false);
            }
        };
        loadJob();
    }, [jobId]);

    useEffect(() => {
        if (!loading && job) {
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
        }
    }, [loading, job, fadeAnim, slideAnim]);

    const handleSave = () => {
        setIsSaved(!isSaved);
        Alert.alert(
            isSaved ? "Job Unsaved" : "Job Saved",
            isSaved ? "Job removed from saved list" : "Job saved successfully"
        );
    };

    const handleApply = () => {
        router.push({
            pathname: "/(jobseeker)/jobs/apply/[jobId]",
            params: { jobId: jobId },
        });
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={COLORS.primary} />
                </View>
            </SafeAreaView>
        );
    }

    if (!job) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.errorContainer}>
                    <Ionicons name="alert-circle-outline" size={64} color={COLORS.mutedText} />
                    <Text style={styles.errorTitle}>Job Not Found</Text>
                    <Text style={styles.errorText}>
                        The job you're looking for doesn't exist or has been removed.
                    </Text>
                    <View style={styles.errorButton}>
                        <PrimaryButton label="Back to Jobs" onPress={() => router.back()} />
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
                    style={styles.headerButton}
                    activeOpacity={0.7}
                >
                    <Ionicons name="arrow-back" size={24} color={COLORS.text} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleSave}
                    style={styles.headerButton}
                    activeOpacity={0.7}
                >
                    <Ionicons
                        name={isSaved ? "heart" : "heart-outline"}
                        size={24}
                        color={isSaved ? COLORS.error : COLORS.text}
                    />
                </TouchableOpacity>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <Animated.View
                    style={[
                        styles.content,
                        {
                            opacity: fadeAnim,
                            transform: [{ translateY: slideAnim }],
                        },
                    ]}
                >
                    {/* Job Header */}
                    <View style={styles.jobHeader}>
                        <View style={styles.imageContainer}>
                            <Image
                                source={{ uri: job.image || "https://via.placeholder.com/80" }}
                                style={styles.jobImage}
                            />
                        </View>
                        <Text style={styles.jobTitle}>{job.title}</Text>
                        <Text style={styles.companyName}>{job.companyName}</Text>
                        {job.salaryRange && (
                            <Text style={styles.salary}>{job.salaryRange}</Text>
                        )}
                        {job.matchPercent && (
                            <View style={styles.matchBadge}>
                                <Text style={styles.matchText}>{job.matchPercent}% Match</Text>
                            </View>
                        )}
                    </View>

                    {/* Description */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Description</Text>
                        <Text style={styles.bodyText}>{job.description}</Text>
                    </View>

                    {/* Responsibilities */}
                    {job.responsibilities && job.responsibilities.length > 0 && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Responsibilities</Text>
                            <BulletList items={job.responsibilities} />
                        </View>
                    )}

                    {/* Requirements */}
                    {job.requirements && job.requirements.length > 0 && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Requirements</Text>
                            <BulletList items={job.requirements} />
                        </View>
                    )}

                    {/* Accommodations */}
                    {job.accommodations && job.accommodations.length > 0 && (
                        <AccommodationCard items={job.accommodations} />
                    )}

                    {/* Bottom Spacing */}
                    <View style={styles.bottomSpacing} />
                </Animated.View>
            </ScrollView>

            {/* Bottom Action Buttons */}
            <View style={styles.bottomActions}>
                <View style={styles.buttonRow}>
                    <View style={styles.saveButtonWrapper}>
                        <SecondaryButton
                            label={isSaved ? "Saved" : "Save Job"}
                            onPress={handleSave}
                        />
                    </View>
                    <View style={styles.applyButtonWrapper}>
                        <PrimaryButton label="Apply Now" onPress={handleApply} />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    loadingContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
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
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    headerButton: {
        width: 40,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
    },
    scrollContent: {
        paddingBottom: 100,
    },
    content: {
        paddingHorizontal: 16,
    },
    jobHeader: {
        alignItems: "center",
        paddingVertical: 24,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    imageContainer: {
        width: 80,
        height: 80,
        borderRadius: 16,
        backgroundColor: COLORS.surface,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 16,
        shadowColor: COLORS.shadowSubtle,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 2,
    },
    jobImage: {
        width: 80,
        height: 80,
        borderRadius: 16,
    },
    jobTitle: {
        fontSize: 22,
        fontWeight: "700",
        color: COLORS.text,
        textAlign: "center",
        marginBottom: 8,
    },
    companyName: {
        fontSize: 16,
        color: COLORS.mutedText,
        marginBottom: 8,
    },
    salary: {
        fontSize: 16,
        fontWeight: "600",
        color: COLORS.primary,
        marginBottom: 8,
    },
    matchBadge: {
        backgroundColor: COLORS.softBlueCard,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 999,
        marginTop: 4,
    },
    matchText: {
        fontSize: 12,
        fontWeight: "600",
        color: COLORS.primary,
    },
    section: {
        marginTop: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: COLORS.text,
        marginBottom: 12,
    },
    bodyText: {
        fontSize: 14,
        color: COLORS.mutedText,
        lineHeight: 22,
    },
    bottomSpacing: {
        height: 24,
    },
    bottomActions: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: COLORS.background,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        paddingHorizontal: 16,
        paddingVertical: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 5,
    },
    buttonRow: {
        flexDirection: "row",
        gap: 12,
    },
    saveButtonWrapper: {
        flex: 1,
    },
    applyButtonWrapper: {
        flex: 1,
    },
});
