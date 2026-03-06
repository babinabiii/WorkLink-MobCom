import React, { useEffect, useRef, useState } from "react";
import { Alert, Animated, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import COLORS from "../../../src/utils/colors";
import ScreenContainer from "../../../src/components/ui/ScreenContainer";
import Avatar from "../../../src/components/ui/Avatar";
import IconCircleButton from "../../../src/components/ui/IconCircleButton";
import ProfileInfoCard from "../../../src/components/cards/ProfileInfoCard";
import SettingsCard from "../../../src/components/cards/SettingsCard";
import OutlineDangerButton from "../../../src/components/ui/OutlineDangerButton";
import { getProfile, Profile } from "../../../src/state/profileState";

export default function ProfileScreen() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile>(getProfile);
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  useEffect(() => {
    setProfile(getProfile());
  }, []);

  const fullName = `${profile.firstName} ${profile.lastName}`;
  const skillsValue = profile.skills.join(", ");
  const textScale = largeText ? 1.1 : 1;

  const themedTextColor = highContrast ? "#000000" : COLORS.text;
  const sectionLabelColor = highContrast ? COLORS.icon : COLORS.mutedText;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScreenContainer>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <Animated.View style={[styles.headerWrapper, { opacity: fadeAnim }]}>
            <View style={styles.avatarWrapper}>
              <View style={styles.avatarOuter}>
                <Avatar name={fullName} />
                <View style={styles.avatarOverlay} />
              </View>
              <View style={styles.editButton}>
                <IconCircleButton
                  name="pencil"
                  onPress={() =>
                    router.push("/(jobseeker)/profile/(settings)/edit")
                  }
                />
              </View>
            </View>
            <Text
              style={[
                styles.name,
                { color: themedTextColor, fontSize: 18 * textScale },
              ]}
            >
              {fullName}
            </Text>
            <View style={styles.badge}>
              <Text style={[styles.badgeText, { fontSize: 11 * textScale }]}>
                {profile.roleLabel}
              </Text>
            </View>
          </Animated.View>

          <View style={styles.divider} />

          <Animated.View style={{ opacity: fadeAnim }}>
            <Text
              style={[
                styles.sectionLabel,
                { color: sectionLabelColor, fontSize: 11 * textScale },
              ]}
            >
              PERSONAL INFO
            </Text>

            <ProfileInfoCard
              email={profile.email}
              skills={skillsValue}
              resume={profile.resumeFileName}
              onPressEmail={() => Alert.alert("Email", profile.email)}
              onPressSkills={() =>
                Alert.alert("Skills", profile.skills.join("\n"))
              }
              onPressResume={() =>
                Alert.alert("Resume", "Resume preview coming soon.")
              }
            />

            <Text
              style={[
                styles.sectionLabel,
                { color: sectionLabelColor, fontSize: 11 * textScale },
              ]}
            >
              ACCESSIBILITY
            </Text>

            <SettingsCard
              items={[
                {
                  type: "toggle",
                  iconName: "contrast-outline",
                  label: "High Contrast Mode",
                  value: highContrast,
                  onValueChange: setHighContrast,
                },
                {
                  type: "toggle",
                  iconName: "text-outline",
                  label: "Larger Text",
                  value: largeText,
                  onValueChange: setLargeText,
                },
              ]}
            />

            <Text
              style={[
                styles.sectionLabel,
                { color: sectionLabelColor, fontSize: 11 * textScale },
              ]}
            >
              ACCOUNT
            </Text>

            <SettingsCard
              items={[
                {
                  type: "link",
                  iconName: "shield-checkmark-outline",
                  label: "Privacy & Security",
                  onPress: () =>
                    router.push("/(jobseeker)/profile/(settings)/privacy"),
                },
                {
                  type: "link",
                  iconName: "notifications-outline",
                  label: "Notifications",
                  onPress: () =>
                    router.push("/(jobseeker)/profile/(settings)/notifications"),
                },
              ]}
            />

            <OutlineDangerButton
              label="Log Out"
              onPress={() => {
                Alert.alert("Logged out", "Logged out successfully.", [
                  {
                    text: "OK",
                    onPress: () => {
                      router.replace("/(auth)/login");
                    },
                  },
                ]);
              }}
              style={styles.logoutButton}
            />
          </Animated.View>
        </ScrollView>
      </ScreenContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  headerWrapper: {
    alignItems: "center",
    marginBottom: 16,
  },
  avatarWrapper: {
    marginBottom: 10,
  },
  avatarOuter: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#FDE7F2",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  avatarOverlay: {
    position: "absolute",
    inset: 0,
  },
  editButton: {
    position: "absolute",
    bottom: -4,
    right: -4,
  },
  name: {
    fontWeight: "700",
    marginBottom: 4,
  },
  badge: {
    borderRadius: 999,
    backgroundColor: COLORS.softBlueCard,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeText: {
    color: COLORS.primary,
    fontWeight: "600",
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.border,
    marginVertical: 16,
  },
  sectionLabel: {
    fontWeight: "600",
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  logoutButton: {
    marginTop: 8,
  },
});

