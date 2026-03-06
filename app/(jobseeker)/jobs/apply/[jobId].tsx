import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
    Alert,
    Animated,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PrimaryButton from "../../../../src/components/ui/PrimaryButton";
import TextAreaField from "../../../../src/components/ui/TextAreaField";
import UploadDropzone from "../../../../src/components/ui/UploadDropzone";
import { getJobById } from "../../../../src/firebase/jobService";
import COLORS from "../../../../src/utils/colors";

type Job = {
    id: string;
    title: string;
    companyName: string;
};

export default function ApplyJobScreen() {
    const router = useRouter();
    const { jobId } = useLocalSearchParams<{ jobId: string }>();
    const [job, setJob] = useState<Job | null>(null);
    const [loading, setLoading] = useState(true);

    // Form state
    const [resumeFile, setResumeFile] = useState<string | null>(null);
    const [coverLetter, setCoverLetter] = useState("");
    const [resumeError, setResumeError] = useState("");
    const [coverLetterError, setCoverLetterError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fadeAnim = useRef(new Animated.Value(0)).current;

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
        if (!loading) {
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 400,
                useNativeDriver: true,
            }).start();
        }
    }, [loading, fadeAnim]);

    const handleFileSelect = (fileName: string) => {
        setResumeFile(fileName);
        setResumeError("");
    };

    const handleFileRemove = () => {
        setResumeFile(null);
    };

    const validateForm = (): boolean => {
        let isValid = true;

        if (!resumeFile) {
            setResumeError("Please upload your resume");
            isValid = false;
        } else {
            setResumeError("");
        }

        if (!coverLetter.trim()) {
            setCoverLetterError("Please write a cover letter");
            isValid = false;
        } else if (coverLetter.trim().length < 50) {
            setCoverLetterError("Cover letter should be at least 50 characters");
            isValid = false;
        } else {
            setCoverLetterError("");
        }

        return isValid;
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            Alert.alert("Incomplete Application", "Please fill in all required fields.");
            return;
        }

        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            router.replace({
                pathname: "/(jobseeker)/jobs/apply/success",
                params: { jobId },
            });
        }, 1000);
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.loadingContainer}>
                    <Text style={styles.loadingText}>Loading...</Text>
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
                        The job you're trying to apply for doesn't exist.
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
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.keyboardView}
            >
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => router.back()}
                        style={styles.backButton}
                        activeOpacity={0.7}
                    >
                        <Ionicons name="arrow-back" size={24} color={COLORS.text} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Apply for Job</Text>
                    <View style={styles.headerSpacer} />
                </View>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                >
                    <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
                        {/* Optional: Show job context */}
                        <View style={styles.jobContext}>
                            <Text style={styles.jobContextLabel}>Applying for:</Text>
                            <Text style={styles.jobContextTitle}>{job.title}</Text>
                            <Text style={styles.jobContextCompany}>{job.companyName}</Text>
                        </View>

                        {/* Upload Resume */}
                        <UploadDropzone
                            label="Upload Resume"
                            placeholder="Tap to upload resume"
                            subtitle="(PDF, DOCX - Max 5MB)"
                            selectedFile={resumeFile}
                            onFileSelect={handleFileSelect}
                            onFileRemove={handleFileRemove}
                            error={resumeError}
                        />

                        {/* Cover Letter */}
                        <TextAreaField
                            label="Cover Letter"
                            placeholder="Tell us why you're a great fit for this role..."
                            value={coverLetter}
                            onChangeText={(text) => {
                                setCoverLetter(text);
                                if (coverLetterError) setCoverLetterError("");
                            }}
                            error={coverLetterError}
                            maxLength={1000}
                            showCharCount
                        />

                        {/* Submit Button */}
                        <View style={styles.submitButtonWrapper}>
                            <PrimaryButton
                                label={isSubmitting ? "Submitting..." : "Submit Application"}
                                onPress={handleSubmit}
                                disabled={isSubmitting}
                            />
                        </View>
                    </Animated.View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    keyboardView: {
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    loadingText: {
        fontSize: 14,
        color: COLORS.mutedText,
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
    content: {
        paddingHorizontal: 16,
        paddingTop: 24,
    },
    jobContext: {
        backgroundColor: COLORS.softBlueCard,
        borderRadius: 12,
        padding: 16,
        marginBottom: 24,
    },
    jobContextLabel: {
        fontSize: 12,
        color: COLORS.mutedText,
        marginBottom: 4,
    },
    jobContextTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: COLORS.text,
        marginBottom: 2,
    },
    jobContextCompany: {
        fontSize: 14,
        color: COLORS.mutedText,
    },
    submitButtonWrapper: {
        marginTop: 8,
    },
});
