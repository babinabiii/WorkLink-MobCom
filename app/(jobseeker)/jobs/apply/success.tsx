import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
    Animated,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import IconCircleSuccess from "../../../../src/components/ui/IconCircleSuccess";
import PrimaryButton from "../../../../src/components/ui/PrimaryButton";
import SecondaryButton from "../../../../src/components/ui/SecondaryButton";
import COLORS from "../../../../src/utils/colors";

export default function ApplicationSuccessScreen() {
    const router = useRouter();
    const { jobId } = useLocalSearchParams<{ jobId?: string }>();

    const scaleAnim = useRef(new Animated.Value(0)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const buttonFadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.sequence([
            Animated.spring(scaleAnim, {
                toValue: 1,
                tension: 50,
                friction: 7,
                useNativeDriver: true,
            }),
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(buttonFadeAnim, {
                    toValue: 1,
                    duration: 400,
                    delay: 200,
                    useNativeDriver: true,
                }),
            ]),
        ]).start();
    }, [scaleAnim, fadeAnim, buttonFadeAnim]);

    const handleBackToJobDetails = () => {
        if (jobId) {
            router.replace({
                pathname: "/(jobseeker)/jobs/[jobId]",
                params: { jobId },
            });
        }
    };

    const handleBackToListings = () => {
        router.replace("/(jobseeker)/jobs");
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Animated.View
                    style={[
                        styles.iconContainer,
                        {
                            transform: [{ scale: scaleAnim }],
                        },
                    ]}
                >
                    <IconCircleSuccess size={200} />
                </Animated.View>

                <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
                    <Text style={styles.title}>Application Sent!</Text>
                    <Text style={styles.message}>
                        Thank you for applying. We've sent a confirmation email to your inbox.
                    </Text>
                </Animated.View>

                <Animated.View style={[styles.buttonContainer, { opacity: buttonFadeAnim }]}>
                    {jobId && (
                        <>
                            <SecondaryButton
                                label="Back to Job Details"
                                onPress={handleBackToJobDetails}
                            />
                            <View style={styles.buttonSpacing} />
                        </>
                    )}
                    <PrimaryButton
                        label="Back to Listings"
                        onPress={handleBackToListings}
                    />
                </Animated.View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 40,
    },
    iconContainer: {
        marginBottom: 40,
    },
    content: {
        alignItems: "center",
        width: "100%",
        marginBottom: 48,
    },
    title: {
        fontSize: 24,
        fontWeight: "700",
        color: COLORS.text,
        marginBottom: 16,
        textAlign: "center",
    },
    message: {
        fontSize: 15,
        color: COLORS.mutedText,
        textAlign: "center",
        lineHeight: 22,
        paddingHorizontal: 8,
    },
    buttonContainer: {
        width: "100%",
    },
    buttonSpacing: {
        height: 12,
    },
});
