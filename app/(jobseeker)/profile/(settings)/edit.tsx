import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import COLORS from "../../../../src/utils/colors";
import ScreenContainer from "../../../../src/components/ui/ScreenContainer";
import PrimaryButton from "../../../../src/components/ui/PrimaryButton";
import { getProfile, updateProfile } from "../../../../src/state/profileState";

export default function ProfileEditScreen() {
  const router = useRouter();
  const current = getProfile();

  const [firstName, setFirstName] = useState(current.firstName);
  const [lastName, setLastName] = useState(current.lastName);
  const [roleLabel, setRoleLabel] = useState(current.roleLabel);
  const [email, setEmail] = useState(current.email);
  const [skills, setSkills] = useState(current.skills.join(", "));
  const [resume, setResume] = useState(current.resumeFileName);

  const onSave = () => {
    const nextSkills = skills
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    updateProfile({
      firstName: firstName || current.firstName,
      lastName: lastName || current.lastName,
      roleLabel: roleLabel || current.roleLabel,
      email: email || current.email,
      skills: nextSkills.length ? nextSkills : current.skills,
      resumeFileName: resume || current.resumeFileName,
    });

    Alert.alert("Profile updated", "Your profile changes have been saved.", [
      {
        text: "OK",
        onPress: () => router.back(),
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScreenContainer>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <Text style={styles.title}>Edit Profile</Text>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>First Name</Text>
            <TextInput
              value={firstName}
              onChangeText={setFirstName}
              style={styles.input}
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Last Name</Text>
            <TextInput
              value={lastName}
              onChangeText={setLastName}
              style={styles.input}
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Role Label</Text>
            <TextInput
              value={roleLabel}
              onChangeText={setRoleLabel}
              style={styles.input}
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Skills (comma separated)</Text>
            <TextInput
              value={skills}
              onChangeText={setSkills}
              style={styles.input}
              multiline
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Resume File Name</Text>
            <TextInput
              value={resume}
              onChangeText={setResume}
              style={styles.input}
              autoCapitalize="none"
            />
          </View>

          <PrimaryButton label="Save Changes" onPress={onSave} />
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
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 16,
  },
  fieldGroup: {
    marginBottom: 12,
  },
  label: {
    fontSize: 13,
    color: COLORS.mutedText,
    marginBottom: 4,
  },
  input: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    color: COLORS.text,
    backgroundColor: COLORS.background,
  },
});

